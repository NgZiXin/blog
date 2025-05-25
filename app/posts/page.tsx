import Image from "next/image";
import Link from "next/link";
import path from 'path';
import fs from 'fs/promises';
import React from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
  img: string;
}

export default async function Posts() {
  const postsFilePath = path.join(process.cwd(), 'data', 'posts.json');
  const fileContents = await fs.readFile(postsFilePath, 'utf8');
  const posts: Post[] = JSON.parse(fileContents);

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <ul className="space-y-4">
        {posts.map(({ id, title, body, img }) => (
          <li key={id}>
            <Card id={id} title={title} body={body} img={img} />
          </li>
        ))}
      </ul>
    </main>
  );
}

function Card({id, title, body, img}: Post) {
    const placeHolderImg = "/posts/images/stock.jpg";
    const imageSrc = img || placeHolderImg;

   return (
    <Link
      href="#"
      className="flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      {/* Fixed-size image container */}
    <div className="w-full h-96 md:w-48 md:h-48 relative flex-shrink-0">
        <Image
          src={imageSrc}
          alt="Blog Image"
          placeholder="blur"
          blurDataURL="/posts/images/stock.jpg"
          fill
          className="object-cover rounded-t-lg md:rounded-none md:rounded-s-lg"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col p-4 md:h-48 h-24">
        <div className="h-6 md:h-14 flex flex-col justify-end">
        <h5 className="text-lg leading-tight font-semibold text-gray-900 dark:text-white line-clamp-1 md:line-clamp-2 break-all">
          {title}
        </h5>
        </div>
        <p className="text-sm mt-1 leading-normal text-gray-700 dark:text-gray-300 line-clamp-2 md:line-clamp-4 break-all">
          {body}
        </p>
      </div>
    </Link>
  );
}