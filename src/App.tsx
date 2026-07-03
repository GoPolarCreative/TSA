import { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Menu,
  X,
  Wrench,
  Droplets,
  HardHat,
  Zap,
  ChevronDown,
  Star,
  MessageSquare,
  Instagram,
  ArrowRight,
  Shield,
  Clock,
  DollarSign,
  Award,
} from 'lucide-react';

const SERVICES = [
  { icon: Droplets, title: 'New Sewer Connections', desc: 'Full sewer connection installations for new builds and extensions.' },
  { icon: Wrench, title: 'Sewer Upgrades', desc: 'Upgrade existing sewer systems to meet current standards and capacity.' },
  { icon: Droplets, title: 'Stormwater Drainage', desc: 'Design and install effective stormwater management systems.' },
  { icon: HardHat, title: 'Excavation & Site Cuts', desc: 'Professional excavation and site preparation for any project.' },
  { icon: HardHat, title: 'New Build Plumbing', desc: 'Complete plumbing solutions from the ground up for new constructions.' },
  { icon: Award, title: 'Metal Roofing', desc: 'Quality metal roof installations, repairs, and replacements.' },
  { icon: Droplets, title: 'Water Renewals', desc: 'Water main renewals and upgrades for residential and commercial properties.' },
  { icon: Zap, title: 'Hot Water Replacement', desc: 'Fast hot water system replacements with minimal downtime.' },
];

const WHY_US = [
  { icon: Shield, label: 'Licensed & Insured' },
  { icon: Clock, label: 'Fast Turnaround' },
  { icon: DollarSign, label: 'Fair Pricing' },
  { icon: MapPin, label: 'Melbourne & Yarra Valley' },
  { icon: Award, label: 'Large Project Experts' },
];

