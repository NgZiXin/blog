"use server";

import fs from "fs/promises";
import Post from "@/types/Post";
import Like from "@/types/Like";
import { postsFilePath, likesFilePath } from "@/constants/FilePath";

export async function getPosts(): Promise<Post[]> {
  const fileContent = await fs.readFile(postsFilePath, "utf-8");
  return JSON.parse(fileContent);
}

export async function getPost(id: number): Promise<Post | null> {
  const posts: Post[] = await getPosts();
  return posts.find((post) => post.id === id) || null;
}

export async function getLikes(): Promise<Like[]> {
  const fileContent = await fs.readFile(likesFilePath, "utf-8");
  return JSON.parse(fileContent);
}

export async function saveLike(newLike: Like) {
  const likes: Like[] = await getLikes();
  const doLikeExists = likes.some((like) => like.id === newLike.id);

  const newLikes: Like[] = doLikeExists
    ? likes.map((like) => (like.id === newLike.id ? newLike : like))
    : [...likes, newLike];
  await fs.writeFile(likesFilePath, JSON.stringify(newLikes, null, 2), "utf-8");
}

export async function getLike(id: number): Promise<Like> {
  const likes: Like[] = await getLikes();
  let like = likes.find((like) => like.id === id) || null;

  // Initialise Like and store in JSON if do not exist
  if (!like) {
    like = { id, count: 0 };
    await saveLike(like);
  }

  return like;
}
