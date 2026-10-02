# 部署

Cloudflare Pages：Build command `npm run build`，Output directory `dist`。

Pages 项目变量/Secrets：

- `ADMIN_PASSWORD`：后台密码（Secret）
- `SESSION_SECRET`：随机长字符串（Secret）
- `GITHUB_TOKEN`：GitHub fine-grained token（Secret）
- `GITHUB_OWNER`：GitHub 用户名/组织
- `GITHUB_REPO`：博客仓库
- `GITHUB_BRANCH`：main

GitHub Token 给该仓库 Contents: Read and write 权限。

手机访问 `/admin/`，登录后即可新建、编辑、删除文章。图片不使用 R2，直接在 Markdown 中粘贴公开图片 URL。
