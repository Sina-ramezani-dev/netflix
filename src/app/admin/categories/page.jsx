"use client";
import { useEffect, useState } from "react";
import axios from "axios";

//useState est un compsosant
export default function CategoryAdmin() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    const res = await axios.get("/api/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`/api/categories/${editId}`, { name, description });
      setEditId(null);
    } else {
      await axios.post("/api/categories", { name, description });
    }
    setName("");
    setDescription("");
    fetchCategories();
  };

  const handleEdit = (category) => {
    setEditId(category.id);
    setName(category.name);
    setDescription(category.description);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/categories/${id}`);
    fetchCategories();
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestion des Catégories</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {editId ? "Modifier" : "Ajouter"}
        </button>
      </form>

      <ul className="space-y-4">
        {categories.map((cat) => (
          <li key={cat.id} className="flex justify-between items-center border p-3 rounded">
            <div>
              <h3 className="font-semibold">{cat.name}</h3>
              <p className="text-sm text-gray-600">{cat.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(cat)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Éditer
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
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
