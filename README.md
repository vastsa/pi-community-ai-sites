# PI Community AI Sites

A community-maintained PI-Desktop plugin that collects public-benefit AI API services. Anyone can suggest an update through a pull request.

> These are third-party API relays. Requests may include prompts and code. Review each service's terms and privacy policy before use. This project does not operate or endorse the listed services.

## Use the catalog

Install the latest package from [GitHub Releases](https://github.com/vastsa/pi-community-ai-sites/releases/latest), or clone this repository and load the `plugin/` directory as a development plugin. The manifest is inside that directory; selecting the repository root causes `PLUGIN_INVALID: manifest.json missing`.

After granting `provider.register` and enabling the plugin, open **Settings → Models → Add provider** and choose a site under **Community API Sites / 公益站**. Tiles show the site name; hover or keyboard focus reveals its one-sentence introduction. The key form shows the API address before saving.

Sites with no published model list are discovered by PI-Desktop after you save a key. This sends a model-list request to the selected site. The key stays in PI-Desktop's Host secret store; plugin code does not receive it. Configured sites remain in the provider list and leave the Add provider catalog.

## Catalog

Access and registration details came from the linked community posts and may change. Confirm the current status on each site before relying on it.

| Site | One-sentence introduction | API site | Source |
| --- | --- | --- | --- |
| 幻城网安公益 API | 提供面向个人用户的免费额度，具体模型和使用规则以站点文档为准。 | [Open](https://api.ifivem.com/) | [Docs](https://api.ifivem.com/free-api/) |
| ChatAnywhere Free API | 提供社区 API，免费 Key 仅限个人非商业用途。 | [Open](https://chatanywhere.tech/) | [Project](https://github.com/chatanywhere/GPT_API_free) |
| Any Router | 通过签到获取额度，具体注册条件以站点公告为准。 | [Open](https://anyrouter.top/) | [Post](https://linux.do/t/topic/1799316) |
| Ark API | 结合签到与游戏中心提供额度入口，需注册码注册。 | [Open](https://windhub.cc/) | [Post](https://linux.do/t/topic/2048888) |
| 『烁』公益站 | 支持直接注册，包含签到、游戏与 LDC 等入口。 | [Open](https://elysiver.h-e.top/) | [Post](https://linux.do/t/topic/1175087) |
| 黑与白公益站 | 邀请码开放的福利型 API 服务，当前规则以站点公告为准。 | [Open](https://ai.hybgzs.com/) | [Post](https://linux.do/t/topic/1861721) |
| 42 API | 社区分享的 API 服务，接入方式以站点公告和来源帖为准。 | [Open](https://api.42w.shop/) | [Post](https://linux.do/t/topic/1770113) |
| WONG的公益站 | 邀请码开放的社区 API 站点。 | [Open](https://wzw.pp.ua/) | [Profile](https://linux.do/u/jason_wong1) |
| 薄荷公益站 | 注册码注册的社区 API 服务，开放状态以来源帖为准。 | [Open](https://x666.me/) | [Post](https://linux.do/t/topic/1170760) |
| dudu公益站 | 原整理信息显示暂未开放注册，最新状态请查看站点公告。 | [Open](https://wududu.edu.kg/) | [Post](https://linux.do/t/topic/1808197) |
| CoeeApi | 邀请码开放的社区 API 站点。 | [Open](https://api.coee.ccwu.cc/) | [Post](https://linux.do/t/topic/2139599) |
| PrismAI 公益站 | 面向 LDC 社区的 API 服务，开放方式以站点公告为准。 | [Open](https://ai.prism.uno/) | [Post](https://linux.do/t/topic/2285158) |
| zifeiyu公益站 | 原整理信息显示暂未开放注册，最新状态请查看站点公告。 | [Open](https://ai.112102.xyz/) | [Post](https://linux.do/t/topic/2536586) |
| Hlool 公益站 | 通过 LDC 邀请码注册的社区 API 站点，规则以来源帖为准。 | [Open](https://api.hlool.top/) | [Post](https://linux.do/t/topic/2489666) |
| 小鸡毛公益站 | 按名额不定期发放免费资格，具体安排以来源帖为准。 | [Open](https://api.ark717.com/) | [Post](https://linux.do/t/topic/2583676) |
| 随时跑路公益站 | 需注册码注册的社区 API 站点。 | [Open](https://runanytime.hxi.me/) | [Post](https://linux.do/t/topic/1833597) |
| 胖猫公益站 | 原整理信息显示可直接注册，福利内容以站点公告为准。 | [Open](https://我是胖猫.de5.net/) | [Post](https://linux.do/t/topic/2764312) |
| 773公益站 | 提供签到额度，需注册码注册。 | [Open](https://api-yi-hydrogel.seeseed1ck.icu/) | [Post](https://linux.do/t/topic/2713274) |
| 【Fengwind API】公益站 | 邀请制福利型 API 站点，开放状态以来源帖为准。 | [Open](https://api.fengwind.com/) | [Post](https://linux.do/t/topic/2581884) |
| 咕咕嘎嘎公益站 | 提供签到额度，需注册码注册。 | [Open](https://api.fengshao1227.com/) | [Post](https://linux.do/t/topic/2775282) |

## Contribute

Edit `catalog/sites.json`, then run:

```sh
node scripts/catalog.mjs write
node scripts/catalog.mjs check
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for review guidance. The catalog has no per-plugin site-count limit. Do not add API keys, referral links, tracking parameters, or private data.

## License

MIT. Listed names and services remain the property of their operators.
