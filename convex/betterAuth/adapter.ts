import { createApi } from "@convex-dev/better-auth";
import { createAuthOptions } from "./auth";
import schema from "./schema";
// 为 Better Auth 组件导出适配器函数。
export const {
  create,
  findOne,
  findMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
} = createApi(schema, createAuthOptions);
