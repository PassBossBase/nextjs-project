import { defineApp } from "convex/server";
import betterAuth from "./betterAuth/convex.config";
// 在您的 Convex 项目中注册 Better Auth 组件。
const app = defineApp();

app.use(betterAuth);

export default app;
