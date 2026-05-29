import z from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  content: z
    .string()
    .min(10, { message: "Name must be at least 10 characters" }),
  image: z.instanceof(File),
});
