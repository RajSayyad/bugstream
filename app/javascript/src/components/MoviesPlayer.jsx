import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function MoviePlayer() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/movies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch movie");
        return res.json();
      })
      .then(data => setMovie(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6 text-center text-gray-500">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-500">Error: {error}</p>;
  if (!movie) return null;

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl mb-4 font-bold">{movie.title}</h2>
      {movie.videos && movie.videos.length > 0 ? (
        <div className="w-full flex flex-col gap-4 items-center">
          {movie.videos.map((videoUrl, idx) => (
            <video key={idx} src={videoUrl} controls width="80%" style={{maxHeight: 400}} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No videos available.</p>
      )}
      <p className="mt-4 text-lg text-center text-gray-700">{movie.description}</p>
    </div>
  );
}
