import { getAuthConfigProvider } from "@convex-dev/better-auth/auth-config";
import type { AuthConfig } from "convex/server";
// 添加一个 convex/auth.config.ts 文件来配置 Better Auth 作为身份验证提供者。
export default {
  providers: [getAuthConfigProvider()],
} satisfies AuthConfig;
