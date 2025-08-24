import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Menu, X, User } from "lucide-react";

export default function OTTNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          BugStream
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/movies" className="text-gray-300 hover:text-white text-sm">Home</Link>
          <Link to="/movies" className="text-gray-300 hover:text-white text-sm">Movies</Link>
          <Link to="/tv" className="text-gray-300 hover:text-white text-sm">TV Shows</Link>
          <Link to="/movies/upload" className="text-gray-300 hover:text-white text-sm">Upload</Link>
          <Link to="/my-list" className="text-gray-300 hover:text-white text-sm">My List</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm focus:outline-none w-40 md:w-64"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
            ) : (
              <button onClick={() => setSearchOpen(true)} className="text-gray-300 hover:text-white">
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Notifications */}
          <button className="text-gray-300 hover:text-white">
            <Bell className="w-5 h-5" />
          </button>

          {/* Profile */}
          <button className="text-gray-300 hover:text-white">
            <User className="w-5 h-5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 px-4 py-4 space-y-3">
          <Link to="/" className="block text-gray-300 hover:text-white">Home</Link>
          <Link to="/movies" className="block text-gray-300 hover:text-white">Movies</Link>
          <Link to="/tv" className="block text-gray-300 hover:text-white">TV Shows</Link>
          <Link to="/categories" className="block text-gray-300 hover:text-white">Categories</Link>
          <Link to="/my-list" className="block text-gray-300 hover:text-white">My List</Link>
        </div>
      )}
    </nav>
  );
}
