import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Video as VideoIcon, X } from 'lucide-react';
import type { GalleryItem } from '../types';
import { logger } from '../lib/logger';

export default function VideoGalleryPage() {
  const [videos, setVideos] = useState<GalleryItem[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${API_URL}/gallery`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.filter((i: any) => i.type === 'video'));
      })
      .catch((err) => logger.error('Error loading videos:', err));
  }, []);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="pb-24">
      <header className="bg-school-blue py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display mb-6"
          >
            Video Gallery
          </motion.h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Relive the excitement of our school events and performances through video.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => {
            const videoId = getYoutubeId(video.url);
            return (
              <motion.div
                key={video.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100"
              >
                <div
                  className="aspect-video bg-slate-200 relative group cursor-pointer"
                  onClick={() => setActiveVideo(video.url)}
                >
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play fill="currentColor" />
                    </div>
                  </div>
                  {videoId && (
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg">{video.title}</h3>
                  <p className="text-slate-500 text-sm mt-1 capitalize">{video.category}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {videos.length === 0 && (
          <div className="text-center py-24 text-slate-400">
            <VideoIcon size={48} className="mx-auto mb-4 opacity-20" />
            <p>No videos found.</p>
          </div>
        )}
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-primary transition-colors">
            <X size={32} />
          </button>
          <div
            className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={activeVideo.replace('watch?v=', 'embed/')}
              className="w-full h-full"
              allowFullScreen
              title="Video Player"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
