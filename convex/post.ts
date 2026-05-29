import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

export const createPost = mutation({
  args: { title: v.string(), body: v.string() },
  handler: async (ctx, { body, title }) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    const blogArticle = await ctx.db.insert("posts", {
      body,
      title,
      authorId: user._id,
    });

    return blogArticle;
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    return posts;
  },
});
