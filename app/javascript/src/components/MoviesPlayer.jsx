import React, { useEffect, useState, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import { useParams } from "react-router-dom";
import "plyr-react/plyr.css";

export default function MoviePlayer() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const [selectedIdx, setSelectedIdx] = useState(0);

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

  const year = movie.year || "2023";
  const duration = movie.duration || "1h 30m";
  const ageRating = movie.age_rating || "U/A 16+";
  const imdb = movie.imdb || "IMDb 8.5";
  const genre = movie.genre || "Drama";

  const videos = movie.videos || [];
  const selectedVideo = videos[selectedIdx];

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Hero Section */}
      <div className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row pt-8 pb-12 px-4 md:px-8 gap-8">
        
        {/* Video Player */}
        <div className="flex-[2] rounded-2xl overflow-hidden shadow-xl">
          <div className="w-full aspect-video bg-black">
            <VideoPlayer
              src={selectedVideo}
              poster={movie.thumbnail_url || undefined}
            />
          </div>
        </div>

        {/* Movie Info */}
        <div className="flex-[1.2] flex flex-col justify-start gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">{movie.title}</h1>
          <p className="text-green-400 text-sm font-semibold">
            PRIMETIME EMMYS® nominee 2017
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">{imdb}</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">{year}</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">{duration}</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">{ageRating}</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">{genre}</span>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">{movie.description}</p>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 pb-12">
        <h3 className="text-2xl font-bold mb-6">Episodes</h3>
        <div className="flex flex-col gap-6">
          {videos.map((videoUrl, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`flex flex-row gap-4 bg-zinc-900 rounded-xl shadow-lg p-4 border transition hover:border-purple-600 cursor-pointer ${
                selectedIdx === idx ? "border-purple-600" : "border-transparent"
              }`}
            >
              {/* Thumbnail */}
              <img
                src={movie.thumbnail_url || undefined}
                alt={movie.title}
                className="w-40 h-24 object-cover rounded-lg"
              />

              {/* Episode Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-semibold">
                    S1 E{idx + 1} – Episode {idx + 1}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    October {24 + idx * 7}, {year} • {duration}
                  </p>
                </div>
                <p className="text-gray-300 text-sm max-w-2xl">
                  {movie.description || "No description available."}
                </p>
                {/* If unavailable */}
                {videoUrl === null && (
                  <span className="mt-2 inline-block bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded">
                    This title is unavailable due to expired rights
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
