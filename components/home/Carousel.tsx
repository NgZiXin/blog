"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type Post from "@/types/Post";

interface CarouselProps {
  posts: Post[];
  interval?: number;
}

export default function Carousel({ posts, interval = 5000 }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = posts.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, interval);
    return () => clearInterval(timer);
  }, [totalSlides, interval]);

  return (
    <div className="max-w-lg rounded-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow flex flex-col">
      {/* Slide container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {posts.map((post, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <CarouselCard post={post} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end p-4">
      <Link
        href="/posts"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
      >
        Explore More
        <svg
          className="w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
      </div>
    </div>
  );
}

function CarouselCard({ post }: { post: Post }) {
  const { title, img, date } = post;
  const placeHolderImg = "/posts/images/stock.jpg";
  const imageSrc = img || placeHolderImg;

  return (
    <div className="flex flex-col">
      <div className="relative h-48 sm:h-60 md:h-72">
        <Image
          src={imageSrc}
          alt="Blog Image"
          placeholder="blur"
          blurDataURL={placeHolderImg}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {getFormattedDate(date)}
        </h5>
        <p className="mb-3 font-normal line-clamp-1 text-gray-900 dark:text-gray-100 max-w-[75%]">
          {title}
        </p>
      </div>
    </div>
  );
}

function getFormattedDate(date: Date): string {
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year: number = date.getFullYear();
  const month: string = MONTHS[date.getMonth()];
  const day: number = date.getDate();
  return `${day} ${month} ${year}`;
}
