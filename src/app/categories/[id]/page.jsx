"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function CategoryPage() {
  const { id } = useParams(); //récupérer l’id dans l’URL (ex: /categories/2 donc id = 2)
  const [films, setFilms] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchMovies = async () => {
      try {
        const res = await axios.get(`/api/categories/${id}/movies`); //appelle a l'api pour return all movies 
        setFilms(res.data);
        if (res.data.length > 0) {
          setCategoryName(res.data[0].category_name);
        } else {
          setCategoryName("Aucun film trouvé");
        }
      } catch (err) {
        console.error("Erreur : ", err);
      }
    };

    fetchMovies();
  }, [id]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Catégorie : {categoryName}</h1>
      {films.length === 0 ? (
        <p>Aucun film dans cette catégorie pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {films.map((film) => ( //boucle films avec tout les infos
            <div key={film.id} className="border p-4 rounded shadow">
              <img
                src={film.image_url}
                alt={film.title}
                className="w-full h-[250px] object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">{film.title}</h2>
              <p className="text-sm text-gray-600">{film.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
