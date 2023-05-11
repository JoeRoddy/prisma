import type { Platform } from '@prisma/get-platform'
import { getNodeAPIName } from '@prisma/get-platform'
import { ClientEngineType, getClientEngineType } from '@prisma/internals'
import path from 'path'

import { TSClientOptions } from '../TSClient/TSClient'

const { map } = require('../../../../../helpers/blaze/map')

// NFT is the Node File Trace utility by Vercel https://github.com/vercel/nft

/**
 * Build bundler-like annotations so that Vercel automatically uploads the
 * prisma schema as well as the query engine binaries to the deployments.
 * @param engineType the client engine in use
 * @param platforms the targeted platforms
 * @param relativeOutdir outdir relative to root
 * @returns
 */
export function buildNFTAnnotations({ dataProxy, platforms, esm, generator }: TSClientOptions, relativeOutdir: string) {
  const engineType = getClientEngineType(generator)

  // We don't want to bundle engines when `--data-proxy` is enabled
  if (dataProxy === true) return ''

  if (platforms === undefined) {
    // TODO: should we still build the schema annotations in this case?
    // Or, even better, make platforms non-nullable in TSClientOptions to avoid this check.
    return ''
  }

  if (process.env.NETLIFY) {
    platforms = ['rhel-openssl-1.0.x']
  }

  const engineAnnotations = map(platforms, (platform) => {
    const engineFilename = getQueryEngineFilename(engineType, platform)
    return engineFilename ? buildNFTAnnotation(esm, engineFilename, relativeOutdir) : ''
  }).join('\n')

  const schemaAnnotations = buildNFTAnnotation(esm, 'schema.prisma', relativeOutdir)

  return `${engineAnnotations}${schemaAnnotations}`
}

/**
 * Retrieve the location of the current query engine
 * @param engineType
 * @param platform
 * @returns
 */
function getQueryEngineFilename(engineType: ClientEngineType, platform: Platform) {
  if (engineType === ClientEngineType.Library) {
    return getNodeAPIName(platform, 'fs')
  }

  if (engineType === ClientEngineType.Binary) {
    return `query-engine-${platform}`
  }

  return undefined
}

/**
 * Build tool annotations in order to make Vercel upload our files
 * The first annotation is general purpose, the second if for now-next.
 * @see https://github.com/vercel/vercel/tree/master/packages/now-next
 * @param fileName
 * @param relativeOutdir
 * @returns
 */
function buildNFTAnnotation(esm: boolean, fileName: string, relativeOutdir: string) {
  const relativeFilePath = path.join(relativeOutdir, fileName)

  if (esm === true) {
    return `
new URL(${JSON.stringify(path.join('.', fileName))}, import.meta.url)`
  } else {
    return `
path.join(__dirname, ${JSON.stringify(fileName)});
path.join(process.cwd(), ${JSON.stringify(relativeFilePath)})`
  }
}
