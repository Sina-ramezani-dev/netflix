import { pool } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const { name, description } = await req.json();
  await pool.query(
    "UPDATE categories SET name = $1, description = $2 WHERE id = $3",
    [name, description, id]
  );
  return NextResponse.json({ message: "Catégorie mise à jour" });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
  return NextResponse.json({ message: "Catégorie supprimée" });
}
