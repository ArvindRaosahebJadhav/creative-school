import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, GraduationCap, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Cultural', path: '/cultural' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Events', path: '/events' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Contact', path: '/contact' },
  ];

  const isAdmin = location.pathname.startsWith('/admin');
  if (isAdmin && location.pathname !== '/admin/login') return null;

  // change nav css
  const isHomePage = location.pathname === '/';

  return (
    <nav
      className={cn(
        // "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        // scrolled ? "py-4 bg-white/80 backdrop-blur-lg shadow-lg" : "py-6 bg-transparent"
        'fixed top-0 left-0 w-full z-50 transition-all duration-500',
        scrolled || !isHomePage
          ? 'py-4 bg-white/90 backdrop-blur-lg shadow-lg border-b border-slate-100'
          : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <GraduationCap size={28} />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  'font-display text-2xl leading-none transition-colors',
                  scrolled ? 'text-school-blue' : 'text-school-blue'
                )}
              >
                creative
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">
                Primary School
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-bold transition-all duration-300',
                  location.pathname === link.path
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-slate-600 hover:text-primary hover:bg-primary/5'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admissions" className="ml-4 btn-primary !py-2 !px-6 text-sm">
              Apply Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-school-blue hover:bg-primary hover:text-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-8 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'flex items-center justify-between p-4 rounded-2xl font-bold transition-all',
                    location.pathname === link.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  {link.name}
                  <ChevronRight
                    size={18}
                    className={cn(
                      'transition-transform',
                      location.pathname === link.path ? 'translate-x-0' : '-translate-x-2 opacity-0'
                    )}
                  />
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  to="/admissions"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  Enroll Your Child <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
