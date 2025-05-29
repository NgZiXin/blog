"use server";

import pool from "@/lib/db";
import type Post from "@/types/Post";

function parseRow(row: any): Post {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    img: row.img,
    date: new Date(row.date),
    likes: row.likes ?? 0,
  };
}

export async function getPosts(): Promise<Post[]> {
  const result = await pool.query("SELECT * FROM posts ORDER BY id");
  return result.rows.map(parseRow);
}

export async function getPost(id: number): Promise<Post | null> {
  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  if (result.rowCount === 0) return null;
  return parseRow(result.rows[0]);
}

export async function savePost(post: Post): Promise<void> {
  const exists = await getPost(post.id);
  if (exists) {
    await pool.query(
      "UPDATE posts SET title = $1, body = $2, img = $3, date = $4, likes = $5 WHERE id = $6",
      [post.title, post.body, post.img, post.date.toISOString(), post.likes, post.id]
    );
  } else {
    await pool.query(
      "INSERT INTO posts (id, title, body, img, date, likes) VALUES ($1, $2, $3, $4, $5, $6)",
      [post.id, post.title, post.body, post.img, post.date.toISOString(), post.likes]
    );
  }
}

export async function incrementLikes(id: number): Promise<number> {
  const result = await pool.query(
    "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING likes",
    [id]
  );
  if (result.rowCount === 0) throw new Error("Post id does not exist!");
  return result.rows[0].likes;
}

export async function decrementLikes(id: number): Promise<number> {
  const result = await pool.query(
    "UPDATE posts SET likes = GREATEST(likes - 1, 0) WHERE id = $1 RETURNING likes",
    [id]
  );
  if (result.rowCount === 0) throw new Error("Post id does not exist!");
  return result.rows[0].likes;
}