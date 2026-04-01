import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter,
  MessageSquare,
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pb-24">
      {/* Header */}
      <header className="bg-school-blue py-32 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display mb-8"
          >
            Get in <span className="text-accent italic">Touch</span>
          </motion.h1>
          <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
            Have questions? We're here to help. Reach out to us via phone, email, or visit our
            campus.
          </p>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          {[
            {
              title: 'Call Us',
              info: '+91 8862025331',
              sub: 'Mon-Sat, 8am-4pm',
              icon: Phone,
              color: 'bg-primary',
            },
            {
              title: 'Email Us',
              info: 'info@creativeschool.edu.in',
              sub: 'We reply within 24h',
              icon: Mail,
              color: 'bg-secondary',
            },
            {
              title: 'Visit Us',
              info: '123 Education Lane',
              sub: 'Knowledge City, State',
              icon: MapPin,
              color: 'bg-accent',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 text-center"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${item.color} text-white flex items-center justify-center mx-auto mb-8 shadow-lg`}
              >
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-display text-school-blue mb-2">{item.title}</h3>
              <p className="text-xl font-bold text-slate-800 mb-1">{item.info}</p>
              <p className="text-slate-400 text-sm">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <MessageSquare size={24} />
              </div>
              <h2 className="text-4xl font-display text-school-blue">Send a Message</h2>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-colors"
                  placeholder="How can we help?"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">Message</label>
                <textarea
                  rows={6}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button className="w-full btn-primary !py-5 text-lg flex items-center justify-center gap-3 group">
                Send Message{' '}
                <Send
                  size={20}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </form>
          </div>

          {/* Info & Map */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-display text-school-blue mb-8">Visit Our Campus</h2>
              <div className="space-y-6">
                <div className="flex gap-6 p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-school-blue mb-2">Office Hours</h4>
                    <p className="text-slate-600">Monday - Friday: 8:00 AM - 4:00 PM</p>
                    <p className="text-slate-600">Saturday: 8:00 AM - 1:00 PM</p>
                    <p className="text-slate-600">Sunday: Closed</p>
                  </div>
                </div>

                <div className="flex gap-6 p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Facebook size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-school-blue mb-2">Follow Us</h4>
                    <p className="text-slate-600 mb-4">
                      Stay connected with our community on social media.
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-school-blue hover:bg-primary hover:text-white transition-all"
                      >
                        <Facebook size={18} />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-school-blue hover:bg-primary hover:text-white transition-all"
                      >
                        <Instagram size={18} />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-school-blue hover:bg-primary hover:text-white transition-all"
                      >
                        <Twitter size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[400px] border-8 border-white relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1234.0947589688058!2d77.32413711908393!3d19.100325207509382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce29b71105f5c5%3A0x348c44ae2838938c!2sGopalchawdi%2C%20Nanded%2C%20Maharashtra%20431603!5e1!3m2!1sen!2sin!4v1774855656042!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute inset-0 bg-school-blue/20 pointer-events-none group-hover:opacity-0 transition-opacity"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
