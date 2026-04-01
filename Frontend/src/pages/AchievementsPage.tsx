import { motion } from 'motion/react';
import { Award, Star, Trophy } from 'lucide-react';
import { formatDate, getMediaUrl } from '../lib/utils';
import { useAchievements } from '../hooks/useApi';
import type { Achievement } from '../types';

export default function AchievementsPage() {
  const { data: achievements = [], loading, error } = useAchievements();

  return (
    <div className="pb-24">
      <header className="bg-school-blue py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display mb-6"
          >
            Student Achievements
          </motion.h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Celebrating the hard work, talent, and success of our brilliant students.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {error && (
          <div className="text-center py-12 text-red-500">
            <p>Error loading achievements: {error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-24">
            <div className="inline-block animate-spin">
              <div className="h-8 w-8 border-4 border-slate-300 border-t-school-blue rounded-full"></div>
            </div>
            <p className="mt-4 text-slate-500">Loading achievements...</p>
          </div>
        )}

        {!loading && achievements.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {achievements.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col"
              >
                <div className="aspect-video relative">
                  <img
                    src={
                      getMediaUrl(item.image_url || item.imageUrl) ||
                      'https://images.unsplash.com/photo-1523240715630-9918c13d190c?auto=format&fit=crop&q=80&w=800'
                    }
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-school-blue p-3 rounded-2xl shadow-lg">
                    <Award size={24} />
                  </div>
                </div>
                <div className="p-8 grow flex flex-col">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm mb-3">
                    <Star size={16} fill="currentColor" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <h3 className="text-2xl font-display text-school-blue mb-2">{item.title}</h3>
                  <p className="text-slate-500 font-bold text-sm mb-4">By {item.student_name}</p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-slate-100">
                    <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-xs font-bold">
                      Academic Excellence
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && achievements.length === 0 && (
          <div className="text-center py-24 text-slate-400">
            <Trophy size={48} className="mx-auto mb-4 opacity-20" />
            <p>No achievements recorded yet. Stay tuned!</p>
          </div>
        )}
      </section>
    </div>
  );
}
