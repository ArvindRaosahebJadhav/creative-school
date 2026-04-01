import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Bell } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import type { Announcement } from '../../types';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
import { logger } from '../../lib/logger';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newAnn, setNewAnn] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    fetch(`${API_URL}/announcements`)
      .then((res) => res.json())
      .then(setAnnouncements)
      .catch((err) => logger.error('Error loading announcements:', err));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`${API_URL}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newAnn),
    });
    if (res.ok) {
      setShowAdd(false);
      setNewAnn({ title: '', content: '', date: new Date().toISOString().split('T')[0] });
      fetchAnnouncements();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`${API_URL}/announcements/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) fetchAnnouncements();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-display text-school-blue">Manage Announcements</h3>
        <button onClick={() => setShowAdd(true)} className="btn-primary flex items-center gap-2">
          <Plus size={20} /> Add New
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
                value={newAnn.title}
                onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })}
                required
              />
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={newAnn.date}
                onChange={(e) => setNewAnn({ ...newAnn, date: e.target.value })}
                required
              />
            </div>
            <textarea
              placeholder="Content"
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
              value={newAnn.content}
              onChange={(e) => setNewAnn({ ...newAnn, content: e.target.value })}
              required
            ></textarea>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">
                Save Announcement
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

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-700">Date</th>
              <th className="px-6 py-4 font-bold text-slate-700">Title</th>
              <th className="px-6 py-4 font-bold text-slate-700">Content</th>
              <th className="px-6 py-4 font-bold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {announcements.map((ann) => (
              <tr key={ann.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                  {formatDate(ann.date)}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">{ann.title}</td>
                <td className="px-6 py-4 text-sm text-slate-600 max-w-md truncate">
                  {ann.content}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(ann.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {announcements.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            <Bell size={48} className="mx-auto mb-4 opacity-20" />
            <p>No announcements found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
