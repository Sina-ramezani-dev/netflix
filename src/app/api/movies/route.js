import { pool } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await pool.query(`
    SELECT movies.*, categories.name AS category_name
    FROM movies
    JOIN categories ON movies.category_id = categories.id
    ORDER BY movies.id DESC
  `);
  return NextResponse.json(result.rows);
}

export async function POST(req) {
  const { title, description, image_url, category_id } = await req.json();
  await pool.query(
    "INSERT INTO movies (title, description, image_url, category_id) VALUES ($1, $2, $3, $4)",
    [title, description, image_url, category_id]
  );
  return NextResponse.json({ message: "Film ajouté" });
}
