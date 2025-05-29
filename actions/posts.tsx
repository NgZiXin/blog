"use server";

import path from "path";
import fs from "fs/promises";
import type Post from "@/types/Post";

interface PostJson {
  id: number;
  title: string;
  body: string;
  img: string;
  date: string;
  likes?: number;
}

const postsFilePath = path.join(process.cwd(), "data", "posts.json");

export async function getPosts(): Promise<Post[]> {
  const fileContent = await fs.readFile(postsFilePath, "utf-8");
  return JSON.parse(fileContent).map((post: PostJson) => ({
    ...post,
    date: new Date(post.date),
    likes: post.likes ?? 0, // Initialise like if do not exists
  }));
}

export async function getPost(id: number): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((post) => post.id === id) || null;
}

export async function savePost(post: Post): Promise<void> {
  const posts = await getPosts();
  const doPostExists = posts.some((p) => post.id === p.id);

  if (!doPostExists) {
    fs.writeFile(
      postsFilePath,
      JSON.stringify([...posts, post], null, 2),
      "utf-8"
    );
    return;
  }

  const updatedPosts = posts.map((p) => (p.id === post.id ? post : p));
  fs.writeFile(postsFilePath, JSON.stringify(updatedPosts, null, 2), "utf-8");
}

export async function incrementLikes(id: number): Promise<number> {
  const post = await getPost(id);
  if (!post) {
    throw Error("Post id do not exists!");
  }

  const updatedLikes = post.likes + 1;
  const updatedPost = { ...post, likes: updatedLikes };
  savePost(updatedPost);

  return updatedLikes;
}

export async function decrementLikes(id: number): Promise<number> {
  const post = await getPost(id);
  if (!post) {
    throw Error("Post id do not exists!");
  }

  const updatedLikes = post.likes - 1;
  const updatedPost = { ...post, likes: updatedLikes };
  savePost(updatedPost);

  return updatedLikes;
}
