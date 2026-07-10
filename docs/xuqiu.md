# Universal Tower Defense Z Wiki 项目需求

基于当前项目的代码框架，开发 **Universal Tower Defense Z** 的英文 Roblox 攻略站，满足玩家关于更新、兑换码、单位、队伍、特性、遗物、进化和各类玩法攻略的搜索需求。最终页面类型必须由当前长尾需求和可靠数据决定，不能因为模板存在就机械保留。

## 项目身份

- 游戏名称：Universal Tower Defense Z
- 常用简称：UTDZ
- 网站名称：Universal Tower Defense Z Wiki
- 游戏平台：Roblox
- 项目目录名：`universaltowerdefense-z`
- GitHub 仓库名：`universaltowerdefense-z`
- Cloudflare Worker 项目名：`universaltowerdefense-z`
- 正式域名：`www.universaltowerdefense-z.wiki`
- Canonical URL：`https://www.universaltowerdefense-z.wiki`
- 计划 PRD 文件：`docs/universal-tower-defense-z-wiki-prd-and-implementation-plan.md`
- 目标数据目录：`src/data/utdz/`
- 目标路由组：`src/app/[locale]/(utdz)/`

## 官方身份

- Roblox 官方游戏页：https://www.roblox.com/games/133410800847665/Universal-Tower-Defense-Z
- Roblox Place ID：`133410800847665`
- Roblox Universe ID：`7488190691`
- 认证创作者 Group：Universal Tower Defense [UTD]
- Roblox Group ID：`33861560`
- Roblox Group 页面：https://www.roblox.com/communities/33861560/Universal-Tower-Defense-UTD
- 独立官方网站：暂未核验到；开发时以 Roblox 游戏页、Roblox API 和认证创作者 Group 为官方身份来源。

重要版本边界：该 Roblox Experience 原名 **Universal Tower Defense X**，Update 4.0 后当前官方名称为 **Universal Tower Defense Z**。X 与 Z 使用同一个 Place ID 和 Universe ID，不应当成两个完全无关的游戏。旧 UTDX 资料只能作为历史线索；页面标题、更新状态、单位数据、兑换码和玩法事实都必须按当前 UTDZ 状态重新核验，不能直接复制旧站内容。

## 核心种子关键词

- universal tower defense z
- universal tower defense z wiki
- universal tower defense z codes
- universal tower defense z tier list
- universal tower defense z units
- universal tower defense z traits
- universal tower defense z relics
- universal tower defense z update 4.0
- utdz
- utdz codes
- utdz tier list

## 开发要求

1. 搜索并核验当前游戏玩法、官方更新和长尾搜索需求，建立 `keep / ignore / watch / localize_later` 关键词矩阵，再决定站点页面、导航实体命名和内容范围。长尾词 API 与研究方式可参考 [$wiki-site-growth-iteration](/Users/he/.codex/skills/wiki-site-growth-iteration/SKILL.md)。
2. 以 Roblox 官方游戏页、Roblox API、认证创作者渠道和当前可靠攻略来源交叉核验数据。重点处理 UTDX → UTDZ 的更名与版本迁移，清除源模板游戏的名称、域名、Place/Universe ID、开发者、代码、素材和路由残留。
3. 网站配色、图标和视觉风格应参考当前 UTDZ 官方游戏图标、缩略图和 Update 4.0 视觉，不沿用源模板配色。
4. 根据真实需求判断是否建设 codes、tier list、units、traits、relics、evolution、story、raids、challenges、Virtual Realm、beginner guide 等页面。没有可靠数据支持的页面不要伪造；可以使用高质量 YouTube 视频作为研究来源，写成独立、面向玩家决策的英文攻略，不能机械转录或改写视频。
5. 可参考工作区已有的 `universaltowerdefensex` 项目了解历史实体、内容结构和来源线索，但必须重新核验当前 Z 版本，并避免复制过期内容或造成 X/Z 搜索意图混乱。
6. 开发完成并验证后，在 GitHub 创建 `universaltowerdefense-z` 仓库并推送项目。
7. 在 Cloudflare Workers 创建 `universaltowerdefense-z` 项目，绑定 `universaltowerdefense-z.wiki` 与 `www.universaltowerdefense-z.wiki`，以 `www` 为 canonical，并配置 GitHub 自动构建。
8. 在 GA4 创建或复用与正式域名对应的媒体资源和 Web 数据流，授权方式与站点注册信息从 `/Users/he/Documents/AI/vibe coding/GA-GTM` 获取并同步。
