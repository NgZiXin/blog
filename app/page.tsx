import Post from "@/types/Post";
import { getPosts } from "@/actions/posts";
import Carousel from "@/components/home/Carousel";
// import Clock from "@/components/commons/Clock";

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
      <main className="flex flex-col items-center w-full p-8 sm:p-12">
        {/* <Clock /> */}
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-950 dark:from-blue-500 to-blue-700 dark:to-blue-750 uppercase mb-6">
          Travel Blog
        </h1>
        <Carousel posts={posts} />
      </main>
  );
}
