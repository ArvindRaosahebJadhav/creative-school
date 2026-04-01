import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Heart,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-school-blue text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                <GraduationCap size={28} />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl leading-none">creative </span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">
                  Primary School
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Nurturing young minds with love, care, and excellence since 2010. Our mission is to
              provide a holistic learning environment for every child.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">
                  About Our School
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-accent transition-colors">
                  Curriculum
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-accent transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-accent transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-accent transition-colors">
                  Admission Process
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-8">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary shrink-0" />
                <span>123 Education Lane, Knowledge City, State 560001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary shrink-0" />
                <span>info@littlestars.edu.in</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-8">Newsletter</h4>
            <p className="text-sm text-white/60 mb-6">
              Subscribe to get the latest news and updates from our school.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-primary transition-colors text-sm"
              />
              <button className="w-full btn-primary !py-3 !text-sm">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {currentYear} creative Primary School. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/admin/login" className="hover:text-white transition-colors">
              Admin Portal
            </Link>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-primary fill-primary" /> for kids
          </p>
        </div>
      </div>
    </footer>
  );
}
