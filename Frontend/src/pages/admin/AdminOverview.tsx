import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Calendar,
  ImageIcon,
  Users,
  Award,
  ArrowUpRight,
  Plus,
  Settings,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminOverview() {
  const [stats, setStats] = useState({
    announcements: 0,
    events: 0,
    gallery: 0,
    teachers: 0,
    achievements: 0,
  });

  useEffect(() => {
    // Fetch all counts
    Promise.all([
      fetch(`${API_URL}/announcements`).then((res) => res.json()),
      fetch(`${API_URL}/events`).then((res) => res.json()),
      fetch(`${API_URL}/gallery`).then((res) => res.json()),
      fetch(`${API_URL}/teachers`).then((res) => res.json()),
      fetch(`${API_URL}/achievements`).then((res) => res.json()),
    ]).then(([ann, eve, gal, tea, ach]) => {
      setStats({
        announcements: ann.length,
        events: eve.length,
        gallery: gal.length,
        teachers: tea.length,
        achievements: ach.length,
      });
    });
  }, []);

  const cards = [
    {
      name: 'Announcements',
      value: stats.announcements,
      icon: Bell,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      name: 'Upcoming Events',
      value: stats.events,
      icon: Calendar,
      color: 'text-secondary',
      bg: 'bg-secondary/10',
    },
    {
      name: 'Gallery Items',
      value: stats.gallery,
      icon: ImageIcon,
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      name: 'Teachers',
      value: stats.teachers,
      icon: Users,
      color: 'text-school-blue',
      bg: 'bg-school-blue/10',
    },
    {
      name: 'Achievements',
      value: stats.achievements,
      icon: Award,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div
              className={cn(
                'w-12 h-12 rounded-2xl flex items-center justify-center mb-4',
                card.bg,
                card.color
              )}
            >
              <card.icon size={24} />
            </div>
            <p className="text-slate-500 text-sm font-bold">{card.name}</p>
            <h3 className="text-3xl font-display text-school-blue mt-1">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-school-blue mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <ArrowUpRight size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">New announcement added</p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-school-blue p-8 rounded-[2rem] text-white">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/admin/announcements"
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 flex flex-col items-center text-center"
            >
              <Plus size={24} className="mb-2" />
              <span className="text-xs font-bold">Add News</span>
            </Link>
            <Link
              to="/admin/events"
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 flex flex-col items-center text-center"
            >
              <Plus size={24} className="mb-2" />
              <span className="text-xs font-bold">Add Event</span>
            </Link>
            <Link
              to="/admin/gallery"
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 flex flex-col items-center text-center"
            >
              <Plus size={24} className="mb-2" />
              <span className="text-xs font-bold">Add Photo</span>
            </Link>
            <Link
              to="/admin/settings"
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 flex flex-col items-center text-center"
            >
              <Settings size={24} className="mb-2" />
              <span className="text-xs font-bold">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
