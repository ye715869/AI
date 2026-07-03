# 个人主页开发对话记录

> 项目路径：`personal-homepage/index.html`
> 最后更新：2026年7月4日

---

## 0. 项目初始化与整体页面搭建（之前会话）

**概述**：从零搭建赛博朋克风格的完整个人主页。

**修改文件**：`index.html`、`css/style.css`、`js/main.js`

### HTML 结构（index.html）
- **导航栏**：固定顶部、Logo（`<HOME/>`）、导航链接、移动端汉堡菜单按钮
- **Hero 区**：全屏视频背景、半透明遮罩层、扫描线效果、粒子网格装饰、霓虹名字动画、打字机效果问候语、实时时钟、快捷操作按钮、向下滚动指示器
- **关于我**：个人介绍文字、统计数字（年经验/完成项目/开源贡献）、JSON代码块装饰
- **技能树**：前端/后端/工具三大分类，各含6个技能标签（后续已删除）
- **项目经历**：2张项目卡片（智能水质监测系统、AI Agent辅助开发个人主页），含GitHub图标链接、技术标签、时间、展开详情按钮
- **联系方式**：邮箱、GitHub、微信、LinkedIn 四个联系方式卡片
- **页脚**：Logo、导航链接、版权信息、标语

### CSS 样式（css/style.css）
- **CSS 变量**：定义了赛博朋克配色（霓虹青`#00f0ff`、霓虹紫`#b400ff`、霓虹粉`#ff00aa`、霓虹绿`#00ff88`）、字体（Orbitron / Share Tech Mono / Noto Sans SC）、玻璃态背景
- **导航栏**：固定定位、滚动毛玻璃效果（`backdrop-filter: blur`）、链接霓虹悬停动效
- **Hero**：`100vh`全屏、多层遮罩叠加、扫描线（`repeating-linear-gradient`）、网格装饰、霓虹文字发光（多层`text-shadow`）、名字浮动入场动画（`char-float`）、霓虹闪烁（`neon-flicker`）、按钮发光边框
- **通用Section**：统一标题样式（`#`前缀 + 渐变分割线）、滚动入场动画（`reveal` + `visible`）
- **关于我**：双栏Grid布局、统计数字样式、代码块装饰（红黄绿圆点 + 语法高亮）
- **技能树**：三列响应式Grid、卡片悬停发光边框、技能标签悬停浮起效果
- **项目经历**：卡片顶部渐变线、悬停浮起、技术标签霓虹紫风格、展开详情折叠动画
- **联系方式**：四列Grid、圆形图标容器、悬停上浮+发光
- **页脚**：渐变分割线、链接悬停变色
- **响应式设计**：
  - 平板（≤768px）：导航改为侧滑菜单、单列布局
  - 手机（≤480px）：缩小间距、按钮全宽、单列Grid

### JavaScript 交互（js/main.js）
- **实时时钟**：每秒更新，格式 `YYYY-MM-DD HH:MM:SS`
- **打字机效果**：多语言循环（中文→英文→日文→法文），逐字打出→等待→删除→切换
- **导航栏滚动**：滚动超过50px时添加毛玻璃背景
- **移动端菜单**：汉堡按钮切换侧滑菜单，点击链接/外部区域自动关闭
- **滚动入场动画**：IntersectionObserver 监听，元素进入视口时淡入上移，卡片依次延迟
- **项目卡片展开/折叠**：点击按钮展开/收起详情列表，按钮文字切换
- **统计数字滚动**：数字从0滚动到目标值，easeOutCubic缓动
- **导航激活高亮**：根据当前可见section高亮对应导航链接
- **页脚年份**：自动更新为当前年份

### 外部资源引入
- Google Fonts：Orbitron（科技感标题）、Share Tech Mono（等宽字体）、Noto Sans SC（中文正文字体）
- 视频背景：`assets/video/妹子回眸z.mp4`

---

## 1. GitHub 链接修复

**需求**：将项目经历中的GitHub链接指向对应仓库，底部GitHub链接指向个人主页。

