import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Music, Palette, Users, Trophy, Play } from 'lucide-react';
import { cn, getMediaUrl, extractYouTubeId } from '../lib/utils';
import type { GalleryItem } from '../types';
import { logger } from '../lib/logger';

export default function CulturalPage() {
  const [media, setMedia] = useState<GalleryItem[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${API_URL}/gallery`)
      .then((res) => res.json())
      .then(setMedia)
      .catch((err) => logger.error('Error loading gallery:', err));
  }, []);

  const activities = [
    {
      title: 'Annual Day',
      icon: Music,
      desc: 'A grand celebration of talent where every child performs on stage.',
      color: 'bg-primary',
    },
    {
      title: 'Sports Meet',
      icon: Trophy,
      desc: 'Fostering team spirit and physical fitness through friendly competition.',
      color: 'bg-secondary',
    },
    {
      title: 'Art & Craft',
      icon: Palette,
      desc: 'Unleashing creativity through painting, clay modeling, and crafts.',
      color: 'bg-accent',
    },
    {
      title: 'Festivals',
      icon: Users,
      desc: 'Celebrating the diverse cultural heritage of our country.',
      color: 'bg-school-blue',
    },
  ];

  return (
    <div className="pb-24">
      <header className="bg-school-blue py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display mb-6"
          >
            Cultural Activities
          </motion.h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Nurturing creativity and confidence through a vibrant range of extra-curricular
            activities.
          </p>
        </div>
      </header>

      {/* Activities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((act, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 text-center"
            >
              <div
                className={cn(
                  'w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-6',
                  act.color
                )}
              >
                <act.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{act.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{act.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Showcase Section */}
      <section className="bg-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display text-school-blue mb-4">Event Highlights</h2>
            <p className="text-slate-600">Glimpses of our recent celebrations and performances.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {media
              .filter((m) => m.type === 'photo')
              .slice(0, 6)
              .map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-3xl overflow-hidden aspect-video shadow-lg"
                >
                  <img
                    src={getMediaUrl(item.url)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                    <p className="text-white font-bold">{item.title}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display text-school-blue mb-4">Watch Our Performances</h2>
          <p className="text-slate-600">
            Experience the energy and talent of our students in action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {media
            .filter((m) => m.type === 'video')
            .slice(0, 2)
            .map((video) => {
              const id = extractYouTubeId(video.url);
              const thumb = id
                ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
                : getMediaUrl(video.url || '');
              return (
                <div
                  key={video.id}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100"
                >
                  <div
                    className="aspect-video bg-slate-200 relative group cursor-pointer"
                    onClick={() => id && setActiveVideo(id)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play fill="currentColor" />
                      </div>
                    </div>
                    {id ? (
                      <img
                        src={thumb}
                        alt={video.title}
                        className="w-full h-full object-cover opacity-80"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        No preview
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg">{video.title}</h3>
                    <p className="text-slate-500 text-sm mt-1">{video.category}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
            onClick={() => setActiveVideo(null)}
          >
            Close
          </button>
          <div
            className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              className="w-full h-full"
              allowFullScreen
              title="Performance Video"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
