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

  // Metadata (mocked for demo, replace with real data if available)
  const year = movie.year || "2023";
  const duration = movie.duration || "1h 30m";
  const ageRating = movie.age_rating || "U/A 16+";
  const imdb = movie.imdb || "IMDb 8.5";
  const genre = movie.genre || "Drama";

  // Video list
  const videos = movie.videos || [];
  const selectedVideo = videos[selectedIdx];

  console.log("Selected Video URL:", selectedVideo);

  return (
    <div className="min-h-screen w-full px-0 py-0 bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 pt-8 pb-12">
        {/* Main Player Section */}
        <div className="bg-gradient-to-br from-black via-gray-900 to-purple-950 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row md:items-center" style={{border: 'none'}}>
          <div className="flex-[2] flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 min-h-[480px]">
            <div className="w-full aspect-video max-w-6xl rounded-2xl overflow-hidden shadow-2xl bg-black relative z-10">
              <VideoPlayer
                src={selectedVideo}
                poster={movie.thumbnail_url || undefined}
              />
            </div>
          </div>
          <div className="flex-[1.2] flex flex-col justify-center gap-4 sm:gap-6 p-4 sm:p-8 md:p-12 bg-black/60 min-h-[480px] border-l-4 border-purple-700/30">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-wide drop-shadow-lg leading-tight">{movie.title}</h2>
            <div className="flex flex-wrap gap-3 sm:gap-4 items-center mb-4">
              <span className="bg-purple-700/40 text-purple-200 px-3 py-1 rounded-full text-sm font-semibold shadow">{imdb}</span>
              <span className="bg-gray-700/40 text-gray-200 px-3 py-1 rounded-full text-sm font-semibold shadow">{year}</span>
              <span className="bg-gray-700/40 text-gray-200 px-3 py-1 rounded-full text-sm font-semibold shadow">{duration}</span>
              <span className="bg-gray-700/40 text-gray-200 px-3 py-1 rounded-full text-sm font-semibold shadow">{ageRating}</span>
              <span className="bg-gray-700/40 text-gray-200 px-3 py-1 rounded-full text-sm font-semibold shadow">{genre}</span>
            </div>
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl font-medium">{movie.description}</p>
          </div>
        </div>

        {/* Video List Section */}
        <div className="w-full max-w-5xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 px-2">Episodes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {videos.map((videoUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`flex flex-row items-center gap-3 sm:gap-4 bg-black/70 rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-200 px-2 py-2 sm:px-4 sm:py-3 hover:border-purple-500 focus:border-purple-500 ${selectedIdx === idx ? 'border-purple-500' : 'border-transparent'}`}
              >
                <img
                  src={movie.thumbnail_url || undefined}
                  alt={movie.title}
                  className="w-16 h-16 sm:w-24 sm:h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex flex-col items-start w-full">
                  <span className="text-base sm:text-lg font-semibold text-white">S1 E{idx+1}</span>
                  <span className="text-xs sm:text-sm text-gray-300">{duration}</span>
                  <span className="text-xs text-gray-400">{movie.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
