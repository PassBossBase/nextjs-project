import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";
// 为认证服务器端渲染、服务器函数和路由处理器配置一组辅助函数。
export const {
  handler,
  preloadAuthQuery,
  isAuthenticated,
  getToken,
  fetchAuthQuery,
  fetchAuthMutation,
  fetchAuthAction,
} = convexBetterAuthNextJs({
  convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL!,
  convexSiteUrl: process.env.NEXT_PUBLIC_CONVEX_SITE_URL!,
});
