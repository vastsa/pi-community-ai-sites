# Contributing

Pull requests are welcome. Please add stations only when their public documentation identifies the endpoint, API format, and exact model IDs.

## Station requirements

- Link to the service's home page, signup page, API documentation, model list, and the source used to verify the entry.
- Use a public HTTPS endpoint copied from the service's documentation. Do not guess a URL, use an IP address, point at localhost/private networks, or add URL credentials.
- Use a non-referral signup URL. Do not add affiliate, invite, or tracking parameters.
- Include only exact model IDs published by the service. Do not list models that require a paid tier as free.
- Record the review date and a short access note. Do not state that an entry is safe, stable, or permanently free.
- Never submit API keys, cookies, access tokens, or other credentials.
- Do not add a shared public key or a service that asks users to share credentials from another provider.
- Keep the active catalog at eight entries or fewer, matching the current PI-Desktop plugin limit.
- Provider IDs also identify rows that own user API keys. If ownership or the endpoint host changes, add a new ID; changing `baseUrl` under an existing ID retains the user's key and redirects later requests to the new host.
- Removing a provider ID deletes its row and saved key when PI-Desktop reconciles the plugin. Call out removals clearly in the PR and keep them rare.

The maintainer reviews the endpoint and model details before merge. A link being reachable does not verify a service's privacy claims, uptime, or quota policy.

## Change the catalog

Edit `catalog/sites.json`, then regenerate and validate the manifest:

```sh
node scripts/catalog.mjs write
node scripts/catalog.mjs check
```

The generated `plugin/manifest.json` must be committed with the catalog change. The GitHub Actions workflow also runs the PI-Desktop plugin devkit check and pack commands.

## Pull request checklist

- [ ] I included public source links for the endpoint, API format, and model IDs.
- [ ] I recorded when I reviewed the service documentation.
- [ ] I did not include referral parameters, credentials, or private data.
- [ ] I regenerated `plugin/manifest.json` and ran the catalog check.
- [ ] I read the service's current terms and noted material access limits.
