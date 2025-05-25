import Image from "next/image";
import { notFound } from "next/navigation";
import LikeCounter from "@/components/LikeCounter";
import { getPost, getLike } from "@/actions/posts";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const post = await getPost(Number(id));
  if (!post) return notFound();

  const like = await getLike(Number(id));

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <div className="p-6 md:p-10 space-y-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md">
        <Image
          src={post.img}
          alt={post.title}
          width={800}
          height={400}
          className="rounded-lg object-cover"
        />

        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h1>

        <p className="text-lg leading-normal text-gray-700 dark:text-gray-300">
          {post.body}
        </p>
        <div className="w-full mt-8 flex justify-end px-4">
          <LikeCounter
            id={Number(id)}
            initialCount={like.count}
            changeInterval={1}
            hasReset={false}
          />
        </div>
      </div>
    </main>
  );
}
