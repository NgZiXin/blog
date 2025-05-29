import Image from "next/image";
import { notFound } from "next/navigation";
import LikeCounter from "@/components/posts/[id]/LikeCounter";
import { getPost } from "@/actions/posts";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPost(Number(id));
  if (!post) return notFound();

  const { title, body, img, likes } = post;
  return (
    <main className="p-8 sm:p-12">
      <div className="max-w-3xl mx-auto w-full space-y-6">
        <Image
          src={img}
          alt={title}
          width={800}
          height={400}
          className="rounded-lg object-cover"
        />

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>

        <p className="text-base text-justify font-sans leading-relaxed text-gray-700 dark:text-gray-300">
          {body}
        </p>
        <LikeCounter id={Number(id)} initialCount={likes} />
      </div>
    </main>
  );
}
