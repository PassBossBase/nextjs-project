import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
// 为从您的客户端与 Better Auth 服务器交互而创建 Better Auth 客户端实例。
export const authClient = createAuthClient({
  plugins: [convexClient()],
});
