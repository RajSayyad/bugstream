import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AlertCircle, Film } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-950 to-black">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl px-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white/5 backdrop-blur-md rounded-2xl shadow-lg h-72"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-950 to-black">
        <div className="flex items-center gap-3 bg-red-500/10 text-red-400 px-6 py-4 rounded-xl border border-red-500/30 shadow-lg">
          <AlertCircle className="w-6 h-6" />
          <span className="font-medium">Error: {error}</span>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-950 to-black text-gray-400">
        <Film className="w-14 h-14 mb-4 opacity-50" />
        <p className="text-lg">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-6 py-16 bg-gradient-to-br from-gray-900 via-purple-950 to-black">
      <h1 className="text-4xl font-extrabold text-center text-white mb-12 drop-shadow-lg tracking-wide">
        🎬 Explore Movies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl overflow-hidden hover:scale-[1.04] hover:shadow-purple-600/50 transition-all duration-300"
          >
            {/* Thumbnail */}
            {movie.thumbnail_url ? (
              <div className="w-full h-72 flex items-center justify-center bg-black">
                <img
                  src={movie.thumbnail_url}
                  alt={movie.title}
                  className="h-full w-full object-cover group-hover:opacity-90 transition"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-72 bg-gray-800">
                <Film className="w-10 h-10 text-gray-500" />
              </div>
            )}

            {/* Content */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition">
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
