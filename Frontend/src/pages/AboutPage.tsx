import { motion } from 'motion/react';
import { Shield, Target, Eye, Heart, Users, Star, GraduationCap, Award } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AboutPage() {
  const values = [
    {
      title: 'Integrity',
      desc: 'We believe in being honest and having strong moral principles.',
      icon: Shield,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      title: 'Excellence',
      desc: 'We strive for the highest standards in everything we do.',
      icon: Star,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
    },
    {
      title: 'Compassion',
      desc: 'We care for one another and show kindness to all.',
      icon: Heart,
      color: 'text-red-500',
      bg: 'bg-red-50',
    },
    {
      title: 'Innovation',
      desc: 'We embrace new ideas and creative ways of learning.',
      icon: Target,
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
  ];

  return (
    <div className="pb-24">
      {/* Hero */}
      <header className="relative py-32 bg-school-blue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1523050335392-9bc567597b81?auto=format&fit=crop&q=80&w=1920"
            alt="School Building"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display mb-6"
          >
            Our <span className="text-accent italic">Story</span>
          </motion.h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Since 2010, creative school has been a second home for thousands of children, fostering
            a love for learning that lasts a lifetime.
          </p>
        </div>
      </header>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            whileHover={{ y: -10 }}
            className="card-school bg-primary/5 border-primary/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center mb-8 shadow-lg">
              <Target size={32} />
            </div>
            <h2 className="text-4xl font-display text-school-blue mb-6">Our Mission</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              To provide a nurturing, safe, and stimulating environment where children can grow
              emotionally, socially, and intellectually. We aim to inspire curiosity and a lifelong
              passion for discovery.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="card-school bg-secondary/5 border-secondary/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary text-white flex items-center justify-center mb-8 shadow-lg">
              <Eye size={32} />
            </div>
            <h2 className="text-4xl font-display text-school-blue mb-6">Our Vision</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              To be a leading primary school recognized for excellence in early childhood education,
              where every child is empowered to become a confident, compassionate, and creative
              global citizen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="bg-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto h-full min-h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt="Principal"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full lg:w-1/2 p-12 md:p-20">
              <h2 className="text-4xl font-display text-school-blue mb-8 italic">
                "Education is not the filling of a pail, but the lighting of a fire."
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Welcome to creative school Primary School. As the Principal, I am honored to lead a
                team of dedicated educators who are passionate about shaping the future of our
                children. We believe that every child has a unique spark, and our role is to provide
                the fuel that helps it shine bright.
              </p>
              <div>
                <p className="text-2xl font-display text-school-blue">Mrs. Anjali Sharma</p>
                <p className="text-primary font-bold uppercase tracking-widest text-sm">
                  Principal, creative school
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-display text-school-blue mb-6">Our Core Values</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              The pillars that support our community and guide our actions every day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 border border-slate-100"
              >
                <div
                  className={cn(
                    'w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner',
                    value.bg,
                    value.color
                  )}
                >
                  <value.icon size={40} />
                </div>
                <h3 className="text-2xl font-display text-school-blue mb-4">{value.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section-padding bg-school-blue text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-display mb-8">World-Class Infrastructure</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-12">
                Our campus is designed to be a playground for the mind. From smart classrooms to
                dedicated art studios and safe play areas, we provide the best facilities for your
                child's growth.
              </p>
              <ul className="space-y-6">
                {[
                  { title: 'Smart Classrooms', icon: GraduationCap },
                  { title: 'Modern Science Lab', icon: Award },
                  { title: 'Digital Library', icon: Users },
                  { title: 'Safe Play Area', icon: Heart },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-xl font-display">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-school-blue">
                      <item.icon size={20} />
                    </div>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600"
                className="rounded-[2rem] shadow-2xl translate-y-12"
                alt="Classroom"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=600"
                className="rounded-[2rem] shadow-2xl"
                alt="Library"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
      </section>
    </div>
  );
}
