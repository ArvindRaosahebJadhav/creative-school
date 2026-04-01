import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Bell,
  Calendar,
  ImageIcon,
  Users,
  Award,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit,
} from 'lucide-react';
import { cn } from '../../lib/utils';

// Admin Sub-pages
import AdminOverview from './AdminOverview';
import AdminAnnouncements from './AdminAnnouncements';
import AdminEvents from './AdminEvents';
import AdminGallery from './AdminGallery';
import AdminTeachers from './AdminTeachers';
import AdminAchievements from './AdminAchievements';
import AdminSettings from './AdminSettings';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Announcements', path: '/admin/announcements', icon: Bell },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Teachers', path: '/admin/teachers', icon: Users },
    { name: 'Achievements', path: '/admin/achievements', icon: Award },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'bg-school-blue text-white transition-all duration-300 flex flex-col',
          isSidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-display text-xl shrink-0">
            L
          </div>
          {isSidebarOpen && <span className="font-display text-xl truncate">Admin Panel</span>}
        </div>

        <nav className="grow p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-4 px-4 py-3 rounded-xl transition-all',
                location.pathname === item.path
                  ? 'bg-white/10 text-accent'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              )}
            >
              <item.icon size={22} />
              {isSidebarOpen && <span className="font-bold text-sm">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut size={22} />
            {isSidebarOpen && <span className="font-bold text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="grow flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xl font-bold text-school-blue">
            {navItems.find((i) => i.path === location.pathname)?.name || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">School Admin</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold">
              A
            </div>
          </div>
        </header>

        <div className="grow overflow-y-auto p-8">
          <Routes>
            <Route path="dashboard" element={<AdminOverview />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="teachers" element={<AdminTeachers />} />
            <Route path="achievements" element={<AdminAchievements />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
