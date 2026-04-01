import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ImageIcon, Video } from 'lucide-react';
import type { GalleryItem } from '../../types';
import { logger } from '../../lib/logger';
import { getMediaUrl, extractYouTubeId } from '../../lib/utils';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    type: 'photo',
    category: 'events',
    videoUrl: '',
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = () => {
    fetch(`${API_URL}/gallery`)
      .then((res) => res.json())
      .then(setItems)
      .catch((err) => logger.error('Error loading gallery:', err));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('title', newItem.title);
    formData.append('type', newItem.type);
    formData.append('category', newItem.category);
    formData.append('videoUrl', newItem.videoUrl);
    if (file) formData.append('file', file);

    const res = await fetch(`${API_URL}/gallery`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      setShowAdd(false);
      setNewItem({
        title: '',
        type: 'photo',
        category: 'events',
        videoUrl: '',
      });
      setFile(null);
      fetchGallery();
    }
  };

  // const handleDelete = async (id: number) => {
  //   if (!confirm("Are you sure you want to delete this announcement?")) return;
  //   const token = localStorage.getItem("adminToken");
  //   const res = await fetch(`/api/gallery/${id}`, {
  //     method: "DELETE",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   if (res.ok) {
  //     fetchGallery(); // refresh list
  //   } else {
  //     alert("Delete failed");
  //   }
  // };
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('adminToken');

    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (!confirmDelete) return;

    const res = await fetch(`${API_URL}/gallery/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      fetchGallery(); // refresh list
    } else {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-display text-school-blue">Manage Gallery</h3>
        <button onClick={() => setShowAdd(true)} className="btn-primary flex items-center gap-2">
          <Plus size={20} /> Add Media
        </button>
      </div>

      {showAdd && (
        <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-200">
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                required
              />
              <select
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value as any })}
              >
                <option value="photo">Photo</option>
                <option value="video">Video</option>
              </select>
              <select
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              >
                <option value="events">Events</option>
                <option value="activities">Activities</option>
                <option value="classrooms">Classrooms</option>
                <option value="celebrations">Celebrations</option>
              </select>
              {newItem.type === 'photo' ? (
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                  required
                />
              ) : (
                <input
                  type="text"
                  placeholder="YouTube Video URL"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                  value={newItem.videoUrl}
                  onChange={(e) => setNewItem({ ...newItem, videoUrl: e.target.value })}
                  required
                />
              )}
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">
                Upload Media
              </button>
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="px-6 py-2 rounded-full font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm border border-slate-200"
          >
            <img
              src={
                item.type === 'photo'
                  ? getMediaUrl(item.url)
                  : ((): string => {
                      const id = extractYouTubeId(item.url);
                      return id
                        ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
                        : getMediaUrl(item.url || '');
                    })()
              }
              alt={item.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 bg-red-500 text-white rounded-xl cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
            </div>
            {item.type === 'video' && (
              <div className="absolute top-2 left-2 bg-primary text-white p-1 rounded-md">
                <Video size={14} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
