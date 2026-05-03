/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Users, 
  Award, 
  Search, 
  Briefcase, 
  Star, 
  CheckCircle2, 
  ChevronDown, 
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatBot } from './components/ChatBot';

// --- Data & Constants ---

const COURSES = [
  { title: "Advanced Data Science with Gen AI", image: "https://images.unsplash.com/photo-1551288049-bbbda546287e?auto=format&fit=crop&q=80&w=800" },
  { title: "Machine Learning & Deep Learning", image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=800" },
  { title: "Data Engineering with Gen AI", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800" },
  { title: "Big Data & Business Intelligence", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
  { title: "AI Strategy for Business", image: "https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?auto=format&fit=crop&q=80&w=800" },
  { title: "Full Stack Data Science", image: "https://images.unsplash.com/photo-1504868584819-f8e905263543?auto=format&fit=crop&q=80&w=800" },
];

const ALUMNI_LOGOS = [
  { name: "Google", url: "https://logo.clearbit.com/google.com" },
  { name: "Microsoft", url: "https://logo.clearbit.com/microsoft.com" },
  { name: "Amazon", url: "https://logo.clearbit.com/amazon.com" },
  { name: "Netflix", url: "https://logo.clearbit.com/netflix.com" },
  { name: "TCS", url: "https://logo.clearbit.com/tcs.com" }
];

const TRAINERS = [
  { name: "Mayur Singh", role: "Sr. Trainer Consultant", ex: "13 years", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300" },
  { name: "Himat Saho", role: "Sr. Trainer Consultant", ex: "8 years", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300" },
  { name: "James Singh", role: "Sr. Trainer Consultant", ex: "9 years", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300" }
];

const CANDIDATES = [
  { name: "Divya Bisht", role: "Data Scientist", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" },
  { name: "Sam Rawat", role: "ML Engineer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
  { name: "Nikita Negi", role: "Data Analyst", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" },
  { name: "Aryan Bisht", role: "AI Developer", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200" },
  { name: "Neha Sharma", role: "Data Science Associate", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" },
  { name: "Rohan Gupta", role: "Full Stack Developer", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200" }
];

// --- Components ---

const ImgWithFallback = ({ src, alt, className, fallbackText }: { src: string, alt: string, className?: string, fallbackText: string }) => {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className="flex items-center justify-center">
      {!error ? (
        <img 
          src={imgSrc} 
          alt={alt} 
          referrerPolicy="no-referrer"
          className={className}
          onError={() => {
            if (imgSrc.includes('clearbit')) {
               setImgSrc("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/512px-Tata_Consultancy_Services_Logo.svg.png");
            } else {
               setError(true);
            }
          }}
        />
      ) : (
        <span className="text-xl font-black text-slate-400 tracking-tighter uppercase">{fallbackText}</span>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-indigo-900 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
              <span className="text-white font-black text-2xl -rotate-3">B</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-indigo-950 tracking-tight leading-none">BRILLICA</h1>
              <p className="text-[10px] tracking-[0.25em] text-indigo-600 font-bold uppercase mt-1">Services</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#placements" className="text-gray-600 hover:text-indigo-900 font-semibold transition-colors text-sm">Our Placements</a>
            <a href="#blogs" className="text-gray-600 hover:text-indigo-900 font-semibold transition-colors text-sm">Blogs</a>
            <a href="#about" className="text-gray-600 hover:text-indigo-900 font-semibold transition-colors text-sm">About us</a>
            <a href="#contact" className="text-gray-600 hover:text-indigo-900 font-semibold transition-colors text-sm">Contact Us</a>
            <a href="#courses" className="bg-indigo-900 text-white px-8 py-3 rounded-lg hover:bg-indigo-800 transition-all font-bold text-sm shadow-lg shadow-indigo-900/20 active:scale-95 inline-block">
              COURSES
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-indigo-900 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-2xl absolute w-full"
          >
        <div className="px-6 py-8 space-y-4">
          <a href="#placements" onClick={() => setIsOpen(false)} className="block py-4 text-lg font-bold text-gray-800 border-b border-gray-50">Our Placements</a>
          <a href="#blogs" onClick={() => setIsOpen(false)} className="block py-4 text-lg font-bold text-gray-800 border-b border-gray-50">Blogs</a>
          <a href="#about" onClick={() => setIsOpen(false)} className="block py-4 text-lg font-bold text-gray-800 border-b border-gray-50">About us</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="block py-4 text-lg font-bold text-gray-800 border-b border-gray-50">Contact Us</a>
          <div className="pt-4">
            <a href="#courses" onClick={() => setIsOpen(false)} className="block w-full bg-indigo-900 text-white px-6 py-4 rounded-xl font-bold text-center text-lg">
              EXPLORE COURSES
            </a>
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const CourseCard = ({ title, image }: { title: string, image: string }) => {
  const [imgSrc, setImgSrc] = React.useState(image);
  
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-indigo-900/5 border border-indigo-50 group flex flex-col"
    >
      <div className="h-56 overflow-hidden relative">
        <img 
          src={imgSrc} 
          alt={title} 
          referrerPolicy="no-referrer"
          onError={() => setImgSrc("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800")}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 to-transparent" />
      </div>
    <div className="p-7 flex flex-col flex-1">
      <h3 className="font-bold text-indigo-950 text-xl mb-4 leading-tight group-hover:text-indigo-600 transition-colors uppercase">{title}</h3>
      <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 mt-auto font-semibold">
        <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full"><Clock size={16} className="text-indigo-600" /> 12 Months</span>
        <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full"><Users size={16} className="text-indigo-600" /> Online</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-emerald-500 text-white text-[10px] font-black py-4 px-2 rounded-xl transition-all hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 uppercase tracking-widest">
          VIEW PROGRAM
        </button>
        <button className="bg-indigo-950 text-white text-[10px] font-black py-4 px-2 rounded-xl transition-all hover:bg-indigo-900 shadow-lg shadow-indigo-950/20 uppercase tracking-widest">
          VIEW PROGRAM
        </button>
      </div>
    </div>
  </motion.div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-indigo-50 shadow-sm overflow-hidden mb-4">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left group">
        <span className={`font-bold text-lg transition-colors ${isOpen ? 'text-indigo-600' : 'text-indigo-950 hover:text-indigo-700'}`}>{question}</span>
        <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-indigo-600 text-white rotate-180' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 text-gray-600 leading-relaxed font-medium">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [currentTrainer, setCurrentTrainer] = useState(0);
  const [currentCandidate, setCurrentCandidate] = useState(0);

  const nextTrainer = () => setCurrentTrainer((prev) => (prev + 1) % TRAINERS.length);
  const prevTrainer = () => setCurrentTrainer((prev) => (prev - 1 + TRAINERS.length) % TRAINERS.length);

  const nextCandidate = () => setCurrentCandidate((prev) => (prev + 1) % Math.max(1, CANDIDATES.length - 3));
  const prevCandidate = () => setCurrentCandidate((prev) => (prev - 1 + Math.max(1, CANDIDATES.length - 3)) % Math.max(1, CANDIDATES.length - 3));

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans text-slate-900">
      
      {/* Top Banner */}
      <div className="bg-indigo-950 py-3 text-center px-4">
        <p className="text-indigo-100 text-sm font-black tracking-tight">
          Don't Miss This Opportunity: <a href="#" className="underline ml-1 hover:text-white transition-colors">Book Your Free Career Assessment Talk to our Expert</a>
        </p>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)' }}>
        <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-bold mb-8 uppercase tracking-widest backdrop-blur-sm border border-indigo-400/20">
                Learn Technologies Employers Can't Ignore
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-10 leading-[1.05] tracking-tight">
                Future-Proof <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-indigo-100 italic">Your Career</span> <br/>
                <span className="text-indigo-400">with In-Demand</span> <br/>
                IT Skills
              </h1>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-500 text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl transition-all flex items-center gap-4 hover:bg-emerald-600 group"
              >
                Talk To Expert <ChevronRight size={24} className="stroke-[3px] group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative lg:block"
            >
              <div className="relative rounded-[40px] overflow-hidden border-[12px] border-white/5 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Students learning" 
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 to-transparent" />
              </div>
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-md p-6 rounded-[32px] shadow-2xl border border-indigo-50 z-20 flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Career Success</p>
                  <p className="text-lg font-black text-indigo-950">98% Placed</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alumni Logos Section */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-indigo-950 leading-tight">
              Our <span className="text-indigo-600">Alumni</span> are making their Mark at Top Companies
            </h2>
            <div className="w-24 h-1.5 bg-indigo-600 mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-x-20 opacity-60">
            {ALUMNI_LOGOS.map((logo, idx) => (
              <ImgWithFallback 
                key={idx} 
                src={logo.url} 
                alt={logo.name} 
                fallbackText={logo.name}
                className="h-8 md:h-10 object-contain grayscale hover:grayscale-0 transition-all cursor-pointer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-indigo-950 uppercase tracking-tight mb-4">Our Courses</h2>
            <div className="w-24 h-2 bg-indigo-600 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {COURSES.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <CourseCard title={course.title} image={course.image} />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 flex justify-center">
            <motion.div 
              whileHover={{ y: 5 }}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl text-indigo-600 cursor-pointer border border-indigo-50 hover:bg-indigo-50 transition-all"
            >
              <ChevronDown size={32} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Section */}
      <section id="blogs" className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
           <div className="text-center mb-24">
            <h2 className="text-5xl font-black text-indigo-950 leading-tight">
              Here's how we ensure you're <br className="hidden md:block" /> <span className="text-indigo-600 italic">ready to succeed</span>
            </h2>
            <div className="w-24 h-2 bg-indigo-950 mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-16 relative text-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-3xl bg-indigo-950 flex items-center justify-center text-white mb-10 shadow-2xl">
                <Users size={40} />
              </div>
              <h3 className="text-2xl font-black text-indigo-950 mb-6 uppercase tracking-tighter">Personal Development Programs</h3>
              <p className="text-slate-500 font-bold leading-relaxed">Our Personal Development Program (PDP) and mentorship sessions help you build technical and soft skills to succeed in competitive job markets.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-3xl bg-indigo-950 flex items-center justify-center text-white mb-10 shadow-2xl">
                <Briefcase size={40} />
              </div>
              <h3 className="text-2xl font-black text-indigo-950 mb-6 uppercase tracking-tighter">Interview Training and Placement Support</h3>
              <p className="text-slate-500 font-bold leading-relaxed">Our services include mock interviews, feedback sessions, and connections with placement partners to connect you with opportunities.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-3xl bg-indigo-950 flex items-center justify-center text-white mb-10 shadow-2xl">
                <GraduationCap size={40} />
              </div>
              <h3 className="text-2xl font-black text-indigo-950 mb-6 uppercase tracking-tighter">Real World Projects and Job Opportunities</h3>
              <p className="text-slate-500 font-bold leading-relaxed">Our programs include real-world projects to build your portfolio and prepare you for industry-ready job opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section id="about" className="py-24 bg-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-indigo-950">Your Success, Our Commitment</h2>
            <div className="w-24 h-1.5 bg-indigo-600 mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1E1B4B] p-10 rounded-[32px] text-white">
              <div className="w-14 h-14 bg-indigo-400 rounded-2xl flex items-center justify-center mb-10">
                <Search size={28} />
              </div>
              <h3 className="text-2xl font-black mb-6">Personalized Career Guidance</h3>
              <p className="text-indigo-200 font-medium leading-relaxed">Receive customized advice on crafting your resume, building a strong LinkedIn profile, and highlighting skills to stand out to employers.</p>
            </div>
            <div className="bg-[#1E1B4B] p-10 rounded-[32px] text-white">
              <div className="w-14 h-14 bg-indigo-400 rounded-2xl flex items-center justify-center mb-10">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-2xl font-black mb-6">Mock Interviews and Skill Assessments</h3>
              <p className="text-indigo-200 font-medium leading-relaxed">Gain confidence through practice interviews and assessments designed to prepare you for real-world scenarios and role-specific expectations.</p>
            </div>
            <div className="bg-[#1E1B4B] p-10 rounded-[32px] text-white">
              <div className="w-14 h-14 bg-indigo-400 rounded-2xl flex items-center justify-center mb-10">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-black mb-6">Strong Industry Connections</h3>
              <p className="text-indigo-200 font-medium leading-relaxed">Leverage our network with top companies and recruiters, opening doors to exclusive job opportunities that match your skillset.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-indigo-950 uppercase tracking-tight">Our Industry Expert Trainers</h2>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="relative px-12 md:px-0">
            <div className="grid md:grid-cols-3 gap-8 relative overflow-hidden">
             {TRAINERS.map((trainer, idx) => (
               <motion.div 
                 key={idx} 
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ 
                   opacity: 1, 
                   x: 0,
                   display: idx === currentTrainer || (window.innerWidth >= 768) ? 'block' : 'none'
                 }}
                 transition={{ delay: idx * 0.1 }}
                 className="bg-white rounded-3xl p-10 text-center border border-indigo-50 shadow-xl shadow-indigo-900/5 relative hover:border-indigo-200 transition-colors group"
               >
                 <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-indigo-50 group-hover:ring-indigo-100 transition-all">
                   <img src={trainer.img} alt={trainer.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                 </div>
                 <h4 className="text-xl font-black text-indigo-950 mb-1">{trainer.name}</h4>
                 <p className="text-slate-400 font-bold text-sm mb-1">{trainer.role}</p>
                 <p className="text-indigo-600 font-black text-lg mb-4">Ex: {trainer.ex}</p>
                 <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="text-indigo-600" size={24} />
                 </div>
               </motion.div>
             ))}
            </div>
             
             <button 
               onClick={prevTrainer}
               className="absolute top-1/2 -left-4 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-md border border-indigo-50 cursor-pointer hover:bg-slate-50 transition-colors z-10 md:hidden"
             >
               <ChevronLeft />
             </button>
             <button 
               onClick={nextTrainer}
               className="absolute top-1/2 -right-4 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-md border border-indigo-50 cursor-pointer hover:bg-slate-50 transition-colors z-10 md:hidden"
             >
               <ChevronRight />
             </button>
          </div>
          <div className="flex justify-center gap-2 mt-12">
            {TRAINERS.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentTrainer(i)}
                className={`w-3 h-3 rounded-full transition-all ${i === currentTrainer ? 'bg-green-500 w-8' : 'bg-slate-200'}`} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Candidates Section */}
      <section id="placements" className="py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-indigo-950 uppercase tracking-tight">Our Candidates at Top Tech Companies</h2>
            <div className="w-24 h-1.5 bg-indigo-600 mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="relative overflow-hidden">
            <motion.div 
              className="flex gap-8 transition-all duration-500"
              animate={{ x: `calc(-${currentCandidate * 25}% - ${currentCandidate * 2}rem)` }}
              style={{ width: '150%' }} // Expanded for sliding items
            >
               {CANDIDATES.map((cand, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white rounded-3xl p-8 border border-white shadow-xl shadow-indigo-900/5 hover:shadow-2xl hover:shadow-indigo-900/10 transition-all group min-w-[280px] lg:min-w-[0] lg:flex-1"
                 >
                   <div className="flex gap-4 items-center mb-6">
                     <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100">
                       <img src={cand.img} alt={cand.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                     </div>
                     <div>
                       <h4 className="font-black text-indigo-950">{cand.name}</h4>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cand.role}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Placed at</span>
                    <ImgWithFallback 
                      src="https://logo.clearbit.com/tcs.com" 
                      alt="TCS" 
                      fallbackText="TCS"
                      className="h-6 object-contain grayscale hover:grayscale-0 transition-all cursor-pointer" 
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <button 
              onClick={prevCandidate}
              className="absolute top-1/2 left-0 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-lg border border-indigo-50 z-10 hover:bg-indigo-50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextCandidate}
              className="absolute top-1/2 right-0 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-lg border border-indigo-50 z-10 hover:bg-indigo-50 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: Math.max(1, CANDIDATES.length - 3) }).map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentCandidate(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentCandidate ? 'bg-indigo-600 w-6' : 'bg-slate-200'}`} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ratings Cards */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-black text-indigo-950 tracking-tighter mb-16 uppercase">Trusted By Learners</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {['google.com', 'microsoft.com', 'amazon.com', 'tcs.com'].map((domain, i) => (
              <div key={i} className="bg-white rounded-[32px] p-10 border border-indigo-50 shadow-xl shadow-indigo-900/5 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                <ImgWithFallback 
                  src={`https://logo.clearbit.com/${domain}`} 
                  alt="Partner" 
                  fallbackText={domain.split('.')[0]}
                  className="h-10 mb-8" 
                />
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-black text-indigo-950 tracking-tighter">{4.5 + (i * 0.1)}</span>
                  <Star className="text-amber-400 fill-amber-400" size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Associations - Blue Banner with updated logos */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F172A] rounded-[60px] p-16 flex flex-wrap justify-between items-center gap-12 shadow-2xl relative overflow-hidden text-white">
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
             
             <div className="flex items-center gap-6 group">
               <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-black text-indigo-400">M</div>
               <div className="flex flex-col">
                 <span className="font-black text-xl tracking-tight leading-none">Microsoft</span>
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Partner Network</span>
               </div>
             </div>
             
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group hover:bg-emerald-500/10 transition-colors">
                  <Award size={32} className="text-indigo-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-lg tracking-tight leading-none uppercase">Pearson VUE</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Authorized Center</span>
                </div>
             </div>

             <div className="flex items-center gap-6 bg-white/5 p-8 rounded-[32px] border border-white/5 backdrop-blur-sm">
               <span className="text-5xl font-black italic tracking-tighter text-indigo-400 drop-shadow-lg">IABAC</span>
               <div className="h-16 w-px bg-white/10" />
               <div className="flex flex-col">
                 <p className="text-[10px] font-black uppercase leading-tight max-w-[150px] opacity-40">International Association of Business Analytics Certification</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 text-indigo-950">
            <h2 className="text-5xl font-black tracking-tight mb-6 uppercase">Frequently Asked Questions</h2>
            <div className="w-24 h-2 bg-indigo-600 mx-auto rounded-full" />
          </div>
          <div className="space-y-2">
            <FAQItem question="What types of courses does Brillica Services offer?" answer="Brillica Services provides a wide range of IT and professional courses, including Data Science with Gen AI, Data Analytics with Gen AI, Power BI, Advanced Excel, Machine Learning, Python, Artificial Intelligence, AI Course, Cloud Computing, and many more industry-standard programs." />
            <FAQItem question="Are courses available online or offline?" answer="We offer both online and offline learning options to accommodate different schedules and preferences. Our interactive online sessions provide the same quality of learning as our in-person training center." />
            <FAQItem question="Who is eligible to enroll in Brillica Services courses?" answer="Eligibility varies by course, but generally, our programs are designed for students, fresh graduates, and working professionals looking to upskill or transition into the IT sector. We offer beginner-to-advanced tracks." />
          </div>
          <div className="mt-16 flex justify-center">
            <button className="bg-indigo-950 text-white px-16 py-6 rounded-2xl font-black tracking-widest hover:bg-indigo-800 transition-all shadow-xl uppercase text-sm">
              View More
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section - with full contact blocks */}
      <footer id="contact" className="bg-white border-t border-slate-100 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
            <div className="max-w-xs">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-900/20">B</div>
                <h2 className="text-4xl font-black text-emerald-500 tracking-tighter">BrillicaEdu</h2>
              </div>
              <p className="text-slate-400 font-bold text-lg mb-8">Empowering professionals with industry-ready IT skills.</p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Linkedin, Youtube].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-12 h-12 bg-indigo-50 text-indigo-900 rounded-2xl flex items-center justify-center hover:bg-indigo-900 hover:text-white transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12 flex-1">
              <div>
                <h4 className="text-indigo-950 font-black mb-8 uppercase text-xs tracking-widest">Courses</h4>
                <ul className="space-y-4 text-slate-500 font-bold text-sm">
                   <li><a href="#" className="hover:text-indigo-600 transition-colors">Data Science</a></li>
                   <li><a href="#" className="hover:text-indigo-600 transition-colors">Web Development</a></li>
                   <li><a href="#" className="hover:text-indigo-600 transition-colors">Digital Marketing</a></li>
                   <li><a href="#" className="hover:text-indigo-600 transition-colors">AI & ML</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-indigo-950 font-black mb-8 uppercase text-xs tracking-widest">Company</h4>
                <ul className="space-y-4 text-slate-500 font-bold text-sm">
                   <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
                   <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact Us</a></li>
                   <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                   <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                </ul>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <h4 className="text-indigo-950 font-black mb-8 uppercase text-xs tracking-widest">Contact Information</h4>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <MapPin className="text-indigo-600 shrink-0" size={24} />
                    <p className="text-slate-500 font-bold text-sm leading-relaxed">2nd Floor, Clock Tower Plaza, Dehradun, Uttarakhand, 248001</p>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="text-indigo-600 shrink-0" size={24} />
                    <p className="text-indigo-950 font-black text-lg">+91 12345 67890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <a href="#">Contact Details</a>
              <a href="#">T&C</a>
              <a href="#">Help</a>
            </div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">&copy; {new Date().getFullYear()} Brillica Services</p>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
}
