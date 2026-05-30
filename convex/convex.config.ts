import { defineApp } from "convex/server";
import betterAuth from "./betterAuth/convex.config";
import presence from "@convex-dev/presence/convex.config";
// 在您的 Convex 项目中注册 Better Auth 组件。
const app = defineApp();

app.use(betterAuth);
app.use(presence);

export default app;
