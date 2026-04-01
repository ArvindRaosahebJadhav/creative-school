import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Users, GraduationCap } from 'lucide-react';
import type { Teacher } from '../../types';
import { getMediaUrl } from '../../lib/utils';
import { logger } from '../../lib/logger';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    qualification: '',
    experience: '',
    subject: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = () => {
    fetch(`${API_URL}/teachers`)
      .then((res) => res.json())
      .then(setTeachers)
      .catch((err) => logger.error('Error fetching teachers:', err));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('name', newTeacher.name);
    formData.append('qualification', newTeacher.qualification);
    formData.append('experience', newTeacher.experience);
    formData.append('subject', newTeacher.subject);
    if (imageFile) formData.append('image', imageFile);

    const res = await fetch(`${API_URL}/teachers`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      setShowAdd(false);
      setNewTeacher({ name: '', qualification: '', experience: '', subject: '' });
      setImageFile(null);
      fetchTeachers();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-display text-school-blue">Manage Teachers</h3>
        <button onClick={() => setShowAdd(true)} className="btn-primary flex items-center gap-2">
          <Plus size={20} /> Add Teacher
        </button>
      </div>

      {showAdd && (
        <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-200">
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Qualification"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={newTeacher.qualification}
                onChange={(e) => setNewTeacher({ ...newTeacher, qualification: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Experience (e.g. 5 Years)"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={newTeacher.experience}
                onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
                value={newTeacher.subject}
                onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                required
              />
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">
                Save Teacher
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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 group"
          >
            <div className="aspect-[4/5] relative">
              <img
                src={
                  getMediaUrl(teacher.imageUrl || teacher.image_url) ||
                  'https://picsum.photos/seed/teacher/400/500'
                }
                alt={teacher.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={18} />
              </button>
            </div>
            <div className="p-6 text-center">
              <h4 className="font-bold text-school-blue">{teacher.name}</h4>
              <p className="text-primary text-xs font-bold mb-2">{teacher.subject}</p>
              <p className="text-slate-500 text-[10px] flex items-center justify-center gap-1">
                <GraduationCap size={12} /> {teacher.qualification}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
