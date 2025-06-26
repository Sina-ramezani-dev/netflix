"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [categories, setCategories] = useState([]);

  // la partie pour faire un appel avec Axios avec utilisation hook (useEffect)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data); //setCategories stocker les catégories
      } catch (error) {
        console.error("Erreur lors du chargement des catégories", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Bienvenue sur Netflix 🍿</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <p className="mb-4">{category.description}</p>
            <Link
              href={`/categories/${category.id}`}
              className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Voir les films
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
