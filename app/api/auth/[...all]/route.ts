import { handler } from "@/lib/auth-server";
// 设置路由处理程序以将 auth 请求从 Next.js 代理到您的 Convex 部署。
export const { GET, POST } = handler;
