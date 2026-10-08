# PI Community AI Sites

A community-maintained PI-Desktop plugin that adds a reviewed set of public-benefit and free-tier AI API services to the native provider list.

> Third-party API relays can receive the prompts, code, and other request data you send through them. Review the service's terms and privacy policy before use. Do not send production secrets, private customer data, or code you cannot share with that service. This project does not operate or endorse the listed services.

## What the plugin does

After installation and enablement, each catalog entry becomes a plugin-owned provider row in **Settings → Models → Providers**. Open the row's key action to save your own API key. PI-Desktop stores that key in its host-managed secret store; the plugin code does not read it.

Plugin-provided rows are managed by the plugin and cannot be edited or removed as ordinary provider rows. Disabling the plugin disables its rows; uninstalling it removes them and their stored keys. Removing a station from this catalog also removes its row and saved key the next time the plugin is reconciled.

Provider IDs keep a station row and its saved key connected. A catalog update that changes a row's endpoint keeps the key and sends it to that new endpoint when the service is used. Review endpoint changes carefully; when ownership or endpoint host changes, contributors must use a new provider ID so the key is not carried over.

The current PI-Desktop plugin API does not let a plugin add tiles to the **Add provider** dialog. This plugin makes curated services available in the native provider list, where you can enable a row and select its models for a session.

PI-Desktop currently permits up to eight provider declarations per plugin. The catalog is intentionally limited to eight active entries; a PR that adds a site must keep within that limit.

## Current catalog

The catalog stores endpoint and model IDs only. Free quotas, prices, signup requirements, and uptime can change; check each linked service before use.

| Service | API endpoint | Current model entries | Service docs |
| --- | --- | --- | --- |
| 幻城网安公益 API | `https://api.ifivem.com/v1` | DeepSeek-V4-Pro, DeepSeek-V4-Flash, kimi-k3, MiniMax-M3, glm-5.3-flash, step-3.7-flash | [API guide](https://api.ifivem.com/free-api/), [model list](https://api.ifivem.com/free-api/models/) |
| ChatAnywhere Free API | `https://api.chatanywhere.tech/v1` | gpt-4o-mini, gpt-4o | [Project and API guide](https://github.com/chatanywhere/GPT_API_free) |

These entries were reviewed against the linked public documentation on 2026-10-08. “Reviewed” means the published endpoint and model IDs were checked; it is not an uptime or privacy audit.

## Install or package

1. For a ready-to-install package, download the latest `.piplug` from [GitHub Releases](https://github.com/vastsa/pi-community-ai-sites/releases/latest). To inspect or modify the source, clone this repository.
2. Install the package from PI-Desktop's Plugins page, or open **Plugins → Load Development Plugin** and select the `plugin/` directory in your clone.
3. Review the `provider.register` permission when prompted. It allows the plugin to add provider rows from its manifest.
4. Enable **PI Community AI Sites**. Open **Settings → Models → Providers**, choose a site's key action, and enter the key you obtained from that site.

Do not put API keys in GitHub issues, pull requests, catalog files, or screenshots.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the station review and PR checklist. Site metadata lives in [`catalog/sites.json`](catalog/sites.json); run `node scripts/catalog.mjs write` after editing it, then `node scripts/catalog.mjs check` to confirm the generated plugin manifest matches.

The package is data-only: `plugin/main.js` does not make network requests or access keys. Provider requests are made by PI-Desktop when you select a provider and send a prompt.

## License

This repository is available under the MIT License. Listed services and their names remain the property of their operators.

## 中文说明

这是一个社区维护的 PI-Desktop 插件。启用后，目录中的站点会出现在 **设置 → 模型 → 服务** 列表；用户可以在站点行中录入自己申请的 API Key，再启用服务并选择模型。Key 由 PI-Desktop 主程序加密保存，插件代码无法读取。

当前插件接口还不能把站点注入 **添加服务** 对话框。每个插件最多声明 8 个服务，因此目录也限制为最多 8 个已启用站点。公益站和中转站可能读取发送给它们的提示词与代码；请先查看站点条款，不要发送生产密钥、客户数据或敏感代码。

站点 ID 会关联服务行和已保存的 Key。更新站点的 API 地址会保留 Key，并在用户使用服务时把 Key 发往新地址；更换服务运营方或 API 域名时，贡献者必须使用新的站点 ID。删除目录中的站点会同时删除它的服务行和 Key。
