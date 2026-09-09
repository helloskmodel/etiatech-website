// 内部系统的会话 cookie 名。单独成文件、不引任何东西 —— 客户端组件和服务端
// 校验都要用它,而校验那边依赖 node:crypto,直接引会把 Node 模块打进浏览器包。
export const OPS_COOKIE = "etia-ops";
