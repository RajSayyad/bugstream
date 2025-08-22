import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/v1/movies")
      .then(res => setMovies(res.data))
      .catch(err => setError(err.response?.data?.error || err.message))
      .finally(() => setLoading(false));
  }, []);
  console.log(movies);
  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading movies...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  if (movies.length === 0) {
    return <div className="p-6 text-center text-gray-500">No movies found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {movies.map(movie => (
        <Link key={movie.id} to={`/movies/${movie.id}`} className="block group">
          {movie.thumbnail_url && (
            <img
              src={movie.thumbnail_url}
              alt={movie.title}
              className="rounded-xl shadow-lg w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          )}
          <h3 className="mt-2 text-center text-lg font-semibold group-hover:text-blue-600">{movie.title}</h3>
          {movie.videos && movie.videos.length > 0 && (
            <div className="mt-2 flex flex-col gap-2">
              {movie.videos.map((videoUrl, idx) => (
                <video key={idx} src={videoUrl} controls className="w-full h-32 rounded" />
              ))}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
