import React, { useState, useEffect, useCallback } from 'react';
import { 
  Instagram, 
  Mail, 
  ChevronRight, 
  Activity, 
  Zap, 
  Trophy, 
  Menu, 
  X, 
  CheckCircle, 
  Heart, 
  Users, 
  Send,
  Flame,
  Plus,
  Minus,
  Quote,
  ArrowRight,
  Dumbbell,
  Award,
  Cookie
} from 'lucide-react';

// --- Sub-Components ---

const GDPRConsentBanner = ({ onAccept, onReject, show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-stone-950 border-t border-white/10 p-4 md:p-6 z-50 animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
          <p className="text-stone-300 text-sm md:text-base font-medium">
            We use analytics to understand how you use our site. No personal data is shared.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
          <button 
            onClick={onReject}
            className="flex-1 md:flex-initial px-4 py-2 text-white border border-white/20 rounded-lg text-xs font-bold uppercase tracking-wider hover:border-white/40 transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={onAccept}
            className="flex-1 md:flex-initial px-6 py-2 bg-orange-500 text-black rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ subtitle, title, centered = false }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 flex items-center gap-2 justify-center md:justify-start">
      {centered ? null : <span className="w-8 h-[2px] bg-orange-500 inline-block"></span>}
      {subtitle}
      {centered ? null : <span className="w-8 h-[2px] bg-orange-500 inline-block"></span>}
    </h2>
    <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic leading-none">
      {title}
    </h3>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 md:py-6 flex justify-between items-center text-left hover:text-orange-400 transition-colors group"
      >
        <span className="text-base md:text-lg font-bold tracking-tight pr-4 transition-transform duration-300 group-hover:translate-x-1">{question}</span>
        <div className={`p-1.5 md:p-2 rounded-full transition-all duration-300 flex-shrink-0 ${isOpen ? 'bg-orange-500 text-black rotate-180' : 'bg-stone-800 text-stone-400'}`}>
          {isOpen ? <Minus className="h-4 w-4 md:h-5 md:w-5" /> : <Plus className="h-4 w-4 md:h-5 md:w-5" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-stone-400 leading-relaxed text-sm md:text-base pl-4 border-l-2 border-orange-500/50">
          {answer}
        </p>
      </div>
    </div>
  );
};

const NavLink = ({ onClick, children, mobile = false }) => (
  <button 
    onClick={onClick} 
    className={`${mobile 
      ? "block w-full text-left text-3xl font-black text-white uppercase tracking-tighter py-3 hover:text-orange-500 border-b border-white/5" 
      : "text-stone-400 hover:text-white font-bold text-xs uppercase tracking-widest transition-all hover:tracking-[0.15em]"
    }`}
  >
    {children}
  </button>
);

const ServiceCard = ({ icon: Icon, title, desc, featured = false, onClick }) => (
  <div className={`
    p-8 md:p-10 rounded-3xl relative overflow-hidden transition-all duration-300 group
    ${featured 
      ? 'bg-orange-500 text-black md:-translate-y-4 shadow-[0_20px_40px_-10px_rgba(249,115,22,0.3)]' 
      : 'bg-stone-900/50 border border-white/5 hover:border-orange-500/30 text-white hover:bg-stone-900'}
  `}>
    <Icon className={`h-10 w-10 mb-6 ${featured ? 'text-black fill-black/10' : 'text-orange-500'}`} />
    <h4 className="text-2xl font-black mb-3 uppercase italic leading-none">{title}</h4>
    <p className={`mb-8 leading-relaxed font-medium text-sm md:text-base ${featured ? 'text-black/80' : 'text-stone-400'}`}>
      {desc}
    </p>
    <button onClick={onClick} className={`font-black uppercase text-[10px] tracking-widest flex items-center gap-2 ${featured ? 'text-black' : 'text-white group-hover:text-orange-500'}`}>
      Book This <ArrowRight className="h-4 w-4" />
    </button>
  </div>
);

// --- Main App ---

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState("IDLE");
  const [showFullStory, setShowFullStory] = useState(false);
  const [showConsentBanner, setShowConsentBanner] = useState(false);
  const [isEURegion, setIsEURegion] = useState(false);
  const currentYear = new Date().getFullYear();

  // Check if user is in EU and hasn't made a consent decision
  useEffect(() => {
    const checkEUAndShowBanner = async () => {
      // Check if user already made a decision
      const existingConsent = localStorage.getItem('gdpr-consent');
      if (existingConsent) return;

      try {
        // Use a free IP geolocation service to detect EU
        const response = await fetch('https://ipapi.co/json/', { timeout: 3000 });
        const data = await response.json();
        const euCountries = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];
        
        if (euCountries.includes(data.country_code)) {
          setIsEURegion(true);
          setShowConsentBanner(true);
        }
      } catch (error) {
        // If geolocation fails, don't show banner (fail-open approach)
        console.log('Could not detect region, skipping consent banner');
      }
    };

    checkEUAndShowBanner();
  }, []);

  const handleConsentAccept = () => {
    localStorage.setItem('gdpr-consent', 'accepted');
    setShowConsentBanner(false);
    
    // Update GA4 consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const handleConsentReject = () => {
    localStorage.setItem('gdpr-consent', 'rejected');
    setShowConsentBanner(false);
  };

  // Safely handle scrolling to an element by ID
  const scrollToId = useCallback((id) => {
    if (!id) return;
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  }, []);

  const handleNavClick = (id) => {
    scrollToId(id);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SUBMITTING");
    const form = e.target;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/xjgkrrlp", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      setStatus("ERROR");
    }
  };

  const faqs = [
    {
      question: "I'm not an elite athlete. Is this still for me?",
      answer: "Absolutely. I work with everyone from first-time gym-goers to professional athletes. If you have a body and a goal, you need fuel. My job is to make elite-level science work for your everyday life."
    },
    {
        question: "Do I have to give up my favorite foods?",
        answer: "No. Sustainable nutrition is built on balance, not restriction. We focus on adding what your body needs rather than just taking things away. We find a way to fit your lifestyle into your goals."
    },
    {
      question: "I think I eat pretty well, but I am burned out midway through my workout.",
      answer: "This is a classic sign of a fueling mismatch. We'll look at your pre-training nutrition and post-workout recovery window to ensure you aren't running on fumes. You shouldn't feel wrecked after every session."
    },
    {
      question: "I want to build muscle/lose fat. Do you help with macros?",
      answer: "Yes. Whether you are chasing aesthetics, strength, or endurance, we will dial in your specific macro-nutrient needs to ensure you are getting exactly what you need to perform and recover."
    },
    {
      question: "What does an 'Initial Consult' involve?",
      answer: "It's a simple, 15-minute chat where we talk about where you are and where you want to be. No judgment, no pressure—just a chance to see if we're a good fit to work together."
    },
    {
      question: "I've tried every diet. Why is this different?",
      answer: "Diets are temporary; protocols are personal. We don't follow trends. We look at your specific data—your activity, your habits, and your preferences—to build a plan that finally sticks."
    }
  ];

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-300 selection:bg-orange-500 selection:text-black overflow-x-hidden">
      
      {/* GDPR Consent Banner - Only shows to EU users */}
      <GDPRConsentBanner 
        show={showConsentBanner} 
        onAccept={handleConsentAccept}
        onReject={handleConsentReject}
      />
      
      {/* Navigation */}
      <nav className={`w-full z-[100] transition-all duration-300 absolute md:fixed ${scrolled ? 'md:bg-stone-950/90 md:backdrop-blur-md py-3 border-b border-white/5' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer z-[101]" onClick={() => handleNavClick('home')}>
              <div className="relative group">
                <Flame className="h-6 w-6 text-orange-500 fill-orange-500 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-orange-500 blur-lg opacity-40 animate-pulse"></div>
              </div>
              <span className="font-black text-xl tracking-tighter text-white uppercase italic">
                Fuelled<span className="text-orange-500">By</span>Lucie
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10">
              <NavLink onClick={() => handleNavClick('about')}>About</NavLink>
              <NavLink onClick={() => handleNavClick('services')}>Services</NavLink>
              <NavLink onClick={() => handleNavClick('faq')}>FAQ</NavLink>
              <button 
                onClick={() => handleNavClick('contact')} 
                className="bg-orange-500 text-black px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-orange-500/20"
              >
                Let's Chat
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden z-[101]">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-1 focus:outline-none">
                {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-stone-950 z-[100] transition-transform duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)] md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="flex flex-col justify-center h-full px-8 space-y-6">
              <NavLink mobile onClick={() => handleNavClick('about')}>About Me</NavLink>
              <NavLink mobile onClick={() => handleNavClick('services')}>Services</NavLink>
              <NavLink mobile onClick={() => handleNavClick('faq')}>Questions</NavLink>
              <NavLink mobile onClick={() => handleNavClick('contact')}>Contact</NavLink>
              
              <div className="pt-8 border-t border-white/10 mt-8">
                <button 
                  onClick={() => handleNavClick('contact')} 
                  className="w-full text-center bg-orange-500 text-black py-4 font-black uppercase text-lg rounded-xl shadow-xl shadow-orange-500/10 active:scale-95 transition-transform"
                >
                  Book Free Call
                </button>
              </div>
              
              <div className="flex flex-col gap-4 pt-4 items-center">
                 <a href="https://www.instagram.com/fuelledbylucie/" target="_blank" className="flex items-center gap-3 text-stone-500 hover:text-orange-500 transition-colors">
                    <Instagram className="h-6 w-6" /> <span className="text-sm font-bold tracking-widest">@fuelledbylucie</span>
                 </a>
                 <a href="mailto:fuelledbylucie@gmail.com" className="flex items-center gap-3 text-stone-500 hover:text-orange-500 transition-colors">
                    <Mail className="h-6 w-6" /> <span className="text-sm font-bold tracking-widest">fuelledbylucie@gmail.com</span>
                 </a>
              </div>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative flex items-center pt-32 pb-20 md:min-h-screen overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-orange-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-400 text-[10px] font-black tracking-[0.2em] uppercase mx-auto lg:mx-0">
                <span className="animate-pulse">●</span> Spots available for {currentYear}
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase italic">
                <span className="block">No Extremes.</span>
                <span className="block">No BS.</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Just Balance.</span>
              </h1>
              
              <div className="flex flex-col gap-3">
                  <p className="text-lg md:text-2xl text-stone-300 font-bold max-w-xl mx-auto lg:mx-0 leading-tight">
                    Sports nutrition for training & real life.
                  </p>
                  <div className="w-20 h-1 bg-orange-500 mx-auto lg:mx-0 rounded-full mt-2"></div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
                <button 
                  onClick={() => handleNavClick('contact')}
                  className="px-8 py-4 bg-orange-500 text-black rounded-full font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-[0_10px_40px_-10px_rgba(249,115,22,0.5)] transform hover:-translate-y-1"
                >
                  Start Your Journey
                </button>
                <button 
                  onClick={() => handleNavClick('services')}
                  className="px-8 py-4 bg-transparent text-white border border-white/20 rounded-full font-black text-sm uppercase tracking-widest hover:border-orange-500 hover:text-orange-500 transition-all"
                >
                  Explore Plans
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
               {/* Decorative Ring */}
               <div className="absolute inset-0 border-2 border-orange-500/20 rounded-full scale-105 animate-[spin_10s_linear_infinite] border-dashed"></div>
               
               <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-stone-900 border border-white/10 mx-auto max-w-md lg:max-w-full group">
                <img 
                  src="lucie_background.jpg" 
                  alt="Approachable Performance Nutrition" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {e.target.style.display='none'; e.target.parentElement.style.backgroundColor='#1c1917'}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Float Card */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                       <Quote className="h-5 w-5 text-orange-500 fill-orange-500" />
                       <p className="font-black text-white uppercase text-[10px] tracking-widest">Lucie's Philosophy</p>
                    </div>
                    <p className="text-stone-200 text-sm font-medium italic">"Food is fuel, but it's also joy. We need both to thrive."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-stone-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            <div className="order-2 md:order-1 relative sticky top-32">
               <div className="absolute -inset-4 bg-orange-500/20 blur-xl rounded-full opacity-50"></div>
               <div className="rounded-[2rem] overflow-hidden relative shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500">
                  <img 
                    src="lucie_hyrox.jpeg" 
                    alt="Lucie - at Hyrox " 
                    className="w-full h-full object-cover"
                    onError={(e) => {e.target.style.display='none'; e.target.parentElement.style.backgroundColor='#1c1917'}}
                  />
                  {/* Fallback box if image missing */}
                  <div className="absolute inset-0 flex items-center justify-center bg-stone-800 -z-10">
                    <Users className="w-16 h-16 text-stone-700" />
                  </div>
               </div>
            </div>
            
            <div className="space-y-8 order-1 md:order-2">
              <SectionHeader subtitle="The Coach" title={<>Hi, I'm <br/> Lucie 👋</>} />
              
              <div className="space-y-6 text-lg text-stone-400 leading-relaxed font-medium">
                <p>
                  I'm a Sydney-based nutritionist, personal trainer, and baker who helps people navigate the noise of the wellness industry.
                </p>
                <p>
                  My philosophy is simple: <span className="text-white font-bold">No extremes. No fear foods. No nonsense.</span>
                </p>
                <p>
                  I've spent <span className="text-white font-black decoration-orange-500 underline underline-offset-4 decoration-2">7+ years</span> helping people simplify the science. Whether you're trying to lose weight, gain muscle, or just have more energy for your training, I'm here to help you fuel your life, not control it.
                </p>
                
                {/* Toggle Story Section */}
                {!showFullStory ? (
                    <button 
                        onClick={() => setShowFullStory(true)}
                        className="flex items-center gap-2 text-orange-500 font-black uppercase text-xs tracking-widest hover:text-white transition-colors py-2"
                    >
                        Read My Full Story <ChevronRight className="h-4 w-4" />
                    </button>
                ) : (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-6 border-l-2 border-orange-500/30 pl-6 mt-6">
                        <p>
                            My journey into nutrition wasn't started in a classroom; it started from a place of struggle. I spent years fighting my biology, over-restricting, and treating food as the enemy.
                        </p>
                        <p>
                            It wasn't until I started focusing on <em className="text-white not-italic">performance</em>—what my body could do, rather than just what it looked like—that everything changed.
                        </p>
                        <p>
                            Now, I combine deep empathy with hard science. I don't just hand you a PDF and wish you luck. I dig deep into the "why" behind your habits to build a lifestyle that supports your mental health just as much as your physical health.
                        </p>
                        <p className="text-2xl font-black italic uppercase tracking-tighter text-white pt-4 leading-none">
                            Let’s get fuelled ❤️‍🔥
                        </p>
                        <button 
                            onClick={() => setShowFullStory(false)}
                            className="text-stone-500 font-bold uppercase text-[10px] tracking-widest hover:text-white transition-colors pt-4"
                        >
                            Show Less
                        </button>
                    </div>
                )}
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="bg-stone-950 px-5 py-3 rounded-xl border border-white/5 flex items-center gap-3">
                    <Heart className="h-5 w-5 text-orange-500" />
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Compassionate</span>
                  </div>
                  <div className="bg-stone-950 px-5 py-3 rounded-xl border border-white/5 flex items-center gap-3">
                    <Dumbbell className="h-5 w-5 text-orange-500" />
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Gym Focused</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-stone-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader subtitle="How we work together" title="Find Your Path" centered />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 pt-8">
            <ServiceCard 
              icon={Zap}
              title="Gym Starter Audit"
              desc="Just joined a gym? A 60-minute deep dive to set up your nutrition basics so you don't waste your 'newbie gains'."
              onClick={() => handleNavClick('contact')}
            />
            
            <ServiceCard 
              icon={Flame}
              title="The 12-Week Shift"
              desc="My signature program. We rebuild your relationship with food while fueling your specific physique or strength goals."
              featured={true}
              onClick={() => handleNavClick('contact')}
            />

            <ServiceCard 
              icon={Trophy}
              title="Performance Prep"
              desc="Training for a marathon, Hyrox, or competition? We dial in your macros and timing to ensure you hit the start line fully fuelled."
              onClick={() => handleNavClick('contact')}
            />
          </div>
        </div>
      </section>

      {/* Testimonials (Social Proof) */}
      <section className="py-20 bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Quote className="h-12 w-12 text-orange-500 opacity-50" />
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic leading-tight">
                "Lucie didn't just change my diet, she changed how I view my training."
              </h3>
              <div>
                <p className="text-white font-bold text-lg">Sarah J.</p>
                <p className="text-orange-500 text-sm font-bold uppercase tracking-wider">Strength Athlete</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-stone-950 p-6 rounded-2xl border border-white/5">
                 <p className="text-stone-400 text-sm mb-4">"I finally have energy to lift heavy after work. That's worth more than any number on a scale."</p>
                 <p className="text-white font-bold text-xs uppercase tracking-wider">- Mike T.</p>
               </div>
               <div className="bg-stone-950 p-6 rounded-2xl border border-white/5 mt-8">
                 <p className="text-stone-400 text-sm mb-4">"No judgment. That's the best part. Even when I slipped up, Lucie was there to help me get back on track."</p>
                 <p className="text-white font-bold text-xs uppercase tracking-wider">- Elena R.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 bg-stone-950">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader subtitle="Curious?" title="Common Questions" centered />
          
          <div className="mt-12 bg-stone-900/50 rounded-3xl p-6 md:p-10 border border-white/5">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section id="booking" className="py-24 md:py-40 bg-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-black text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase italic">
              Ready to feel <br/> Alive?
            </h2>
            <p className="text-lg md:text-2xl text-black/80 mb-12 max-w-2xl mx-auto font-bold">
              Let's have a chat. No pressure, no sales pitch. Just a conversation about where you are and where you want to be.
            </p>
            <button 
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-3 px-10 py-6 bg-black text-white font-black text-lg md:text-xl rounded-full hover:scale-105 transition-all shadow-2xl uppercase italic tracking-wider cursor-pointer"
            >
              Book Your Free Call <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-stone-950 text-white pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <Flame className="h-8 w-8 text-orange-500 fill-orange-500" />
                <span className="font-black text-2xl tracking-tighter uppercase italic">Fuelled<span className="text-orange-500">By</span>Lucie</span>
              </div>
              <p className="text-stone-500 text-xl font-medium leading-relaxed max-w-sm">
                Empowering you to eat with intention and live with energy. Based in Sydney, coaching worldwide.
              </p>
              <div className="flex flex-col gap-4">
                <a href="https://www.instagram.com/fuelledbylucie/" target="_blank" className="flex items-center gap-3 text-stone-400 hover:text-orange-500 transition-colors group">
                    <div className="p-3 rounded-full bg-stone-900 border border-white/5 group-hover:bg-orange-500 group-hover:text-black transition-all">
                        <Instagram className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold tracking-widest">@fuelledbylucie</span>
                </a>
                <a href="mailto:fuelledbylucie@gmail.com" className="flex items-center gap-3 text-stone-400 hover:text-orange-500 transition-colors group">
                    <div className="p-3 rounded-full bg-stone-900 border border-white/5 group-hover:bg-orange-500 group-hover:text-black transition-all">
                        <Mail className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold tracking-widest">fuelledbylucie@gmail.com</span>
                </a>
              </div>
            </div>
            
            <div className="bg-stone-900/50 p-8 rounded-3xl border border-white/5">
              {status === "SUCCESS" ? (
                <div className="text-center py-12 animate-in fade-in zoom-in">
                  <CheckCircle className="h-16 w-16 text-orange-500 mx-auto mb-6" />
                  <h3 className="text-3xl font-black italic uppercase text-white mb-2">Message Sent!</h3>
                  <p className="text-stone-400">I'll get back to you within 24 hours to organize your call.</p>
                  <button onClick={() => setStatus("IDLE")} className="text-orange-500 font-bold uppercase text-xs mt-6 hover:underline">Send another</button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                   <h3 className="text-2xl font-black uppercase italic mb-6">Send a Message</h3>
                   <div className="grid md:grid-cols-2 gap-4">
                      <input required name="name" placeholder="NAME" className="w-full bg-stone-950 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none text-sm font-bold placeholder:text-stone-700" />
                      <input required name="phone" type="tel" placeholder="PHONE" className="w-full bg-stone-950 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none text-sm font-bold placeholder:text-stone-700" />
                   </div>
                   <input required name="email" type="email" placeholder="EMAIL" className="w-full bg-stone-900 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none text-sm font-bold placeholder:text-stone-700" />
                   <textarea required name="message" rows="4" placeholder="HOW CAN I HELP?" className="w-full bg-stone-950 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none text-sm font-bold placeholder:text-stone-700 resize-none"></textarea>
                   <button 
                     type="submit"
                     disabled={status === "SUBMITTING"}
                     className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition-colors flex items-center justify-center gap-2"
                   >
                     {status === "SUBMITTING" ? "Sending..." : <>Send Message <Send className="h-4 w-4" /></>}
                   </button>
                   {status === "ERROR" && <p className="text-orange-500 text-[10px] font-black uppercase text-center">Something went wrong. Please try again or contact me directly at fuelledbylucie@gmail.com</p>}
                </form>
              )}
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">
                <p>&copy; {currentYear} Fuelled By Lucie.</p>
            </div>
            
            {/* Accreditation Badge */}
            <a href="https://nutritioncouncilaustralia.com.au/nrn/" target="_blank" className="flex items-center gap-3 bg-stone-900 px-4 py-2 rounded-lg border border-white/5 hover:border-orange-500 transition-colors group">
                <div className="bg-orange-500 p-1.5 rounded-full group-hover:scale-110 transition-transform">
                    <Award className="h-4 w-4 text-black" />
                </div>
                <div className="text-left">
                    <p className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">Nationally Recognised Nutritionist</p>
                    <p className="text-[11px] text-white font-bold tracking-tight">Nutrition Council Australia</p>
                    <p className="text-[9px] text-orange-500 font-bold uppercase tracking-wider mt-0.5">Reg: 1780</p>
                </div>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;