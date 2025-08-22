import React, { useState } from "react";
import axios from "axios";

export default function MovieUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleThumbnailChange = e => setThumbnail(e.target.files[0]);
  const handleVideosChange = e => setVideos(Array.from(e.target.files));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const formData = new FormData();
    formData.append("movie[title]", title);
  formData.append("movie[description]", description);
  if (thumbnail) formData.append("movie[thumbnail]", thumbnail);
  videos.forEach(video => formData.append("movie[videos][]", video));
    try {
      await axios.post("/api/v1/movies", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setSuccess(true);
  setTitle("");
  setDescription("");
  setThumbnail(null);
  setVideos([]);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-2 py-8 bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-extrabold text-white mb-2 text-center tracking-wide drop-shadow-lg">Upload Movie</h2>
        {error && <div className="mb-2 text-red-400 bg-red-500/10 px-4 py-2 rounded-lg text-center border border-red-500/30">{error}</div>}
        {success && <div className="mb-2 text-green-400 bg-green-500/10 px-4 py-2 rounded-lg text-center border border-green-500/30">Movie uploaded successfully!</div>}
        <div>
          <label className="block mb-1 font-semibold text-white">Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border border-gray-700 bg-gray-900 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-white">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="w-full border border-gray-700 bg-gray-900 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-white">Thumbnail</label>
          <input type="file" accept="image/*" onChange={handleThumbnailChange} required className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-700 file:text-white file:font-semibold" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-white">Videos</label>
          <input type="file" accept="video/*,.mkv" multiple onChange={handleVideosChange} className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-700 file:text-white file:font-semibold" />
        </div>
        <button type="submit" disabled={loading} className="bg-purple-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? "Uploading..." : "Upload Movie"}
        </button>
      </form>
    </div>
  );
}
