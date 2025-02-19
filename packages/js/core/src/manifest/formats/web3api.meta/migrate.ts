/* eslint-disable */
/**
 * This file was automatically generated by scripts/manifest/migrate-ts.mustache.
 * DO NOT MODIFY IT BY HAND. Instead, modify scripts/manifest/migrate-ts.mustache,
 * and run node ./scripts/manifest/generateFormatTypes.js to regenerate this file.
 */
import {
  AnyMetaManifest,
  MetaManifest,
  MetaManifestFormats,
  latestMetaManifestFormat
} from ".";


import { Tracer } from "@web3api/tracing-js";

type Migrator = {
  [key in MetaManifestFormats]?: (m: AnyMetaManifest) => MetaManifest;
};

export const migrators: Migrator = {
};

export const migrateMetaManifest = Tracer.traceFunc(
  "core: migrateMetaManifest",
  (manifest: AnyMetaManifest, to: MetaManifestFormats): MetaManifest => {
    const from = manifest.format as MetaManifestFormats;

    if (from === latestMetaManifestFormat) {
      return manifest as MetaManifest;
    }

    if (!(from in MetaManifestFormats)) {
      throw new Error(`Unrecognized MetaManifestFormat "${manifest.format}"`);
    }

    throw new Error(`This should never happen, MetaManifest migrators is empty. from: ${from}, to: ${to}`);
  }
);
