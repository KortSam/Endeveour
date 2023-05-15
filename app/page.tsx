"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { searchArtworks, Artwork } from "@/services/rijksmuseum";
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  const search = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const artworks = await searchArtworks(query, sortOption);
    setArtworks(artworks);
  };

  const handleSortChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSortOption(event.target.value);
  };

  return (
    <div className="p-6">
      <form onSubmit={search} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artworks"
          className="border-gray-300 border-2 p-2 w-4/6 rounded-md my-2"
        />
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="border-gray-300 border-2 p-3 rounded-md my-2 m-1 w-3/12"
        >
          <option value="">Sort By</option>
          <option value="objecttype">Type</option>
          <option value="chronologic">Oldest First</option>
          <option value="achronologic">Newest First</option>
          <option value="artist">Artist (A-Z)</option>
          <option value="artistdesc">Artist (Z-A)</option>
        </select>
        <button
          type="submit"
          className="border-gray-300 border-2 p-2 rounded-md w-full my-2 bg-slate-500 justify-center"
        >
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="border-gray-300 border-2 p-4 rounded-md"
          >
            <Link href={`/pages/artwork/${artwork.objectNumber}`}>
              <img
                src={artwork.webImage?.url}
                alt={artwork.title}
                className="mb-2 rounded-md"
              />
              <h2 className="text-red-500">{artwork.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
