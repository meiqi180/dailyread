# Daily Read 每日英语阅读 — 项目验收文档

---

## 一、项目概述

Daily Read 是一款每日英语经典语句阅读 App。用户每天可以浏览英文经典台词或名著语句，查看中文翻译、表达解析和标准发音，并收藏喜欢的句子、追踪学习记录。

**产品目标：** 帮助用户提升英语语感、文笔和表达能力。

---

## 二、项目结构

```
dailyread/
├── index.html                     # HTML 入口
├── package.json                   # 依赖配置（React 18 + Vite 5 + React Router 6）
├── package-lock.json              # 稳定依赖锁文件
├── vite.config.js                 # Vite 构建配置
├── public/
│   └── favicon.svg                # 网站图标
└── src/
    ├── main.jsx                   # React 入口
    ├── App.jsx                    # HashRouter + FavoritesProvider + RecordsProvider
    ├── index.css                  # 全局 CSS 变量 / reset / 移动优先
    ├── data/
    │   └── quotes.js              # 34 条英文经典语句（6 分类 × 3 难度）
    ├── utils/
    │   ├── storage.js             # localStorage 封装（try/catch 安全包裹）
    │   ├── speech.js              # Web Speech API 封装（rate 0.9）
    │   └── quoteHelpers.js        # 推荐/随机/搜索 + getLocalDateStr 本地日期
    ├── contexts/
    │   ├── FavoritesContext.jsx    # 收藏全局 Context
    │   └── RecordsContext.jsx      # 学习记录全局 Context（新 record 结构）
    ├── hooks/
    │   └── useDailyQuote.js       # 每日推荐 + 随机去重
    ├── components/
    │   ├── Navbar/                # 底部固定导航（4 tab）
    │   ├── QuoteCard/             # 核心卡片 + recordButtonMode
    │   ├── ExpressionItem/        # 重点表达条目
    │   ├── PronunciationBtn/      # 发音按钮（脉冲动画）
    │   ├── FavoriteBtn/           # 收藏按钮（实心/空心）
    │   ├── SearchBar/             # 搜索框（带清除）
    │   └── EmptyState/            # 空状态占位（3 种 + 引导）
    └── pages/
        ├── Home/                  # 每日推荐 + "我已学习" + "再来一句"
        ├── Explore/               # 全部语句 + 全文搜索 + 每条可记录
        ├── Records/               # 按日期分组 + 多维度搜索 + "再次复习"
        └── Favorites/             # 收藏列表 + 重点表达
```

---

## 三、运行方式

```bash
cd dailyread/
npm install
npm run dev       # → http://localhost:5173
npm run build     # 生产构建 → dist/
npm run preview   # 预览构建
```

**技术栈：** React 18 + Vite 5 + React Router 6（仅 3 个运行时依赖）

**部署：** HashRouter，可直接部署 GitHub Pages，子路径刷新不 404。

---

## 四、路由与页面

| 路径 | 页面 | 说明 |
|---|---|---|
| `#/` | Home | 每日推荐（featured 大卡）+ "我已学习" + "再来一句" |
| `#/explore` | Explore | 34 条全文搜索 + 每条可记录学习 |
| `#/records` | Records | 学习记录按日期分组 + "再次复习" + 搜索 |
| `#/favorites` | Favorites | 收藏列表 + 重点表达 + 可记录学习 |

---

## 五、核心功能

### 5.1 每日推荐
- 34 条随机选取，同日一致，次日换新不重复
- `displayQuote` / `dailyQuote` 分离："再来一句"不覆盖今日推荐
- "再来一句"排除当前句（`getRandomQuote(excludeId)`）

### 5.2 发音播放
- Web Speech API，lang=en-US，rate=0.9
- 播放脉冲动画，API 不可用时灰显降级

### 5.3 收藏
- FavoritesContext 全局同步 + localStorage 持久化
- 爱心 toggle 即时切换，刷新保留

### 5.4 学习记录
- **记录结构：** `{ id: `${quoteId}_${date}`, quoteId, date, viewedAt }`
- 首页/探索/收藏页每条卡均有学习按钮
- 同日去重（`r.date === getLocalDateStr()`），跨天保留多条
- Records 按日期分组（今天/昨天/日期格式）
- 搜索覆盖 10+ 字段

### 5.5 按钮语义
| 页面 | mode | 未记录 | 已记录 |
|---|---|---|---|
| Home | 页面自带 | 我已学习 | 已记录 |
| Explore | `learn` | 我已学习 | 已记录 |
| Favorites | `learn` | 我已学习 | 已记录 |
| Records | `review` | 再次复习 | 今日已复习 |

### 5.6 搜索
- 支持 english / chinese / source / tags / keyExpressions / scene / imitation / difficulty
- 中文难度："初级" → easy / "中级" → medium / "高级" → hard

### 5.7 时区安全
- `getLocalDateStr()` 统一获取本地 YYYY-MM-DD，避免 UTC 偏移
- 所有日期判断基于 `record.date`，不使用 `viewedAt.startsWith()`

---

## 六、验收清单

| 验收项 | 状态 |
|---|---|
| npm install 成功 | ✅ |
| npm run build 成功（63 modules, 0 errors, 0 warnings） | ✅ |
| 首页每日推荐 + 中文翻译 + 来源 + 解析 + 表达 + 仿写 | ✅ |
| "再来一句"不重复 | ✅ |
| 发音播放有视觉反馈 | ✅ |
| 收藏全局同步 + 刷新保留 | ✅ |
| 首页 "我已学习" → Records 立即可见 | ✅ |
| Explore 每条也可记录学习 | ✅ |
| Records 按日期分组（今天/昨天/日期） | ✅ |
| Records 按钮为 "再次复习/今日已复习" | ✅ |
| 同日去重 + 跨天保留 | ✅ |
| 日期使用本地时间（非 UTC toISOString） | ✅ |
| 空状态文案准确（"点击「我已学习」后"） | ✅ |
| 搜索 "初级/中级/高级" 正确返回 | ✅ |
| 无未使用变量/import | ✅ |
| HashRouter 子路径刷新不 404 | ✅ |
| package-lock.json 存在 | ✅ |
