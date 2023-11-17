"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/scripts/default-index.ts
var default_index_exports = {};
__export(default_index_exports, {
  Prisma: () => Prisma,
  PrismaClient: () => PrismaClient,
  default: () => default_index_default
});
module.exports = __toCommonJS(default_index_exports);

// ../../node_modules/.pnpm/@prisma+engines-version@5.7.0-3.2ef5b74aa83695618276f241a13850fa2063b9da/node_modules/@prisma/engines-version/package.json
var prisma = {
  enginesVersion: "2ef5b74aa83695618276f241a13850fa2063b9da"
};

// package.json
var version = "0.0.0";

// src/runtime/utils/clientVersion.ts
var clientVersion = version;

// src/scripts/default-index.ts
var PrismaClient = class {
  constructor() {
    throw new Error(
      `@prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`
    );
  }
};
function defineExtension(ext) {
  if (typeof ext === "function") {
    return ext;
  }
  return (client) => client.$extends(ext);
}
function getExtensionContext(that) {
  return that;
}
var Prisma = {
  defineExtension,
  getExtensionContext,
  prismaVersion: { client: clientVersion, engine: prisma.enginesVersion }
};
var default_index_default = { Prisma };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Prisma,
  PrismaClient
});