const IMAGES = [
  { src: '/images/tsa1.jpeg', alt: 'TSA Plumbing drainage installation' },
  { src: '/images/tsa2.jpg', alt: 'TSA excavation work' },
  { src: '/images/tsa3.jpg', alt: 'TSA stormwater pipe installation' },
  { src: '/images/tsa4.png', alt: 'TSA metal roofing installation' },
  { src: '/images/tsa5.png', alt: 'TSA green metal roof project' },
  { src: '/images/tsa6.png', alt: 'TSA residential roof replacement' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [heroForm, setHeroForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [heroFormStatus, setHeroFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeroFormStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '25d99e7e-ceca-4513-9c71-25ab6b685f90',
          ...heroForm,
          subject: `New Quote Request from ${heroForm.name} - TSA Roofing & Plumbing`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setHeroFormStatus('success');
        setHeroForm({ name: '', phone: '', service: '', message: '' });
      } else {
        setHeroFormStatus('error');
      }
    } catch {
      setHeroFormStatus('error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '25d99e7e-ceca-4513-9c71-25ab6b685f90',
          ...formData,
          subject: `New Enquiry from ${formData.name} – TSA Roofing & Plumbing`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black shadow-lg' : 'bg-black/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
            <img
              src="/2BA2ED1C-339F-4B8D-9C29-0A0ADEF3AD75_-_TSA_Roofing_and_Plumbing.png"
              alt="TSA Roofing and Plumbing"
              className="h-14 w-14 object-contain"
            />
            <span className="text-white font-semibold text-lg tracking-tight leading-none">
              TSA<br />
              <span className="text-blue-400 text-xs font-bold tracking-widest">ROOFING & PLUMBING</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {['services', 'about', 'gallery', 'contact'].map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="text-gray-300 hover:text-white text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                {s}
              </button>
            ))}
            <a
              href="tel:0447528482"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold text-sm transition-colors flex items-center gap-2"
            >
              <Phone size={14} />
              0447 528 482
            </a>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800 px-4 pb-6 pt-2">
            {['services', 'about', 'gallery', 'contact'].map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="block w-full text-left text-gray-300 hover:text-white py-3 text-sm font-semibold uppercase tracking-wider border-b border-gray-800 transition-colors"
              >
                {s}
              </button>
            ))}
            <a
              href="tel:0447528482"
              className="mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded font-bold text-sm transition-colors"
            >
              <Phone size={14} />
              Call 0447 528 482
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-black overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-950 opacity-90" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('/images/tsa3.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded mb-6">
              <Zap size={12} />
              Emergency Services Available
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none mb-4">
              TSA<br />
              <span className="text-blue-500">ROOFING</span><br />
              <span className="text-gray-300 text-4xl sm:text-5xl lg:text-6xl">& PLUMBING</span>
            </h1>
            <p className="text-gray-400 text-lg mt-6 mb-8 max-w-lg leading-relaxed">
              Family-based trade specialists serving Melbourne's Eastern Suburbs and the Yarra Valley. Fully licensed, insured, and built on workmanship you can trust.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {WHY_US.slice(0, 4).map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold px-3 py-1.5 rounded">
                  <Icon size={12} className="text-blue-400" />
                  {label}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('contact')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded font-semibold text-base uppercase tracking-wide transition-all hover:scale-105 flex items-center gap-2"
              >
                Get a Free Quote
                <ArrowRight size={16} />
              </button>
              <a
                href="tel:0447528482"
                className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded font-semibold text-base uppercase tracking-wide transition-all flex items-center gap-2"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </div>

          <div className="hidden md:flex flex-col bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-white font-semibold text-xl mb-1">Get a Free Quote</h3>
            <p className="text-gray-400 text-sm mb-6">We'll get back to you fast.</p>
            {heroFormStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-14 h-14 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle size={28} className="text-green-400" />
                </div>
                <h4 className="text-white font-semibold text-lg mb-1">Message Sent!</h4>
                <p className="text-gray-400 text-sm">Tim will be in touch shortly.</p>
                <button onClick={() => setHeroFormStatus('idle')} className="mt-4 text-blue-400 hover:text-blue-300 text-xs font-semibold underline">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleHeroSubmit} className="space-y-3">
                <input
                  required
                  type="text"
                  value={heroForm.name}
                  onChange={(e) => setHeroForm((d) => ({ ...d, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-400 placeholder-gray-500 transition-colors"
                />
                <input
                  required
                  type="tel"
                  value={heroForm.phone}
                  onChange={(e) => setHeroForm((d) => ({ ...d, phone: e.target.value }))}
                  placeholder="Phone number"
                  className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-400 placeholder-gray-500 transition-colors"
                />
                <select
                  value={heroForm.service}
                  onChange={(e) => setHeroForm((d) => ({ ...d, service: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                >
                  <option value="" className="bg-gray-900">Select a service...</option>
                  {SERVICES.map((s) => (
                    <option key={s.title} value={s.title} className="bg-gray-900">{s.title}</option>
                  ))}
                  <option value="Other" className="bg-gray-900">Other</option>
                </select>
                <textarea
                  required
                  rows={3}
                  value={heroForm.message}
                  onChange={(e) => setHeroForm((d) => ({ ...d, message: e.target.value }))}
                  placeholder="Brief description of your job..."
                  className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-400 placeholder-gray-500 transition-colors resize-none"
                />
                {heroFormStatus === 'error' && (
                  <p className="text-red-400 text-xs">Something went wrong. Please call 0447 528 482.</p>
                )}
                <button
                  type="submit"
                  disabled={heroFormStatus === 'sending'}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white py-3 rounded-lg font-semibold text-sm uppercase tracking-wide transition-colors flex items-center justify-center gap-2"
                >
                  {heroFormStatus === 'sending' ? 'Sending...' : (
                    <>
                      <MessageSquare size={14} />
                      Request Free Quote
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <button
          onClick={() => scrollTo('services')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* STATS STRIP */}
      <div className="bg-blue-600 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap justify-around gap-4 text-white text-center">
          <div>
            <div className="text-3xl font-semibold">100%</div>
            <div className="text-blue-100 text-xs font-semibold uppercase tracking-wide">Licensed & Insured</div>
          </div>
          <div>
            <div className="text-3xl font-semibold">FREE</div>
            <div className="text-blue-100 text-xs font-semibold uppercase tracking-wide">Quotes & Estimates</div>
          </div>
          <div>
            <div className="text-3xl font-semibold">24/7</div>
            <div className="text-blue-100 text-xs font-semibold uppercase tracking-wide">Emergency Service</div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-blue-500 font-bold text-sm uppercase tracking-widest">What We Do</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">Our Services</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              From ground-up new builds to emergency repairs, we handle it all across Melbourne's east and the Yarra Valley.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-600 hover:bg-gray-800 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-600/10 border border-blue-600/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors">
                  <Icon size={22} className="text-blue-400" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">About TSA</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2 mb-6 leading-tight">
              Built on Workmanship.<br />Driven by Family.
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              TSA Roofing & Plumbing is a family-based business proudly operating out of the Yarra Valley. With over 5 years of hands-on experience, we take pride in showing up on time and delivering work that stands the test of time.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We are fully licensed and insured, bringing many years of expertise across plumbing and roofing to every job, from complex large-scale projects to straightforward residential repairs.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {WHY_US.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-blue-600 flex-shrink-0" />
                  <span className="text-gray-800 font-semibold text-sm">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-bold text-sm uppercase tracking-wide transition-colors flex items-center gap-2"
              >
                Request a Quote
                <ArrowRight size={14} />
              </button>
              <a
                href="tel:0447528482"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-6 py-3 rounded font-bold text-sm uppercase tracking-wide transition-all flex items-center gap-2"
              >
                <Phone size={14} />
                0447 528 482
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full bg-blue-600 rounded-xl" />
            <img
              src="/images/tsa3.jpg"
              alt="TSA Plumbing project work"
              className="relative rounded-xl object-cover w-full h-96 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-14 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-2xl font-semibold mb-1">Service Areas</h3>
            <p className="text-blue-100">Melbourne Eastern Suburbs & Yarra Valley</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {['Gembrook', 'Yarra Valley', 'Eastern Suburbs', 'Lilydale', 'Croydon', 'Ferntree Gully'].map((area) => (
              <span key={area} className="bg-white/15 border border-white/25 text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-1.5">
                <MapPin size={12} />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-blue-500 font-bold text-sm uppercase tracking-widest">Our Work</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">Project Gallery</h2>
            <p className="text-gray-400 mt-4 max-w-lg mx-auto">
              A snapshot of recent drainage, plumbing, and excavation projects completed across Melbourne's east.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {IMAGES.map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl group">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/30 transition-colors duration-300 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMERGENCY BANNER */}
      <div className="bg-gray-900 border-y border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap size={22} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Emergency & Same-Day Services</h3>
              <p className="text-gray-400 text-sm">Got an urgent plumbing or roofing issue? We're here to help fast.</p>
            </div>
          </div>
          <a
            href="tel:0447528482"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded font-semibold text-sm uppercase tracking-wide transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Phone size={16} />
            Call Now: 0447 528 482
          </a>
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">Get In Touch</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2 mb-6">
              Request a<br />Free Quote
            </h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Fill in the form and Tim will get back to you promptly. We offer free quotes for all jobs, big or small.
            </p>
            <div className="space-y-5">
              <a
                href="tel:0447528482"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Phone size={20} className="text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Phone / SMS</div>
                  <div className="text-gray-900 font-bold text-lg">0447 528 482</div>
                </div>
              </a>
              <a
                href="mailto:tsaroofingandplumbing@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Mail size={20} className="text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Email</div>
                  <div className="text-gray-900 font-bold">tsaroofingandplumbing@gmail.com</div>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
                  <MapPin size={20} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Based In</div>
                  <div className="text-gray-900 font-bold">Gembrook, Victoria</div>
                </div>
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Instagram size={20} className="text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Instagram</div>
                  <div className="text-gray-900 font-bold">@tsaroofingandplumbing</div>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-950 rounded-2xl p-8 border border-gray-800">
            {formStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-white text-2xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-gray-400">Thanks for reaching out. Tim will be in touch with you shortly.</p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-6 text-blue-400 hover:text-blue-300 text-sm font-semibold underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">Full Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">Phone *</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                      placeholder="04XX XXX XXX"
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">Service Required</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData((d) => ({ ...d, service: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select a service...</option>
                    {SERVICES.map((s) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                    placeholder="Tell us about your project..."
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 transition-colors resize-none"
                  />
                </div>
                {formStatus === 'error' && (
                  <p className="text-red-400 text-sm">Something went wrong. Please call us directly on 0447 528 482.</p>
                )}
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white py-4 rounded-lg font-semibold text-sm uppercase tracking-wide transition-colors flex items-center justify-center gap-2"
                >
                  {formStatus === 'sending' ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <MessageSquare size={16} />
                      Send Enquiry for FREE Quote
                    </>
                  )}
                </button>
                <p className="text-gray-500 text-xs text-center">We typically respond within a few hours during business days.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/2BA2ED1C-339F-4B8D-9C29-0A0ADEF3AD75_-_TSA_Roofing_and_Plumbing.png"
                  alt="TSA Logo"
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <div className="text-white font-semibold text-base">TSA ROOFING</div>
                  <div className="text-blue-400 text-xs font-bold tracking-widest">& PLUMBING</div>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Family-based trade specialists in the Yarra Valley. Fully licensed and insured.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Services</h4>
              <ul className="space-y-2">
                {SERVICES.slice(0, 5).map((s) => (
                  <li key={s.title}>
                    <button onClick={() => scrollTo('services')} className="text-gray-500 hover:text-gray-300 text-sm transition-colors text-left">
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a href="tel:0447528482" className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors">
                    <Phone size={14} className="text-blue-500" />
                    0447 528 482
                  </a>
                </li>
                <li>
                  <a href="mailto:tsaroofingandplumbing@gmail.com" className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors">
                    <Mail size={14} className="text-blue-500" />
                    tsaroofingandplumbing@gmail.com
                  </a>
                </li>
                <li className="text-gray-400 text-sm flex items-center gap-2">
                  <MapPin size={14} className="text-blue-500" />
                  Gembrook, Victoria
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-600 text-xs">
            <p>&copy; {new Date().getFullYear()} TSA Roofing & Plumbing Pty Ltd. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield size={12} className="text-blue-600" />
                Fully Licensed & Insured
              </div>
              <a
                href="https://www.itscold.com.au"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-gray-400 transition-colors"
              >
                Website by Go Polar
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
