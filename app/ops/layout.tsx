// 内部系统的根布局。/ops 不在 (main) 路由组里,所以要有自己的 <html>/<body>
// 和样式引入 —— 否则页面渲染出来是裸 HTML。
//
// 刻意不带官网的 Nav/Footer/Cookie 横幅:这是给仓库和销售用的工具,
// 不是给访客看的页面,少一层 chrome 就少一分干扰。
import type { ReactNode } from "react";

import "../globals.css";

export default function OpsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
