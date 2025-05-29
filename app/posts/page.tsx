import type Post from "@/types/Post";
import PostCard from "@/components/posts/PostCard";
import { getPosts } from "@/actions/posts";

export default async function Posts() {
  const posts: Post[] = await getPosts();

  return (
    <main className="flex flex-col items-center p-8 sm:p-12">
      <ul className="space-y-8 md:space-y-4 mb-6">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </main>
  );
}