import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { getMediaUrl } from '../lib/utils';

import {
  ArrowRight,
  Star,
  Users,
  GraduationCap,
  Award,
  Calendar,
  Bell,
  ChevronRight,
  Play,
} from 'lucide-react';
import { cn, formatDate } from '../lib/utils';
import { logger } from '../lib/logger';
import type { Announcement, Event, GalleryItem } from '../types';
import boy from '../image/boy.jpg';

export default function HomePage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${API_URL}/announcements`)
      .then((res) => res.json())
      .then((data) => setAnnouncements(data.slice(0, 3)))
      .catch((err) => logger.error('Error loading announcements:', err));
    fetch(`${API_URL}/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data.slice(0, 2)))
      .catch((err) => logger.error('Error loading events:', err));
    fetch(`${API_URL}/gallery`)
      .then((res) => res.json())
      .then((data) => setGallery(data.filter((i: any) => i.type === 'photo').slice(0, 4)))
      .catch((err) => logger.error('Error loading gallery:', err));
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-primary/10"></div>
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1920"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
              <Star size={16} fill="currentColor" />
              <span>Admissions Open for 2026-27</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display text-school-blue leading-[0.9] mb-8">
              Where Every <span className="text-primary italic">Child</span> is a{' '}
              <span className="text-secondary underline decoration-accent underline-offset-8">
                Star
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              creative school Primary School provides a nurturing environment where children from
              LKG to 5th Standard discover their potential through play, creativity, and excellence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/admissions" className="btn-primary flex items-center gap-2 group">
                Apply Now{' '}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="btn-outline">
                Explore Our School
              </Link>
            </div>

            {/* <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                    alt="Student"
                  />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-school-blue">500+ Happy Students</p>
                <p className="text-slate-500">Joined our community last year</p>
              </div>
            </div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src={boy}
                alt="Students"
                className="w-full aspect-[4/5] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-school-blue/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-school-blue">
                    <Play fill="currentColor" size={20} />
                  </div>
                  <p className="font-bold">Watch Our Story</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary rounded-3xl -z-10 animate-float"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent rounded-full -z-10 opacity-50 blur-2xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-school-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Years of Excellence', value: '15+', icon: Award },
              { label: 'Qualified Teachers', value: '40+', icon: Users },
              { label: 'Student Ratio', value: '20:1', icon: GraduationCap },
              { label: 'Activities', value: '25+', icon: Star },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <stat.icon size={32} className="mx-auto mb-4 text-accent" />
                <h3 className="text-4xl font-display mb-2">{stat.value}</h3>
                <p className="text-white/60 text-sm font-bold uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl font-display text-school-blue mb-6">Why Parents Choose Us?</h2>
            <p className="text-slate-600">
              We provide a balanced approach to education that combines academic rigor with creative
              exploration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Holistic Curriculum',
                desc: 'Our curriculum is designed to nurture cognitive, social, and emotional growth.',
                icon: GraduationCap,
                color: 'bg-primary',
              },
              {
                title: 'Creative Arts',
                desc: 'From music to painting, we encourage students to express themselves artistically.',
                icon: Play,
                color: 'bg-secondary',
              },
              {
                title: 'Safe Environment',
                desc: 'A secure campus with 24/7 monitoring and caring staff for your peace of mind.',
                icon: Award,
                color: 'bg-accent',
              },
            ].map((feature, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="card-school">
                <div
                  className={cn(
                    'w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg',
                    feature.color
                  )}
                >
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-display text-school-blue mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Events Split */}
      <section className="bg-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Announcements */}
          <div>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-display text-school-blue flex items-center gap-3">
                <Bell className="text-primary" /> Latest News
              </h2>
              <Link to="/events" className="text-primary font-bold text-sm hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-6">
              {announcements.map((news) => (
                <motion.div
                  key={news.id}
                  whileHover={{ x: 10 }}
                  className="p-6 rounded-3xl bg-white shadow-sm border border-slate-200 transition-all"
                >
                  <span className="text-xs font-bold text-slate-400 uppercase">
                    {formatDate(news.date)}
                  </span>
                  <h4 className="text-xl font-bold mt-2 text-school-blue">{news.title}</h4>
                  <p className="text-slate-600 text-sm mt-2 line-clamp-2">{news.content}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-display text-school-blue flex items-center gap-3">
                <Calendar className="text-secondary" /> Upcoming Events
              </h2>
              <Link to="/events" className="text-secondary font-bold text-sm hover:underline">
                Full Calendar
              </Link>
            </div>
            <div className="space-y-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex gap-6 items-center p-6 rounded-3xl bg-white shadow-sm border border-slate-200 group cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex flex-col items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                    <span className="text-xs font-bold uppercase">
                      {new Date(event.date).toLocaleString('default', {
                        month: 'short',
                      })}
                    </span>
                    <span className="text-2xl font-display">{new Date(event.date).getDate()}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-school-blue">{event.title}</h4>
                    <p className="text-slate-500 text-sm mt-1">{event.location}</p>
                  </div>
                  <ChevronRight className="ml-auto text-slate-300 group-hover:text-secondary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-5xl font-display text-school-blue mb-6">
                Life at creative school
              </h2>
              <p className="text-slate-600">
                Take a peek into the daily lives and special moments of our students.
              </p>
            </div>
            <Link to="/gallery" className="btn-outline flex items-center gap-2">
              View Full Gallery <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((item, i) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                className="aspect-square rounded-[2rem] overflow-hidden shadow-xl"
              >
                <img
                  // src={item.url}
                  src={getMediaUrl(item.url)}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-display mb-8">
                Ready to Start the Journey?
              </h2>
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                Admissions are currently open for the academic year 2026-27. Secure your child's
                spot today!
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/admissions"
                  className="px-12 py-5 bg-white text-primary rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl"
                >
                  Enroll Now
                </Link>
                <Link
                  to="/contact"
                  className="px-12 py-5 bg-school-blue text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
