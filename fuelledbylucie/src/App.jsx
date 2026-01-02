import React, { useState, useEffect } from 'react';
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
  Minus
} from 'lucide-react';

// --- Components ---

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-orange-500 transition-colors group"
      >
        <span className="text-lg md:text-xl font-bold tracking-tight pr-8 transition-transform duration-300 group-hover:translate-x-1">{question}</span>
        <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-orange-500/10 rotate-180' : 'bg-stone-900'}`}>
          {isOpen ? <Minus className="h-5 w-5 text-orange-500" /> : <Plus className="h-5 w-5 text-stone-600" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-stone-400 leading-relaxed text-lg italic pl-2 border-l-2 border-orange-500/30">
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
      ? "block w-full text-left text-4xl font-black text-white uppercase tracking-tighter py-4 hover:text-orange-500" 
      : "text-stone-400 hover:text-white font-bold text-xs uppercase tracking-widest transition-all hover:tracking-[0.2em]"
    }`}
  >
    {children}
  </button>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState("IDLE");

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
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
  };

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
      question: "What does a 'Diagnostic Consult' involve?",
      answer: "It's a simple, 15-minute chat where we talk about where you are and where you want to be. No judgment, no pressure—just a chance to see if we're a good fit to work together."
    },
    {
      question: "I've tried every diet. Why is this different?",
      answer: "Diets are temporary; protocols are personal. We don't follow trends. We look at your specific data—your activity, your habits, and your preferences—to build a plan that finally sticks."
    }
  ];

  return (
    <div className="min-h-screen bg-black font-sans text-stone-300 selection:bg-orange-500 selection:text-black">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection('home')}>
              <div className="relative">
                <Flame className="h-7 w-7 text-orange-500 fill-orange-500 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-orange-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity"></div>
              </div>
              <span className="font-black text-2xl tracking-tighter text-white uppercase italic">
                Fuelled<span className="text-orange-500">By</span>Lucie
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-10">
              <NavLink onClick={() => scrollToSection('about')}>About</NavLink>
              <NavLink onClick={() => scrollToSection('plans')}>Services</NavLink>
              <NavLink onClick={() => scrollToSection('faq')}>FAQ</NavLink>
              <a href="https://www.instagram.com/fuelledbylucie/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-orange-500 transition-all hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <button 
                onClick={() => scrollToSection('booking')} 
                className="bg-orange-500 text-black px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-orange-500/20"
              >
                Book a Chat
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
                {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-stone-950 z-[-1] transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="flex flex-col justify-center h-full px-10 space-y-8 pt-20">
              <NavLink mobile onClick={() => scrollToSection('about')}>About</NavLink>
              <NavLink mobile onClick={() => scrollToSection('plans')}>Services</NavLink>
              <NavLink mobile onClick={() => scrollToSection('faq')}>FAQ</NavLink>
              <button 
                onClick={() => scrollToSection('booking')} 
                className="w-full text-center bg-orange-500 text-black py-6 font-black uppercase text-xl rounded-2xl shadow-xl shadow-orange-500/10"
              >
                Book Now
              </button>
              <div className="flex justify-center gap-8 pt-8">
                <a href="https://www.instagram.com/fuelledbylucie/" className="text-orange-500"><Instagram className="h-8 w-8" /></a>
                <a href="mailto:fuelledbylucie@gmail.com" className="text-orange-500"><Mail className="h-8 w-8" /></a>
              </div>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative flex items-center min-h-screen overflow-hidden bg-black pt-20">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-orange-600/10 rounded-full filter blur-[140px] animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-white/5 rounded-full filter blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-orange-500 text-[10px] font-black tracking-[0.3em] uppercase">
                <span className="flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_12px_#f97316]"></span>
                Nutrition for every ambition
              </div>
              <h1 className="text-[14vw] md:text-8xl xl:text-9xl font-black tracking-tighter text-white leading-[0.85] uppercase italic">
                Eat <br/>
                <span className="text-orange-500">For Your</span> <br/>
                Life.
              </h1>
              <p className="text-xl md:text-2xl text-stone-400 font-medium max-w-xl leading-relaxed">
                Whether you're training for a podium or just starting your fitness journey, I help you fuel with purpose and eat with confidence. <span className="text-white font-bold underline decoration-orange-500 underline-offset-4 decoration-2 italic">No judgment, just results.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <button 
                  onClick={() => scrollToSection('booking')}
                  className="group relative px-12 py-6 bg-orange-500 text-black rounded-full font-black text-lg uppercase tracking-widest overflow-hidden transition-all shadow-[0_20px_40px_rgba(249,115,22,0.3)] transform hover:-translate-y-1"
                >
                  <span className="relative z-10">Start My Journey</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
                <button 
                  onClick={() => scrollToSection('plans')}
                  className="px-12 py-6 bg-transparent text-white border-2 border-white/20 rounded-full font-black text-lg uppercase tracking-widest hover:border-orange-500 hover:text-orange-500 transition-all"
                >
                  See Services
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-orange-500 blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] border border-white/10 bg-stone-900">
                <img 
                  src="lucie_background.jpg" 
                  alt="Approachable Performance Nutrition" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                    <p className="font-black text-orange-500 uppercase tracking-widest text-[10px] mb-2 italic">My Promise</p>
                    <p className="text-white text-lg font-bold">"We'll build a plan that fits your life, not the other way around."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-stone-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20 lg:gap-32 items-center">
            <div className="relative order-2 md:order-1">
               <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] bg-stone-900 border border-white/5 relative group">
                  <img 
                    src="lucie_hyrox.png" 
                    alt="Lucie - Your Nutrition Partner" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800"; }}
                  />
                  <div className="absolute inset-0 border-[16px] border-orange-500/10 pointer-events-none rounded-[2.5rem]"></div>
               </div>
            </div>
            
            <div className="space-y-10 order-1 md:order-2">
              <div className="space-y-4">
                <h2 className="text-orange-500 font-black tracking-[0.4em] uppercase text-xs">Nice to meet you</h2>
                <h3 className="text-6xl md:text-7xl font-black text-white tracking-tighter uppercase italic">I'm Lucie.</h3>
              </div>
              <div className="space-y-8 text-xl text-stone-400 leading-relaxed font-medium">
                <p>
                  I'm a Sydney-based nutritionist who believes that everyone deserves to feel their best. You don't need to be a professional athlete to eat like one—you just need a plan that makes sense for your lifestyle.
                </p>
                <p>
                  I've spent <span className="text-white font-black decoration-orange-500 underline underline-offset-8 decoration-4">7+ years</span> helping people navigate the noise of the wellness industry. Whether you're trying to lose weight, gain muscle, or just have more energy for your kids, I'm here to simplify the science.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <Users className="h-5 w-5 text-orange-500" />
                    <span className="text-white font-bold uppercase tracking-widest text-[10px]">All Fitness Levels</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <Heart className="h-5 w-5 text-orange-500" />
                    <span className="text-white font-bold uppercase tracking-widest text-[10px]">Habit Building</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="plans" className="py-32 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-24">
            <h2 className="text-orange-500 font-black tracking-[0.4em] uppercase text-xs mb-4">How we can work together</h2>
            <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none">Simple. <br/><span className="text-orange-500">Effective.</span></h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Kickstart Audit */}
            <div className="bg-stone-900/40 p-12 rounded-[3rem] border border-white/5 hover:border-orange-500/40 transition-all group relative overflow-hidden">
              <Zap className="h-10 w-10 text-orange-500 mb-8" />
              <h4 className="text-3xl font-black text-white mb-4 uppercase italic">Kickstart Audit</h4>
              <p className="text-stone-400 mb-10 leading-relaxed font-medium">Perfect for beginners. We look at what you're eating now and find 3 simple changes to boost your results immediately.</p>
              <button onClick={() => scrollToSection('booking')} className="text-white font-black uppercase text-[10px] tracking-widest group-hover:text-orange-500 flex items-center gap-2">Learn More &rarr;</button>
            </div>

            {/* Total Transformation */}
            <div className="bg-orange-500 p-12 rounded-[3.5rem] text-black shadow-[0_30px_60px_-15px_rgba(249,115,22,0.4)] transform lg:-translate-y-12 relative z-10 flex flex-col justify-between">
              <div>
                <Activity className="h-12 w-12 mb-8 bg-black p-3 rounded-full text-orange-500" />
                <h4 className="text-4xl font-black mb-4 uppercase italic leading-none">Total <br/>Transformation</h4>
                <p className="text-black/90 mb-10 leading-relaxed font-bold text-lg">Our most popular plan. 12 weeks of support, custom meal ideas, and habit coaching to change how you fuel forever.</p>
              </div>
              <button onClick={() => scrollToSection('booking')} className="w-full py-6 bg-black text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-stone-900 transition-all active:scale-95 shadow-xl">Start Today</button>
            </div>

            {/* Peak Performance */}
            <div className="bg-stone-900/40 p-12 rounded-[3rem] border border-white/5 hover:border-orange-500/40 transition-all group relative overflow-hidden">
              <Trophy className="h-10 w-10 text-orange-500 mb-8" />
              <h4 className="text-3xl font-black text-white mb-4 uppercase italic">Peak Performance</h4>
              <p className="text-stone-400 mb-10 leading-relaxed font-medium">Ready for the next level? Advanced strategies for those training for events, comps, or specific weight goals.</p>
              <button onClick={() => scrollToSection('booking')} className="text-white font-black uppercase text-[10px] tracking-widest group-hover:text-orange-500 flex items-center gap-2">Learn More &rarr;</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-stone-950">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-orange-500 font-black tracking-[0.4em] uppercase text-xs mb-4">Got Questions?</h2>
            <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">Common Hesitations</h3>
          </div>
          <div className="bg-black/60 rounded-[3rem] p-8 md:p-16 border border-white/5 shadow-2xl">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-stone-500 font-bold uppercase tracking-widest text-[10px] mb-4">Still unsure?</p>
            <button onClick={() => scrollToSection('contact')} className="text-orange-500 font-black uppercase tracking-widest text-sm hover:text-white transition-colors underline underline-offset-8">Message me directly</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="booking" className="py-40 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-500/5 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-7xl md:text-9xl font-black text-white mb-10 leading-[0.85] tracking-tighter uppercase italic">
              Let's <span className="text-orange-500">Get</span> Started.
            </h2>
            <p className="text-2xl text-stone-400 mb-16 max-w-2xl mx-auto font-medium italic">
              Join me for a free 15-minute chat. No pressure, no sales pitch—just real talk about your health.
            </p>
            <a 
              href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0r8R3evcxUWpNlOdmjuJeXV-YSMNlFn9pIEKywdx0dZcwr9kUQML_70jCKK51Yc6rVy3WQzFVC?gv=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-12 md:px-20 py-8 bg-orange-500 text-black font-black text-xl md:text-3xl rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_30px_60px_-15px_rgba(249,115,22,0.5)] uppercase italic"
            >
              Book Your Free Call <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
            </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-stone-950 text-white pt-40 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 mb-32">
            <div className="space-y-16">
              <div className="flex items-center gap-3">
                <Flame className="h-12 w-12 text-orange-500 fill-orange-500" />
                <span className="font-black text-4xl tracking-tighter uppercase italic">Fuelled<span className="text-orange-500">By</span>Lucie</span>
              </div>
              <p className="text-stone-500 text-3xl font-medium leading-tight max-w-lg italic">
                Simple, science-backed nutrition for anyone ready to feel their best. <br/>
                <span className="text-white font-black not-italic underline decoration-orange-500 decoration-4">Sydney & Worldwide.</span>
              </p>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/fuelledbylucie/" target="_blank" className="p-6 rounded-3xl bg-stone-900 border border-white/5 hover:border-orange-500 transition-all group">
                    <Instagram className="h-8 w-8 group-hover:text-orange-500 group-hover:scale-110 transition-all" />
                </a>
                <a href="mailto:fuelledbylucie@gmail.com" className="p-6 rounded-3xl bg-stone-900 border border-white/5 hover:border-orange-500 transition-all group">
                    <Mail className="h-8 w-8 group-hover:text-orange-500 group-hover:scale-110 transition-all" />
                </a>
              </div>
            </div>
            
            <div className="bg-black p-8 md:p-14 rounded-[3.5rem] border border-white/5 shadow-2xl relative min-h-[550px] flex flex-col justify-center">
              {status === "SUCCESS" ? (
                <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
                  <div className="bg-orange-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto border border-orange-500/20">
                    <CheckCircle className="h-12 w-12 text-orange-500" />
                  </div>
                  <h3 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">Message Sent!</h3>
                  <p className="text-stone-400 text-xl font-medium">Thanks for reaching out. I'll get back to you personally within 24 hours.</p>
                  <button onClick={() => setStatus("IDLE")} className="text-orange-500 font-black uppercase text-[10px] tracking-widest pt-4 hover:text-white transition-colors">Send another</button>
                </div>
              ) : (
                <>
                  <h3 className="text-4xl font-black mb-10 uppercase italic tracking-tighter text-white leading-none">Ask a <br/>Question</h3>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-600 uppercase tracking-[0.3em] ml-2">Name</label>
                            <input required name="name" type="text" className="w-full bg-stone-900/50 border border-white/5 rounded-2xl p-5 text-white focus:border-orange-500 focus:bg-stone-900 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-600 uppercase tracking-[0.3em] ml-2">Email</label>
                            <input required name="email" type="email" className="w-full bg-stone-900/50 border border-white/5 rounded-2xl p-5 text-white focus:border-orange-500 focus:bg-stone-900 outline-none transition-all" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-600 uppercase tracking-[0.3em] ml-2">What's on your mind?</label>
                        <textarea required placeholder="Don't be shy!" name="message" rows="4" className="w-full bg-stone-900/50 border border-white/5 rounded-2xl p-5 text-white focus:border-orange-500 focus:bg-stone-900 outline-none resize-none transition-all"></textarea>
                    </div>
                    <button 
                      type="submit"
                      disabled={status === "SUBMITTING"}
                      className="w-full bg-orange-500 py-6 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-xl shadow-orange-500/10 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
                    >
                      {status === "SUBMITTING" ? "Processing..." : <>Send Message <Send className="h-4 w-4" /></>}
                    </button>
                    {status === "ERROR" && <p className="text-orange-500 text-[10px] mt-4 font-black uppercase tracking-widest text-center">Something went wrong. Please try again.</p>}
                  </form>
                </>
              )}
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black text-stone-700 uppercase tracking-[0.5em]">
            <p>&copy; {new Date().getFullYear()} Fuelled By Lucie.</p>
            <p className="italic text-stone-500">Fuel for life, not just for sport.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;