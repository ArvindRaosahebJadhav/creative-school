import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Award, Star } from 'lucide-react';
import { formatDate, getMediaUrl } from '../../lib/utils';
import { logger } from '../../lib/logger';
import type { Achievement } from '../../types';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newAch, setNewAch] = useState({ title: '', student_name: '', description: '', date: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = () => {
    fetch(`${API_URL}/achievements`)
      .then((res) => res.json())
      .then(setAchievements)
      .catch((err) => logger.error('Error loading achievements:', err));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('title', newAch.title);
    formData.append('student_name', newAch.student_name);
    formData.append('description', newAch.description);
    formData.append('date', newAch.date);
    if (imageFile) formData.append('image', imageFile);

    const res = await fetch(`${API_URL}/achievements`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      setShowAdd(false);
      setNewAch({ title: '', student_name: '', description: '', date: '' });
      setImageFile(null);
      fetchAchievements();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-display text-school-blue">Manage Achievements</h3>
        <button onClick={() => setShowAdd(true)} className="btn-primary flex items-center gap-2">
          <Plus size={20} /> Add Achievement
        </button>
      </div>

      {showAdd && (
        <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-200">
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Achievement Title"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={newAch.title}
                onChange={(e) => setNewAch({ ...newAch, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Student Name"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={newAch.student_name}
                onChange={(e) => setNewAch({ ...newAch, student_name: e.target.value })}
                required
              />
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={newAch.date}
                onChange={(e) => setNewAch({ ...newAch, date: e.target.value })}
                required
              />
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
              />
            </div>
            <textarea
              placeholder="Description"
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
              value={newAch.description}
              onChange={(e) => setNewAch({ ...newAch, description: e.target.value })}
              required
            ></textarea>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">
                Save Achievement
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 group"
          >
            <div className="aspect-video relative">
              <img
                src={getMediaUrl(ach.image_url) || 'https://picsum.photos/seed/award/400/200'}
                alt={ach.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={18} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-primary font-bold text-xs mb-2">
                <Star size={14} fill="currentColor" />
                <span>{formatDate(ach.date)}</span>
              </div>
              <h4 className="font-bold text-school-blue">{ach.title}</h4>
              <p className="text-slate-500 text-xs mt-1">Student: {ach.student_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
