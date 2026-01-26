# Hugo 项目代码规范

## 项目概述

本项目是基于 Hugo 静态网站生成器的广州香水博物馆网站，使用以下技术栈：

- **Hugo** (Extended) - 静态网站生成器
- **Tailwind CSS** - CSS 框架（通过 Hugo Pipes）
- **Hugo Modules** - 主题和功能模块管理
- **Go Templates** - 模板引擎

## 目录结构

```
├── assets/              # 静态资源源文件
│   └── css/            # Tailwind CSS 源文件
├── config/             # 环境配置
│   └── development/    # 开发环境配置
├── config/_default/    # 默认配置文件
│   ├── params.toml     # 主题参数
│   ├── menus.*.toml    # 导航菜单配置
│   ├── languages.toml  # 多语言配置
│   └── module.toml     # Hugo模块配置
├── content/            # 内容根目录
│   ├── english/        # 英文内容
│   │   ├── blog/       # 博客文章
│   │   ├── authors/    # 作者信息
│   │   ├── pages/      # 独立页面
│   │   └── sections/   # 首页区域内容
│   └── zhcn/           # 中文内容（同上结构）
├── data/               # 数据文件
│   ├── theme.json      # 主题设计令牌（颜色、字体）
│   └── social.json     # 社交媒体链接
├── i18n/               # 国际化翻译文件
├── layouts/            # 自定义布局
│   └── _default/       # 覆盖主题的默认布局
├── static/             # 静态文件（未处理）
├── themes/             # Hugo模块
│   └── hugoplate/      # 主题目录
├── hugo.toml           # 主配置文件
└── package.json        # Node.js依赖
```

## 代码规范

### 1. HTML 模板规范

#### 1.1 文件命名

- 使用小写字母和连字符：`page-header.html`
- Partials 放在 `layouts/partials/` 下
- 按功能组织：`essentials/`, `components/`, `widgets/`

#### 1.2 模板语法

```html
<!-- 正确：带注释说明 -->
<!-- favicon module: https://github.com/gethugothemes/hugo-modules/tree/master/images -->
{{ partialCached "favicon" . }}

<!-- 条件渲染 -->
{{ if site.Params.theme_switcher }} {{ site.Params.theme_default }} {{ end }}

<!-- 循环 -->
{{ range .Pages }} {{ .Title }} {{ end }}

<!-- 定义区块 -->
{{ define "main" }}
<!-- 页面主要内容 -->
{{ end }}
```

#### 1.3 缓存策略

- 使用 `partialCached` 缓存不频繁变化的 partials
- 动态内容使用 `partial` 不缓存
- 模板中使用 `{{ block "main" . }}{{ end }}` 支持继承

```html
<!-- 缓存 partial -->
{{ partialCached "essentials/style.html" . }}

<!-- 不缓存（动态内容） -->
{{ partial "basic-seo.html" . }}
```

#### 1.4 缩进与格式

- 使用 2 个空格缩进
- 属性换行对齐
- Hugo 模板表达式与 HTML 元素分层处理

```html
<div class="
  {{ if .IsHome }}home{{ else }}page{{ end }}
  {{ if eq .Type "blog" }}blog{{ end }}
">
  内容
</div>
```

### 2. CSS 规范 (Tailwind)

#### 2.1 主题颜色

主题颜色定义在 `data/theme.json`：

```json
{
  "colors": {
    "default": {
      "theme_color": {
        "primary": "#121212", // 主色调
        "body": "#fff", // 背景色
        "border": "#eaeaea", // 边框色
        "light": "#f6f6f6", // 浅色面
        "dark": "#040404" // 深色面
      },
      "text_color": {
        "text": "#444444", // 正文色
        "text_dark": "#040404", // 深色文字
        "text_light": "#717171" // 浅色文字
      }
    },
    "darkmode": {
      // 暗黑模式对应颜色
    }
  }
}
```

#### 2.2 HTML 类名规范

- 使用 Tailwind 工具类
- 响应式：`sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- 暗黑模式：`dark:`
- 自定义类放在 `assets/css/custom.css`

```html
<!-- 响应式容器 -->
<div class="container mx-auto px-4 py-12 md:py-20">
  <!-- 暗黑模式 -->
  <div class="bg-white dark:bg-body dark:text-text">
    <!-- 自定义工具类 -->
    <div class="btn-primary"></div>
  </div>
</div>
```

### 3. JavaScript 规范

#### 3.1 插件配置

在 `hugo.toml` 中配置 JS 插件：

```toml
[[params.plugins.js]]
link = "js/search.js"
lazy = false

