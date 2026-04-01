import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageIcon, X } from 'lucide-react';
import { cn, getMediaUrl } from '../lib/utils';
import { useGallery } from '../hooks/useApi';
import type { GalleryItem } from '../types';

export default function GalleryPage() {
  const { data: gallery = [], loading, error } = useGallery();
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'events', 'activities', 'classrooms', 'celebrations'];
  const filteredGallery =
    filter === 'all' ? gallery : gallery.filter((item) => item.category === filter);

  return (
    <div className="pb-24">
      <header className="bg-school-blue py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display mb-6"
          >
            Photo Gallery
          </motion.h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            A visual journey through the wonderful moments at creative school.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="text-center py-12 text-red-500">
            <p>Error loading gallery: {error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-24">
            <div className="inline-block animate-spin">
              <div className="h-8 w-8 border-4 border-slate-300 border-t-school-blue rounded-full"></div>
            </div>
            <p className="mt-4 text-slate-500">Loading gallery...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    'px-6 py-2 rounded-full font-bold text-sm capitalize transition-all',
                    filter === cat
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-primary'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredGallery
                .filter((i) => i.type === 'photo')
                .map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedImage(item)}
                    className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md"
                  >
                    <img
                      src={getMediaUrl(item.url)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white text-sm font-bold">{item.title}</p>
                    </div>
                  </motion.div>
                ))}
            </div>

            {filteredGallery.length === 0 && (
              <div className="text-center py-24 text-slate-400">
                <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                <p>No photos found in this category.</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-12"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-primary transition-colors">
            <X size={32} />
          </button>
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={getMediaUrl(selectedImage.url)}
            alt={selectedImage.title}
            className="max-w-full max-h-full rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-6 left-0 w-full text-center text-white">
            <p className="text-xl font-display">{selectedImage.title}</p>
            <p className="text-sm text-slate-400 capitalize">{selectedImage.category}</p>
          </div>
        </div>
      )}
    </div>
  );
}