**修改内容**：
- **项目卡片1（智能水质监测系统）**：GitHub链接 `#` → `https://github.com/ye715869/AI`
- **项目卡片2（AI Agent 辅助开发个人主页）**：GitHub链接 `#` → `https://github.com/ye715869/AI`
- **底部联系方式 GitHub**：链接 `https://github.com` → `https://github.com/ye715869`，文字 `github.com/username` → `github.com/ye715869`
- **微信行标签修复**：`pqw19958792227/span>` → `pqw19958792227</span>`（缺失的 `<` 补回）

---

## 2. 删除技能树板块

**需求**：删除"技能树"（Skills）整个区域。

**修改内容**：
- 删除 `<section class="section skills" id="skills">...</section>` 整块HTML
- 删除导航栏中 `<li><a href="#skills">技能</a></li>`
- 删除页脚中 `<a href="#skills">技能</a>`

---

## 3. "你好，我是"添加蓝色背景

**需求**：Hero区域的问候语"你好，我是"加上蓝底。

**修改文件**：`css/style.css`
**修改内容**：
```css
.hero-greeting {
  color: #fff;
  background: linear-gradient(135deg, #1a6bff, #0055dd);
  display: inline-block;
  padding: 6px 20px;
  border-radius: 4px;
  letter-spacing: 2px;
  box-shadow: 0 0 20px rgba(26, 107, 255, 0.4), 0 4px 15px rgba(0, 0, 0, 0.3);
}
```
- 蓝色渐变背景（`#1a6bff` → `#0055dd`）
- 文字改为白色提高对比度
- 添加蓝色发光阴影

---

## 4. 关于我 - 代码窗口替换为动漫图片

**需求**：将"关于我"右侧的JSON代码窗口替换为动漫图片，且限制为《日常》内容。

**修改文件**：`index.html`、`css/style.css`、`js/main.js`

**HTML 修改**：
- 代码块 `<div class="code-block">...</div>` 替换为：
```html
<div class="anime-image-wrapper">
  <img id="animeImage" src="" alt="Nichijou Wallpaper" class="anime-image" loading="lazy" />
  <div class="anime-image-overlay"></div>
  <div class="anime-image-label">RANDOM.ANIME</div>
</div>
```

**CSS 新增**：
- `.anime-image-wrapper`：带边框、圆角、发光悬停效果的图片容器
- `.anime-image`：`aspect-ratio: 4/3`、`object-fit: cover`
- `.anime-image-overlay`：紫色渐变遮罩
- `.anime-image-label`：右下角霓虹标签

**JS 新增**（`initAnimeImage`）：
- 5张《日常》（Nichijou）专属壁纸，来自 Konachan CDN
- 每次页面加载随机选取一张
- 图片列表：博士(Hakase)、户外场景、学校群像、坂本猫、水上麻衣

---

## 5. 联系方式修改

**需求**：最后一个联系方式（LinkedIn）改为电话。

**修改内容**：
- LinkedIn 替换为电话，号码 `19958792227`
- 使用 `tel:+8619958792227` 链接，移动端可点击直接拨号
- 图标换为电话 SVG

---

## 6. 微信图标替换

**需求**：更换第三个联系方式（微信）的图标。

**修改内容**：
- 微信图标从编辑笔 SVG 更换为聊天气泡 SVG（带表情符号的对话泡泡）
- 更贴合微信的形象

---

## 当前联系方式一览

| 序号 | 类型 | 内容 |
|------|------|------|
| 1 | 邮箱 | 2494659498@qq.com |
| 2 | GitHub | github.com/ye715869 |
| 3 | 微信 | pqw19958792227 |
| 4 | 电话 | 19958792227 |

---

## 当前项目卡片一览

| 项目 | GitHub链接 |
|------|-----------|
| 智能水质监测系统 | https://github.com/ye715869/AI |
| AI Agent 辅助开发个人主页 | https://github.com/ye715869/AI |

---

## 技术栈

- **HTML5**：语义化标签、SVG内联图标
- **CSS3**：赛博朋克风格、霓虹发光、渐变、动画、响应式布局
- **JavaScript**：打字机效果、实时时钟、滚动动画（IntersectionObserver）、统计数字滚动、随机壁纸加载
- **外部资源**：Google Fonts（Orbitron、Share Tech Mono、Noto Sans SC）、Konachan CDN（动漫壁纸）
