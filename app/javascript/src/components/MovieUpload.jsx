import React, { useState } from "react";
import axios from "axios";

export default function MovieUpload() {
  const [title, setTitle] = useState("");
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
    if (thumbnail) formData.append("movie[thumbnail]", thumbnail);
    videos.forEach(video => formData.append("movie[videos][]", video));
    try {
      await axios.post("/api/v1/movies", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setSuccess(true);
      setTitle("");
      setThumbnail(null);
      setVideos([]);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Movie</h2>
      {error && <div className="mb-2 text-red-500">{error}</div>}
      {success && <div className="mb-2 text-green-500">Movie uploaded successfully!</div>}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border rounded px-3 py-2" />
      </div>
      <div className="mb-4">
  {/* Poster field removed, not used in backend */}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Thumbnail</label>
        <input type="file" accept="image/*" onChange={handleThumbnailChange} required className="w-full" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Videos (has_many)</label>
        <input type="file" accept="video/*" multiple onChange={handleVideosChange} className="w-full" />
      </div>
      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {loading ? "Uploading..." : "Upload Movie"}
      </button>
    </form>
  );
}
