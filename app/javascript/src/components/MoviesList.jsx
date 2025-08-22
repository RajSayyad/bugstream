import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AlertCircle, Film } from "lucide-react"; // clean icons

export default function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/v1/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => setError(err.response?.data?.error || err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        <div className="flex flex-col gap-4 w-full max-w-6xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-black/40 rounded-2xl shadow-xl h-64"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex items-center gap-3 bg-red-500/10 text-red-400 px-6 py-4 rounded-xl border border-red-500/30 shadow-lg">
          <AlertCircle className="w-6 h-6" />
          <span className="font-medium">Error: {error}</span>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-400">
        <Film className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-lg">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-6 py-12 bg-gradient-to-br from-gray-900 via-purple-950 to-black">
      <h1 className="text-3xl font-bold text-center text-white mb-10 drop-shadow-md">
        🎬 Explore Movies
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            className="block group bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.03] hover:shadow-purple-700"
          >
            {movie.thumbnail_url ? (
              <div
                className="w-full flex items-center justify-center bg-black"
                style={{ height: "14rem" }}
              >
                <img
                  src={movie.thumbnail_url}
                  alt={movie.title}
                  className="max-h-56 w-auto object-contain group-hover:opacity-90 transition duration-200"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-56 bg-gray-800">
                <Film className="w-10 h-10 text-gray-500" />
              </div>
            )}
            <div className="p-4 flex flex-col gap-2 text-center">
              <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition drop-shadow-lg">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2">
                {movie.description || "No description available."}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
