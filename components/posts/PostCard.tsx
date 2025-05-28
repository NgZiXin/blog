import Image from "next/image";
import Link from "next/link";
import Post from "@/types/Post";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { id, title, body, img } = post;
  const placeHolderImg = "/posts/images/stock.jpg";
  const imageSrc = img || placeHolderImg;

  return (
    <Link href={`/posts/${id}`}>
      <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        
        {/* Image content */}
        <div className="relative h-48 w-96 md:w-48 flex-shrink-0">
          <Image
            src={imageSrc}
            alt={title}
            placeholder="blur"
            blurDataURL="/posts/images/stock.jpg"
            fill
            className="object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
          />
        </div>

        {/* Text content */}
        <div className="relative p-4 md:h-48 h-24 w-96">
          <div className="h-6 md:h-14 flex flex-col justify-end">
            <h5 className="text-lg leading-tight font-semibold text-gray-900 dark:text-white line-clamp-1 md:line-clamp-2 break-all">
              {title}
            </h5>
          </div>
          <p className="text-sm mt-1 leading-normal text-gray-700 dark:text-gray-300 line-clamp-2 md:line-clamp-4 break-all">
            {body}
          </p>
        </div>
      </div>
    </Link>
  );
}
