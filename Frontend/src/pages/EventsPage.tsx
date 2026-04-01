import { motion } from 'motion/react';
import { Calendar, MapPin, Bell, ChevronRight } from 'lucide-react';
import { formatDate, getMediaUrl } from '../lib/utils';
import { useEvents, useAnnouncements } from '../hooks/useApi';
import type { Announcement, Event } from '../types';

export default function EventsPage() {
  const {
    data: announcements = [],
    loading: announcementsLoading,
    error: announcementsError,
  } = useAnnouncements();
  const { data: events = [], loading: eventsLoading, error: eventsError } = useEvents();

  return (
    <div className="pb-24">
      <header className="bg-school-blue py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display mb-6"
          >
            News & Events
          </motion.h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Stay updated with the latest happenings and upcoming activities at creative school.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {(announcementsError || eventsError) && (
          <div className="text-center py-12 text-red-500">
            <p>Error loading content: {announcementsError || eventsError}</p>
          </div>
        )}

        {(announcementsLoading || eventsLoading) && (
          <div className="text-center py-24">
            <div className="inline-block animate-spin">
              <div className="h-8 w-8 border-4 border-slate-300 border-t-school-blue rounded-full"></div>
            </div>
            <p className="mt-4 text-slate-500">Loading events and announcements...</p>
          </div>
        )}

        {!announcementsLoading && !eventsLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Announcements Column */}
            <div className="lg:col-span-1 space-y-8">
              <h2 className="text-3xl font-display text-school-blue flex items-center gap-3">
                <Bell className="text-primary" /> Announcements
              </h2>
              <div className="space-y-6">
                {announcements.map((news) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {formatDate(news.date)}
                    </span>
                    <h4 className="text-lg font-bold mt-2 mb-3 text-school-blue">{news.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{news.content}</p>
                  </motion.div>
                ))}
                {announcements.length === 0 && (
                  <p className="text-slate-400 italic">No recent announcements.</p>
                )}
              </div>
            </div>

            {/* Events Column */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-3xl font-display text-school-blue flex items-center gap-3">
                <Calendar className="text-secondary" /> Upcoming Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 group"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={
                          getMediaUrl(event.imageUrl || event.image_url) ||
                          'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'
                        }
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl text-center shadow-lg">
                        <p className="text-xs font-bold text-slate-400 uppercase">
                          {new Date(event.date).toLocaleString('default', { month: 'short' })}
                        </p>
                        <p className="text-2xl font-display text-school-blue">
                          {new Date(event.date).getDate()}
                        </p>
                      </div>
                    </div>
                    <div className="p-8">
                      <h4 className="text-xl font-bold mb-4 text-school-blue">{event.title}</h4>
                      <div className="space-y-3 text-slate-500 text-sm mb-6">
                        <p className="flex items-center gap-2">
                          <Calendar size={16} className="text-secondary" /> {formatDate(event.date)}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin size={16} className="text-secondary" /> {event.location}
                        </p>
                      </div>
                      <p className="text-slate-600 text-sm line-clamp-3 mb-6">
                        {event.description}
                      </p>
                      <button className="text-secondary font-bold flex items-center gap-1 hover:gap-2 transition-all">
                        Learn More <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
                {events.length === 0 && (
                  <p className="text-slate-400 italic">No upcoming events scheduled.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
