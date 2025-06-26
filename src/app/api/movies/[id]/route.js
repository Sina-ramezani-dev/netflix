import { pool } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const { title, description, image_url, category_id } = await req.json();

  await pool.query(
    "UPDATE movies SET title = $1, description = $2, image_url = $3, category_id = $4 WHERE id = $5",
    [title, description, image_url, category_id, id]
  );

  return NextResponse.json({ message: "Film modifié" });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await pool.query("DELETE FROM movies WHERE id = $1", [id]);
  return NextResponse.json({ message: "Film supprimé" });
}