[[params.plugins.js]]
link = "plugins/swiper/swiper-bundle.js"
lazy = true
```

#### 3.2 内联脚本

- 生产环境使用 `custom_script` 参数
- 使用 `defer` 或 `async` 加载
- 避免阻塞页面渲染

```html
<!-- 在 params.toml 中配置 -->
custom_script = '''
<script defer>
  console.log("Custom script loaded");
</script>
'''
```

### 4. Markdown 内容规范

#### 4.1 Front Matter

使用 YAML 格式，必需字段：

```yaml
---
title: "文章标题" # 必需
meta_title: "" # 可选，SEO标题
description: "文章描述" # 必需，用于SEO
date: 2025-01-26T00:00:00Z # 必需
image: "/images/feature.png" # 可选，封面图
categories: ["分类A", "分类B"] # 必需
author: "作者名" # 必需
tags: ["标签1", "标签2"] # 必需
draft: false # 必需
---
```

#### 4.2 内容格式

- 使用中文编写内容
- 标题层级清晰（##, ###）
- 正确使用列表、引用、代码块

````markdown
## 二级标题

内容段落。

### 三级标题

- 列表项 1
- 列表项 2

> 引用内容

```code
代码块
```
````

````

#### 4.3 短代码使用

```markdown
<!-- 按钮短代码 -->
{{< button label="开始" link="/contact" >}}

<!-- 图片短代码 -->
{{< image src="/images/photo.jpg" title="图片标题" >}}
````

### 5. 配置文件规范

#### 5.1 hugo.toml

主配置文件，包含全局设置：

```toml
baseURL = "/"
title = "Guangzhou Scent Museum"
theme = "hugoplate"
timeZone = "Asia/Shanghai"
hasCJKLanguage = true
defaultContentLanguage = 'en'

[markup.goldmark.renderer]
unsafe = true  # 允许 HTML

[module]
[[module.mounts]]
source = 'assets'
target = 'assets'
```

#### 5.2 params.toml

主题参数配置：

```toml
# Logo 配置
logo = "images/logo.png"
logo_width = "160px"
logo_darkmode = "images/logo-darkmode.png"

# 主题设置
theme_switcher = true
theme_default = "system"  # light/dark/system

# 元数据
[metadata]
keywords = ["Boilerplate", "Hugo"]
description = "Site description"
author = "Author name"
```

### 6. 多语言规范

#### 6.1 语言配置

在 `config/_default/languages.toml`：

```toml
[en]
languageName = "English"
languageCode = "en-us"
contentDir = "content/english"
weight = 1

[zh-cn]
languageName = "简体中文"
languageCode = "zh-CN"
contentDir = "content/zhcn"
weight = 2
```

#### 6.2 翻译文件

在 `i18n/` 目录下：

- `en.yaml` - 英文翻译
- `zh_cn.yaml` - 中文翻译

```yaml
# en.yaml
read_more: "Read More"
latest_posts: "Latest Posts"

# zh_cn.yaml
read_more: "阅读更多"
latest_posts: "最新文章"
```

#### 6.3 菜单配置

按语言分别配置：

```
config/_default/menus.en.toml
config/_default/menus.zh-cn.toml
```

## 工作流程

### 开发环境

```bash
# 启动开发服务器
npm run dev

# 或使用 Hugo 命令
hugo server

# 忽略缓存
hugo server --ignoreCache
```

### 构建生产版本

```bash
# 构建并优化
npm run build

# 预览生产构建
npm run preview
```

### 代码格式化

```bash
# 格式化所有文件
npm run format
```

### 模块更新

```bash
# 更新所有模块
npm run update-modules
```

## 最佳实践

### 1. 性能优化

- 图片使用 `partial "image"` 进行响应式处理
- 启用 `lazy="true"` 延迟加载非关键资源
- 使用 `[[build.cachebusters]]` 处理缓存
- 生产环境构建时使用 `--gc --minify`

### 2. SEO 优化

- 所有页面填写完整的 meta description
- 使用结构化数据
- 配置 sitemap 和 robots.txt
- 确保图片有 alt 文本

### 3. 响应式设计

- 移动优先设计原则
- 使用 Tailwind 响应式断点
- 测试不同设备上的显示效果

### 4. 可维护性

- 减少重复代码，使用 partials
- 合理使用 `partialCached` 提高性能
- 清晰命名变量和函数
- 添加必要的注释

### 5. Git 规范

- 提交信息清晰描述变更
- 避免提交 `public/`、`resources/_gen/` 等生成文件
- 使用 `.gitignore` 正确配置

## 常见问题

### 样式未更新

```bash
# 清除 Hugo 缓存
hugo server --ignoreCache

# 或手动删除缓存目录
rm -rf resources/_gen
```

### 新语言添加

1. 在 `languages.toml` 添加语言配置
2. 创建对应的内容目录 `content/<lang>/`
3. 复制并翻译菜单文件 `menus.<lang>.toml`
4. 创建翻译文件 `i18n/<lang>.yaml`

### 自定义布局

在项目的 `layouts/` 目录创建与主题相同的文件路径即可覆盖：

```
layouts/
├── _default/
│   └── single.html       # 覆盖主题的单页模板
└── partials/
    └── custom-partial.html  # 新增 partial
```

## 参考资源

- [Hugo 官方文档](https://gohugo.io/documentation/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Go Template 文档](https://gohugo.io/templates/introduction/)
- 项目开发文档：`DEVELOPER_DOCS.md`
