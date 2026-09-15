# 暂存区：UV 固化基础知识 10 篇

这个目录里的文件**不会发布**。`components/insights.ts` 只读 `content/insights/`
根目录下匹配 `<slug>.<locale>.md` 的文件，子目录名不匹配那个正则，会被直接跳过。

## 为什么先放这里

加载器要求每篇文章必须有 `.en.md`——英文是权威语言，缺英文的 slug 会被整篇
丢弃（`if (!entry.en) continue;`）。这 10 篇目前只有中文，所以还发不出去。

第 01 篇要接管 `what-is-uv-curing` 这个已有网址（旧内容作废，但网址已被收录，
换内容比删掉再开一个划算）。如果现在就把中文放到根目录，线上那篇文章会变成
「旧英文标题 + 新中文正文」的拼接状态。放在暂存区可以等英文到位后一次性原子
替换，线上不会出现中间态。

## 上线需要的文件

每篇按 `<slug>.<locale>.md` 命名，放到 `content/insights/` 根目录：

| # | slug（即网址 /insights/<slug>） | 已有 | 还需要 |
|---|---|---|---|
| 01 | `what-is-uv-curing` | zh | en · th · vi |
| 02 | `uva-uvb-uvc-in-uv-curing` | zh | en · th · vi |
| 03 | `photoinitiator-light-source-spectral-match` | zh | en · th · vi |
| 04 | `uv-irradiance-vs-dose` | zh | en · th · vi |
| 05 | `oxygen-inhibition-tacky-surface` | zh | en · th · vi |
| 06 | `mercury-lamp-vs-uv-led` | zh | en · th · vi |
| 07 | `spot-curing-vs-area-curing` | zh | en · th · vi |
| 08 | `air-cooled-vs-water-cooled-uv-led` | zh | en · th · vi |
| 09 | `uv-curing-process-control-closed-loop` | zh | en · th · vi |
| 10 | `uv-radiometer-calibration` | zh | en · th · vi |

frontmatter 的 `date`、`tags`、`author`、`cover`、`coverFit` 取自 **英文文件**，
其余语言只用到 `title` 和 `description`。所以英文稿的这几个字段要和这里的中文
稿保持一致，否则封面图和日期会变。

## 上线步骤

1. 把 en/th/vi 文件补进这个目录，与中文稿并排。
2. 删除旧的 `content/insights/what-is-uv-curing.{en,th,zh}.md`（三个文件）。
3. 把这个目录里的全部 `.md` 移到 `content/insights/` 根目录，删掉本目录。
4. `npm run build && npm start`，然后 `npm run validate:seo`、`validate:search`。
   站点地图会自动收录，无需改代码——见上一层 README。
5. 逐篇打开 `/insights/<slug>` 四语确认配图与内链正常。

## 待办

- **封面图**：11 张 COS 配图全部可访问，但其中 5 张偏小或竖构图
  （05 为 404×252，09 为 304×227，10 为 371×517，03 为 692×1698，
  08 为 1122×1428）。这几篇已设 `coverFit: contain` 避免裁切，但列表页的
  卡片会留白。有 16:9 的封面图更好。
- **内链**：第 01 篇正文链到第 05 篇，两篇同时上线才不会断链。
