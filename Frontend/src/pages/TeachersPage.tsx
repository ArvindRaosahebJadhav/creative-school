import { motion } from 'motion/react';
import { GraduationCap, Mail, Phone } from 'lucide-react';
import { useTeachers } from '../hooks/useApi';
import type { Teacher } from '../types';
import { cn, getMediaUrl } from '../lib/utils';

export default function TeachersPage() {
  const { data: teachers = [], loading, error } = useTeachers();

  return (
    <div className="pb-24">
      <header className="bg-school-blue py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display mb-6"
          >
            Our Dedicated Staff
          </motion.h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Meet the passionate educators who guide and inspire our students every day.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {error && (
          <div className="text-center py-12 text-red-500">
            <p>Error loading teachers: {error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-24">
            <div className="inline-block animate-spin">
              <div className="h-8 w-8 border-4 border-slate-300 border-t-school-blue rounded-full"></div>
            </div>
            <p className="mt-4 text-slate-500">Loading teachers...</p>
          </div>
        )}

        {!loading && teachers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher) => (
              <motion.div
                key={teacher.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 group"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={
                      getMediaUrl(teacher.imageUrl || teacher.image_url) ||
                      'https://images.unsplash.com/photo-1544717297-fa154da09f9b?auto=format&fit=crop&q=80&w=400'
                    }
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-school-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="flex gap-4 text-white">
                      <Mail size={20} className="hover:text-accent cursor-pointer" />
                      <Phone size={20} className="hover:text-accent cursor-pointer" />
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-school-blue mb-1">{teacher.name}</h3>
                  <p className="text-primary font-bold text-sm mb-3">{teacher.subject}</p>
                  <div className="space-y-1 text-slate-500 text-xs">
                    <p className="flex items-center justify-center gap-1">
                      <GraduationCap size={14} /> {teacher.qualification}
                    </p>
                    <p>{teacher.experience} Experience</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && teachers.length === 0 && (
          <div className="text-center py-24 text-slate-400">
            <p>No teacher information available yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
