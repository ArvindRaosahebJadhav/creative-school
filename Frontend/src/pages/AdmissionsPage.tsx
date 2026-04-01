import { useState } from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  FileText,
  CheckCircle,
  HelpCircle,
  Download,
  ClipboardList,
  Info,
  Users,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdmissionsPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Inquiry',
      desc: 'Fill out the online inquiry form or visit the school office.',
      icon: Info,
    },
    {
      title: 'Interaction',
      desc: 'A friendly interaction with the child and parents.',
      icon: Users,
    },
    {
      title: 'Documentation',
      desc: 'Submit the required documents and application fee.',
      icon: FileText,
    },
    {
      title: 'Confirmation',
      desc: 'Receive the admission offer and complete the formalities.',
      icon: CheckCircle,
    },
  ];

  const faqs = [
    {
      q: 'What is the age criteria for LKG?',
      a: 'The child should be 3.5 to 4.5 years old as of June 1st of the academic year.',
    },
    {
      q: 'Do you provide school transport?',
      a: 'Yes, we have a fleet of safe, GPS-enabled buses covering major parts of the city.',
    },
    {
      q: 'What are the school timings?',
      a: 'LKG & UKG: 8:30 AM to 12:30 PM. 1st to 5th Std: 8:30 AM to 3:30 PM.',
    },
    {
      q: 'Is there an entrance exam?',
      a: "For primary classes, we have a basic interaction to understand the child's readiness rather than a formal exam.",
    },
  ];

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="bg-school-blue py-32 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-display mb-8"
            >
              Join Our <span className="text-accent italic">Family</span>
            </motion.h1>
            <p className="text-xl text-white/70 leading-relaxed">
              We are excited to welcome new stars to our community. Our admission process is
              designed to be simple, transparent, and welcoming.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2"></div>
      </header>

      {/* Steps Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-display text-school-blue mb-6">Admission Process</h2>
            <p className="text-slate-500">
              Follow these simple steps to secure your child's future at Little Stars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 -z-10"></div>

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveStep(i)}
                className={cn(
                  'p-8 rounded-[2.5rem] text-center transition-all duration-500 cursor-pointer border-4',
                  activeStep === i
                    ? 'bg-white border-primary shadow-2xl shadow-primary/20 -translate-y-4'
                    : 'bg-white border-transparent shadow-xl shadow-slate-200/50 grayscale opacity-70 hover:grayscale-0 hover:opacity-100'
                )}
              >
                <div
                  className={cn(
                    'w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg transition-colors',
                    activeStep === i ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'
                  )}
                >
                  <step.icon size={36} />
                </div>
                <h3 className="text-2xl font-display text-school-blue mb-4">
                  Step {i + 1}: {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Form */}
      <section className="bg-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Requirements */}
          <div>
            <h2 className="text-4xl font-display text-school-blue mb-10">Required Documents</h2>
            <div className="space-y-4">
              {[
                'Original Birth Certificate',
                'Previous School Transfer Certificate (if applicable)',
                'Recent Passport Size Photographs (4)',
                'Aadhar Card of Student and Parents',
                'Previous Class Progress Report',
                'Address Proof (Electricity Bill/Rent Agreement)',
              ].map((doc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                    <CheckCircle size={18} />
                  </div>
                  <span className="font-bold text-slate-700">{doc}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-8 rounded-[2rem] bg-school-blue text-white shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <Download className="text-accent" />
                <h3 className="text-2xl font-display">Download Prospectus</h3>
              </div>
              <p className="text-white/60 mb-8 text-sm">
                Get detailed information about our curriculum, fees, and school policies.
              </p>
              <button className="w-full btn-primary !bg-accent !text-school-blue">
                Download PDF (5.2 MB)
              </button>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100">
            <h2 className="text-4xl font-display text-school-blue mb-8">Admission Inquiry</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">Parent's Name</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-colors"
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">Email Address</label>
                <input
                  type="email"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">Student's Name</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">
                    Grade Applying For
                  </label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option>LKG</option>
                    <option>UKG</option>
                    <option>1st Standard</option>
                    <option>2nd Standard</option>
                    <option>3rd Standard</option>
                    <option>4th Standard</option>
                    <option>5th Standard</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">Message (Optional)</label>
                <textarea
                  rows={4}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Any specific questions?"
                ></textarea>
              </div>
              <button className="w-full btn-primary !py-5 text-lg flex items-center justify-center gap-2">
                Submit Inquiry <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display text-school-blue mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500">
              Everything you need to know about the admissions process.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                  <h3 className="text-xl font-bold text-school-blue">{faq.q}</h3>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-open:rotate-180 transition-transform">
                    <ChevronDown size={20} />
                  </div>
                </summary>
                <div className="px-8 pb-8 text-slate-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
