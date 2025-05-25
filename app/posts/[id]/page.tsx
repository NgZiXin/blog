import fs from "fs/promises";
import Image from "next/image";
import { notFound } from "next/navigation";
import LikeCounter from "@/components/LikeCounter";
import { Post } from "@/types/post";
import { postsFilePath, likesFilePath } from "@/constants/FilePath";

interface Like {
  id: number;
  count: number;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const post = await getPost(Number(id));
  if (!post) return notFound();

  const like = await getLike(Number(id)); // Note that newly inputted likes will not be saved

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
        <div className="w-full mt-8 flex justify-end">
          <LikeCounter
            initialCount={like.count}
            changeInterval={1}
            hasReset={false}
          />
        </div>
      </div>
    </main>
  );
}

async function getPost(id: number): Promise<Post | null> {
  const fileContent = await fs.readFile(postsFilePath, "utf-8");
  const posts: Post[] = JSON.parse(fileContent);
  return posts.find((post) => post.id === id) || null;
}

async function getLike(id: number): Promise<Like> {
  const fileContent = await fs.readFile(likesFilePath, "utf-8");
  const likes: Like[] = JSON.parse(fileContent);
  let like = likes.find((like) => like.id === id) || null;

  // Initialise Like and store in JSON if do not exist
  if (!like) {
    like = { id: id, count: 0 };
    likes.push(like);
    await fs.writeFile(likesFilePath, JSON.stringify(likes, null, 2), "utf-8");
  }

  return like;
}
