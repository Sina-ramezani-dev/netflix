import { NextResponse } from "next/server";
import { pool } from "@/utils/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM categories");
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
    const { name, description } = await req.json();
    await pool.query(
      "INSERT INTO categories (name, description) VALUES ($1, $2)",
      [name, description]
    );
    return NextResponse.json({ message: "Catégorie ajoutée" });
  }
  