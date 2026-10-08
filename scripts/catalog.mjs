import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_PATH = resolve(ROOT, "catalog/sites.json");
const MANIFEST_PATH = resolve(ROOT, "plugin/manifest.json");
const MAX_MODELS_PER_PROVIDER = 64;
const MAX_CATEGORY_LENGTH = 128;
const MAX_DESCRIPTION_LENGTH = 280;
const API_STYLES = new Set(["chat_completions"]);

function fail(message) {
  throw new Error(message);
}

function requireText(value, label, maxLength = 256) {
  if (typeof value !== "string" || !value.trim() || value.length > maxLength) {
    fail(`${label} must be a non-empty string of at most ${maxLength} characters`);
  }
  return value.trim();
}

function requirePublicHttps(value, label) {
  const text = requireText(value, label, 2048);
  let url;
  try {
    url = new URL(text);
  } catch {
    fail(`${label} must be an absolute HTTPS URL`);
  }
  const host = url.hostname.toLowerCase();
  const blockedSuffixes = [".localhost", ".local", ".internal", ".nip.io", ".sslip.io"];
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.hash ||
    url.search ||
    !host.includes(".") ||
    host === "localhost" ||
    blockedSuffixes.some((suffix) => host.endsWith(suffix)) ||
    /^\d+(?:\.\d+){3}$/.test(host) ||
    host.startsWith("[")
  ) {
    fail(`${label} must use a public HTTPS hostname without credentials or tracking parameters`);
  }
  return url.toString().replace(/\/$/, "");
}

function validateCategory(category, label) {
  if (category === undefined) return;
  if (typeof category === "string") {
    requireText(category, label, MAX_CATEGORY_LENGTH);
    return;
  }
  if (!category || typeof category !== "object" || Array.isArray(category)) {
    fail(`${label} must be a string or an object with en and zh-CN labels`);
  }
  for (const locale of ["en", "zh-CN"]) {
    requireText(category[locale], `${label}.${locale}`, MAX_CATEGORY_LENGTH);
  }
}

function validateDescription(description, label) {
  if (!description || typeof description !== "object" || Array.isArray(description)) {
    fail(`${label} must contain en and zh-CN one-sentence introductions`);
  }
  for (const locale of ["en", "zh-CN"]) {
    requireText(description[locale], `${label}.${locale}`, MAX_DESCRIPTION_LENGTH);
  }
}

function validateCatalog(catalog) {
  if (!catalog || catalog.schemaVersion !== 1 || !Array.isArray(catalog.sites)) {
    fail("catalog/sites.json must have schemaVersion 1 and a sites array");
  }
  if (catalog.sites.length === 0) {
    fail("sites must contain at least one provider");
  }

  const siteIds = new Set();
  for (const [index, site] of catalog.sites.entries()) {
    const label = `sites[${index}]`;
    const id = requireText(site?.id, `${label}.id`, 64);
    if (!/^[a-z][a-z0-9_-]*$/.test(id) || siteIds.has(id)) {
      fail(`${label}.id must be unique lowercase letters, numbers, hyphens, or underscores`);
    }
    siteIds.add(id);
    requireText(site.name, `${label}.name`, 128);
    validateCategory(site.category, `${label}.category`);
    validateDescription(site.description, `${label}.description`);
    requirePublicHttps(site.baseUrl, `${label}.baseUrl`);
    if (!API_STYLES.has(site.apiStyle)) {
      fail(`${label}.apiStyle must be one of: ${[...API_STYLES].join(", ")}`);
    }
    for (const key of ["homeUrl", "sourceUrl"]) {
      requirePublicHttps(site[key], `${label}.${key}`);
    }
    requireText(site.serviceType, `${label}.serviceType`, 128);
    requireText(site.registrationNote, `${label}.registrationNote`, 256);
    if (!Array.isArray(site.models) || site.models.length > MAX_MODELS_PER_PROVIDER) {
      fail(`${label}.models must contain at most ${MAX_MODELS_PER_PROVIDER} model entries`);
    }
    const modelIds = new Set();
    for (const [modelIndex, model] of site.models.entries()) {
      const modelLabel = `${label}.models[${modelIndex}]`;
      const modelId = requireText(model?.id, `${modelLabel}.id`, 256);
      const normalizedId = modelId.toLocaleLowerCase("en-US");
      if (/\s/.test(modelId) || modelIds.has(normalizedId)) {
        fail(`${modelLabel}.id must be unique within the site and contain no whitespace`);
      }
      modelIds.add(normalizedId);
      requireText(model.name, `${modelLabel}.name`, 128);
    }
  }
  return catalog.sites;
}

function manifestFor(sites) {
  return {
    schemaVersion: 1,
    id: "community.ai-public-sites",
    name: "PI Community AI Sites",
    version: "0.3.0",
    description:
      "Community-curated third-party API endpoints. Review each service's privacy and usage terms before sending prompts or code.",
    main: "main.js",
    permissions: ["provider.register"],
    contributes: {
      providers: sites.map((site) => ({
        id: site.id,
        name: site.name,
        ...(site.category === undefined ? {} : { category: site.category }),
        description: site.description,
        baseUrl: site.baseUrl,
        apiStyle: site.apiStyle,
        authKind: "api_key",
        models: site.models.map(({ id, name }) => ({ id, name })),
      })),
    },
    engines: { piDesktop: ">=0.17.0" },
    activationEvents: ["onStartup"],
  };
}

async function main() {
  const mode = process.argv[2] ?? "check";
  if (!new Set(["check", "write"]).has(mode)) {
    fail("usage: node scripts/catalog.mjs [check|write]");
  }
  const catalog = JSON.parse(await readFile(CATALOG_PATH, "utf8"));
  const sites = validateCatalog(catalog);
  const expected = `${JSON.stringify(manifestFor(sites), null, 2)}\n`;
  const current = await readFile(MANIFEST_PATH, "utf8").catch(() => "");
  if (mode === "write") {
    await writeFile(MANIFEST_PATH, expected, "utf8");
    process.stdout.write(`Generated plugin manifest for ${sites.length} providers.\n`);
    return;
  }
  if (current !== expected) {
    fail("plugin/manifest.json is out of date; run `node scripts/catalog.mjs write`");
  }
  process.stdout.write(`Catalog and plugin manifest are valid (${sites.length} providers).\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
