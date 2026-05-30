import { commonImage } from "@/app/common";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";
import { connection } from "next/server";
import { cacheLife, cacheTag } from "next/cache";

export const metadata: Metadata = {
  title: "Blog | Next.js 16",
  description: "Read our latest article",
  category: "Web development",
  authors: [{ name: "Noah Li" }],
};

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="text-red-500">T</span>
          <span className="text-orange-500">H</span>
          <span className="text-yellow-500 pr-2">E</span>
          <span className="text-green-500">B</span>
          <span className="text-sky-500">L</span>
          <span className="text-blue-500">O</span>
          <span className="text-purple-500">G</span>
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insigths, Thoughts, and Trends from our team.
        </p>
      </div>
      {/* <Suspense fallback={<SkeletonLoadingUi />}> */}
      <LoadBlogList />
      {/* </Suspense> */}
    </div>
  );
}

async function LoadBlogList() {
  "use cache";

  cacheLife("hours");
  cacheTag("blog");
  await new Promise((res) => setTimeout(res, 5000));
  const data = await fetchQuery(api.post.getPosts);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((post) => {
        const { _id, title, body, imageUrl } = post;
        return (
          <Card key={_id} className="pt-0">
            <div className="relative w-full h-52 overflow-hidden">
              <Image
                fill
                src={imageUrl ?? commonImage}
                alt="image"
                className="rounded-t-lg w-full h-full object-cover"
              />
            </div>
            <CardContent>
              <Link href={`/blog/${post._id}`}>
                <h1 className="text-2xl font-bold hover:text-primary">
                  {title}
                </h1>
              </Link>
              <p className="text-muted-foreground line-clamp-3">{body}</p>
            </CardContent>
            <CardFooter>
              <Link
                className={buttonVariants({
                  className: "w-full",
                })}
                href={`/blog/${post._id}`}
              >
                Read more
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

function SkeletonLoadingUi() {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div className="flex flex-col space-y-3" key={i}>
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
