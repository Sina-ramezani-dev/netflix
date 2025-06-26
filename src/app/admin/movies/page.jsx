"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieAdmin() {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    category_id: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchMovies = async () => {
    const res = await axios.get("/api/movies");
    setMovies(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get("/api/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchMovies(); //recupere all film
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`/api/movies/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("/api/movies", form);
    }
    setForm({ title: "", description: "", image_url: "", category_id: "" });
    fetchMovies();
  };

  const handleEdit = (movie) => {
    setEditId(movie.id);
    setForm({
      title: movie.title,
      description: movie.description,
      image_url: movie.image_url,
      category_id: movie.category_id,
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/movies/${id}`);
    fetchMovies();
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestion des Films/Séries</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          className="w-full border p-2 rounded"
          type="text"
          name="title"
          placeholder="Titre"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          className="w-full border p-2 rounded"
          type="text"
          name="image_url"
          placeholder="URL de l’image"
          value={form.image_url}
          onChange={handleChange}
        />
        <select
          className="w-full border p-2 rounded"
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          required
        >
          <option value="">Choisir une catégorie</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? "Modifier" : "Ajouter"}
        </button>
      </form>

      <ul className="space-y-4">
        {movies.map((movie) => (
          <li key={movie.id} className="flex gap-4 items-center border p-3 rounded">
            <img
              src={movie.image_url}
              alt={movie.title}
              className="w-[100px] h-[100px] object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-600">{movie.description}</p>
              <p className="text-sm italic text-gray-500">
                Catégorie : {movie.category_name}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleEdit(movie)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Éditer
              </button>
              <button
                onClick={() => handleDelete(movie.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
