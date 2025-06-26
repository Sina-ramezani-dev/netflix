import { pool } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const categoryId = params.id;

  try {
    const result = await pool.query(
      `
      SELECT movies.*, categories.name AS category_name
      FROM movies
      JOIN categories ON movies.category_id = categories.id
      WHERE category_id = $1
      `,
      [categoryId]
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
