import { motion } from 'motion/react';
import { Book, Palette, Music, Dumbbell, Microscope, Monitor } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AcademicsPage() {
  const levels = [
    {
      title: 'Foundation Stage (LKG & UKG)',
      desc: 'Focus on play-based learning, social skills, and basic literacy/numeracy.',
      subjects: ['Phonics', 'Basic Math', 'Art & Craft', 'Rhymes', 'Storytelling'],
      color: 'bg-primary',
    },
    {
      title: 'Primary Stage (1st - 3rd Standard)',
      desc: 'Building core academic skills and fostering curiosity through exploration.',
      subjects: ['English', 'Mathematics', 'EVS', 'Regional Language', 'Value Education'],
      color: 'bg-secondary',
    },
    {
      title: 'Upper Primary (4th - 5th Standard)',
      desc: 'Developing critical thinking, independent learning, and advanced concepts.',
      subjects: ['Science', 'Social Studies', 'Advanced Math', 'Computer Science', 'Grammar'],
      color: 'bg-accent',
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
            Academic Excellence
          </motion.h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            A comprehensive curriculum designed to spark curiosity and build a strong foundation for
            future success.
          </p>
        </div>
      </header>

      {/* Curriculum Levels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100"
            >
              <div className={cn('h-4', level.color)}></div>
              <div className="p-8">
                <h3 className="text-2xl font-display text-school-blue mb-4">{level.title}</h3>
                <p className="text-slate-600 text-sm mb-8 leading-relaxed">{level.desc}</p>
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">
                  Key Subjects
                </h4>
                <div className="flex flex-wrap gap-2">
                  {level.subjects.map((s, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display text-school-blue mb-4">
              Our Teaching Methodology
            </h2>
            <p className="text-slate-600">
              How we make learning fun and effective for our students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Interactive Learning',
                icon: Monitor,
                desc: 'Using smart boards and digital tools to make lessons engaging.',
              },
              {
                title: 'Hands-on Activities',
                icon: Palette,
                desc: 'Learning by doing through experiments, art, and projects.',
              },
              {
                title: 'Individual Attention',
                icon: Book,
                desc: 'Small class sizes ensure every child gets the support they need.',
              },
              {
                title: 'Holistic Development',
                icon: Dumbbell,
                desc: 'Balancing academics with sports, music, and arts.',
              },
              {
                title: 'Scientific Inquiry',
                icon: Microscope,
                desc: 'Encouraging students to ask "why" and explore the world.',
              },
              {
                title: 'Creative Expression',
                icon: Music,
                desc: 'Fostering creativity through music, dance, and drama.',
              },
            ].map((m, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/50"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                  <m.icon size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">{m.title}</h3>
                <p className="text-slate-600 text-sm">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Approach */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-school-blue rounded-[3rem] p-12 md:p-20 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display mb-8">The creative school Approach</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-school-blue font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Observation</h4>
                    <p className="text-slate-300 text-sm">
                      We carefully observe each child's learning style and interests.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Engagement</h4>
                    <p className="text-slate-300 text-sm">
                      We create lessons that actively engage students in the learning process.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Assessment</h4>
                    <p className="text-slate-300 text-sm">
                      Continuous, non-stressful assessment to track progress and provide feedback.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
                alt="Learning"
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
