# Contributing

Community pull requests are welcome. Please check the linked source before changing a site's address or access note.

## Add or update a site

Edit `catalog/sites.json`. Each entry includes:

- A stable, unique `id`. It identifies the Host provider row and its saved API key.
- The displayed `name`, optional localized `category`, and a one-sentence localized `description` for the Add provider chooser. Category labels are at most 128 characters; descriptions are at most 280 characters per locale.
- A public HTTPS `baseUrl`, a `homeUrl`, and a `sourceUrl` that explains or tracks the listing.
- The supplied `serviceType` and `registrationNote`, with `未注明` when the source does not say.
- `models`: exact published model IDs when a trustworthy list is available, or an empty array when the endpoint supports key-authenticated model discovery.

Do not guess endpoints or model IDs, and do not probe a live service as part of review. Use the linked public documentation or source post. Access rules, registration state, quotas, and availability can change; phrase descriptions briefly and point to the source rather than promising service quality.

Use clean links without affiliate, invitation, or tracking parameters. Never submit API keys, cookies, access tokens, or other credentials. Do not add a shared key or a service that asks users to share credentials from another provider.

There is no site-count limit. Keep the custom chooser category consistent when the entries belong together. If ownership or the API hostname changes, use a new `id`: changing the endpoint under an existing ID retains the user's saved key and sends it to the new host. Removing an ID removes its provider row and saved key when PI-Desktop reconciles the plugin; call out removals in the pull request.

## Generate and validate

```sh
node scripts/catalog.mjs write
node scripts/catalog.mjs check
```

Commit the generated `plugin/manifest.json` with the catalog change. The GitHub Actions workflow also runs the PI-Desktop plugin devkit checks and package command. For a local development install, select the `plugin/` directory because that is where `manifest.json` lives.

## Pull request checklist

- [ ] The site and source links are public HTTPS links without tracking parameters.
- [ ] The description is one sentence in English and Simplified Chinese.
- [ ] I used published model IDs or left `models` empty for documented model discovery.
- [ ] I did not include credentials or private data.
- [ ] I regenerated `plugin/manifest.json` and ran the catalog check.
- [ ] I explained endpoint or provider-ID changes that may affect saved keys.
