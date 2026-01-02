import React, { useState } from 'react';
import { Instagram, Mail, ChevronRight, Activity, Zap, Trophy, Menu, X, CheckCircle, Shield, Target, Flame, Plus, Minus, Heart, Users, Send } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-orange-500 transition-colors"
      >
        <span className="text-lg md:text-xl font-bold tracking-tight pr-8">{question}</span>
        {isOpen ? <Minus className="h-5 w-5 text-orange-500" /> : <Plus className="h-5 w-5 text-stone-600" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-stone-400 leading-relaxed text-lg italic">
          {answer}
        </p>
      </div>
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State for form handling
  const [status, setStatus] = useState("IDLE"); // IDLE, SUBMITTING, SUCCESS, ERROR

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
        headers: {
          'Accept': 'application/json'
        }
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
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
              <Flame className="h-6 w-6 text-orange-500 fill-orange-500" />
              <span className="font-black text-2xl tracking-tighter text-white uppercase italic">Fuelled<span className="text-orange-500">By</span>Lucie</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-10">
              <button onClick={() => scrollToSection('about')} className="text-stone-400 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors">About</button>
              <button onClick={() => scrollToSection('plans')} className="text-stone-400 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors">Services</button>
              <button onClick={() => scrollToSection('faq')} className="text-stone-400 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors">FAQ</button>
              <a href="https://www.instagram.com/fuelledbylucie/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <button onClick={() => scrollToSection('booking')} className="bg-orange-500 text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white transition-all transform active:scale-95 shadow-lg shadow-orange-500/20">
                Book a Chat
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-orange-500 p-2">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-stone-900 border-t border-white/5 h-screen">
            <div className="px-6 pt-10 pb-6 space-y-6">
              <button onClick={() => scrollToSection('about')} className="block w-full text-left text-3xl font-black text-white uppercase tracking-tighter">About</button>
              <button onClick={() => scrollToSection('plans')} className="block w-full text-left text-3xl font-black text-white uppercase tracking-tighter">Services</button>
              <button onClick={() => scrollToSection('faq')} className="block w-full text-left text-3xl font-black text-white uppercase tracking-tighter">FAQ</button>
              <button onClick={() => scrollToSection('booking')} className="block w-full text-center bg-orange-500 text-black py-5 font-black uppercase text-xl rounded-2xl">Book Now</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 flex items-center min-h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-orange-600/10 rounded-full filter blur-[140px]"></div>
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-white/5 rounded-full filter blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-10 pb-20">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-500 text-xs font-black tracking-[.25em] uppercase">
                <span className="flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]"></span>
                Nutrition for every ambition
              </div>
              <h1 className="text-6xl md:text-8xl xl:text-9xl font-black tracking-tighter text-white leading-[0.85] uppercase italic">
                Eat <br/>
                <span className="text-orange-500">For Your</span> <br/>
                Life.
              </h1>
              <p className="text-xl md:text-2xl text-stone-400 font-medium max-w-xl leading-relaxed">
                Whether you're training for a podium or just starting your fitness journey, I help you fuel with purpose and eat with confidence. <span className="text-white font-bold underline decoration-orange-500">No judgment, just results.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <button 
                  onClick={() => scrollToSection('booking')}
                  className="px-12 py-6 bg-orange-500 text-black rounded-full font-black text-lg uppercase tracking-widest hover:bg-white transition-all shadow-[0_20px_40px_rgba(249,115,22,0.3)] transform hover:-translate-y-1"
                >
                  Start My Journey
                </button>
                <button 
                  onClick={() => scrollToSection('plans')}
                  className="px-12 py-6 bg-transparent text-white border-2 border-white/20 rounded-full font-black text-lg uppercase tracking-widest hover:border-orange-500 hover:text-orange-500 transition-all"
                >
                  See Services
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] group border border-white/10">
                <img 
                  src="lucka_background_ai_ornge(4).jpg" 
                  alt="Approachable Performance Nutrition" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                    <p className="font-black text-orange-500 uppercase tracking-widest text-sm mb-2">My Promise</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="relative">
               <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] bg-stone-900 border border-white/5 relative">
                  <img 
                    src="lucie_background.jpg" 
                    alt="Lucie - Your Nutrition Partner" 
                    className="w-full h-full object-cover"
                  />
               </div>
            </div>
            
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-orange-500 font-black tracking-[0.3em] uppercase text-xs">Nice to meet you</h2>
                <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">I'm Lucie.</h3>
              </div>
              <div className="space-y-8 text-xl text-stone-400 leading-relaxed font-medium">
                <p>
                  I'm a Sydney-based nutritionist who believes that everyone deserves to feel their best. You don't need to be a professional athlete to eat like one—you just need a plan that makes sense for your lifestyle.
                </p>
                <p>
                  I've spent <span className="text-white font-black underline decoration-orange-500 underline-offset-8">7+ years</span> helping people navigate the noise of the wellness industry. Whether you're trying to lose weight, gain muscle, or just have more energy for your kids, I'm here to simplify the science.
                </p>
                <div className="flex flex-wrap gap-8 pt-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-orange-500" />
                    <span className="text-white font-bold uppercase tracking-widest text-xs">All Fitness Levels</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-orange-500" />
                    <span className="text-white font-bold uppercase tracking-widest text-xs">Habit Building</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="plans" className="py-32 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
            <h2 className="text-orange-500 font-black tracking-[0.3em] uppercase text-xs mb-4">How we can work together</h2>
            <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic">Simple. Effective.</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-stone-900/40 p-12 rounded-[3rem] border border-white/5 hover:border-orange-500/30 transition-all group">
              <Zap className="h-10 w-10 text-orange-500 mb-8" />
              <h4 className="text-2xl font-black text-white mb-4 uppercase italic">Kickstart Audit</h4>
              <p className="text-stone-400 mb-10 leading-relaxed font-medium">Perfect for beginners. We look at what you're eating now and find 3 simple changes to boost your results immediately.</p>
              <button onClick={() => scrollToSection('booking')} className="text-white font-black uppercase text-xs tracking-widest group-hover:text-orange-500 transition-colors">Learn More &rarr;</button>
            </div>

            <div className="bg-orange-500 p-12 rounded-[3.5rem] text-black shadow-2xl transform md:-translate-y-12">
              <Activity className="h-10 w-10 mb-8" />
              <h4 className="text-3xl font-black mb-4 uppercase italic">Total Transformation</h4>
              <p className="text-black/80 mb-10 leading-relaxed font-bold text-lg">Our most popular plan. 12 weeks of support, custom meal ideas, and habit coaching to change how you fuel forever.</p>
              <button onClick={() => scrollToSection('booking')} className="w-full py-5 bg-black text-white font-black rounded-2xl uppercase tracking-widest hover:bg-white hover:text-black transition-all">Start Today</button>
            </div>

            <div className="bg-stone-900/40 p-12 rounded-[3rem] border border-white/5 hover:border-orange-500/30 transition-all group">
              <Trophy className="h-10 w-10 text-orange-500 mb-8" />
              <h4 className="text-2xl font-black text-white mb-4 uppercase italic">Peak Performance</h4>
              <p className="text-stone-400 mb-10 leading-relaxed font-medium">Ready for the next level? Advanced strategies for those training for events, comps, or specific weight goals.</p>
              <button onClick={() => scrollToSection('booking')} className="text-white font-black uppercase text-xs tracking-widest group-hover:text-orange-500 transition-colors">Learn More &rarr;</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-stone-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-orange-500 font-black tracking-[0.3em] uppercase text-xs mb-4">Got Questions?</h2>
            <h3 className="text-5xl font-black text-white tracking-tighter uppercase italic">Common Hesitations</h3>
          </div>
          <div className="bg-black/40 rounded-[2.5rem] p-8 md:p-12 border border-white/5">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <p className="text-center mt-12 text-stone-500 font-bold uppercase tracking-widest text-xs">
            Still unsure? <button onClick={() => scrollToSection('contact')} className="text-orange-500 hover:underline">Message me directly</button>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section id="booking" className="py-32 bg-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-6xl md:text-9xl font-black text-white mb-10 leading-none tracking-tighter uppercase italic">
              Let's <span className="text-orange-500">Get</span> Started.
            </h2>
            <p className="text-2xl text-stone-400 mb-14 max-w-2xl mx-auto font-medium">
              Join me for a free 15-minute chat. No pressure, no sales pitch—just real talk about your health.
            </p>
            <a 
              href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0r8R3evcxUWpNlOdmjuJeXV-YSMNlFn9pIEKywdx0dZcwr9kUQML_70jCKK51Yc6rVy3WQzFVC?gv=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-16 py-8 bg-orange-500 text-black font-black text-2xl rounded-full hover:scale-105 hover:bg-white transition-all shadow-2xl uppercase italic"
            >
              Book Your Free Call <ChevronRight className="w-8 h-8" />
            </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-stone-950 text-white pt-32 pb-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 mb-24">
            <div className="space-y-12">
              <div className="flex items-center gap-3">
                <Flame className="h-10 w-10 text-orange-500 fill-orange-500" />
                <span className="font-black text-4xl tracking-tighter uppercase italic">Fuelled<span className="text-orange-500">By</span>Lucie</span>
              </div>
              <p className="text-stone-500 text-2xl font-medium leading-relaxed">
                Simple, science-backed nutrition for anyone ready to feel their best. <br/>
                <span className="text-white font-black italic underline decoration-orange-500">Sydney & Worldwide.</span>
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/fuelledbylucie/" target="_blank" className="p-5 rounded-2xl bg-stone-900 border border-white/5 hover:border-orange-500 transition-all group">
                    <Instagram className="h-6 w-6 group-hover:text-orange-500" />
                </a>
                <a href="mailto:fuelledbylucie@gmail.com" className="p-5 rounded-2xl bg-stone-900 border border-white/5 hover:border-orange-500 transition-all group">
                    <Mail className="h-6 w-6 group-hover:text-orange-500" />
                </a>
              </div>
            </div>
            
            <div className="bg-black p-10 md:p-12 rounded-[3rem] border border-white/5 shadow-xl relative min-h-[500px] flex flex-col justify-center">
              {status === "SUCCESS" ? (
                <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
                  <div className="bg-orange-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 border border-orange-500/20">
                    <CheckCircle className="h-10 w-10 text-orange-500" />
                  </div>
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">Message Sent!</h3>
                  <p className="text-stone-400 text-lg font-medium">Thanks for reaching out. I'll get back to you personally within 24 hours.</p>
                  <button onClick={() => setStatus("IDLE")} className="text-orange-500 font-black uppercase text-[10px] tracking-widest mt-4 hover:underline">Send another</button>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-black mb-8 uppercase italic tracking-tighter text-white">Ask a Question</h3>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-[10px] font-black text-stone-500 uppercase tracking-widest ml-1">Name</label>
                            <input 
                              required
                              id="name"
                              name="name"
                              type="text" 
                              className="w-full bg-stone-950 border border-white/5 rounded-xl p-4 text-white focus:border-orange-500 outline-none transition-colors" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-[10px] font-black text-stone-500 uppercase tracking-widest ml-1">Email</label>
                            <input 
                              required
                              id="email"
                              name="email"
                              type="email" 
                              className="w-full bg-stone-950 border border-white/5 rounded-xl p-4 text-white focus:border-orange-500 outline-none transition-colors" 
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-[10px] font-black text-stone-500 uppercase tracking-widest ml-1">What's on your mind?</label>
                        <textarea 
                          required
                          id="message"
                          name="message"
                          rows="4" 
                          className="w-full bg-stone-950 border border-white/5 rounded-xl p-4 text-white focus:border-orange-500 outline-none resize-none transition-colors" 
                          placeholder="Don't be shy!"
                        ></textarea>
                    </div>
                    <button 
                      type="submit"
                      disabled={status === "SUBMITTING"}
                      className="w-full bg-orange-500 py-5 rounded-xl text-black font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-orange-500/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {status === "SUBMITTING" ? (
                        <>Processing...</>
                      ) : (
                        <>Send Message <Send className="h-4 w-4" /></>
                      )}
                    </button>
                    {status === "ERROR" && (
                        <p className="text-orange-500 text-[10px] mt-2 uppercase font-bold tracking-widest text-center">Something went wrong. Please try again.</p>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-stone-600 uppercase tracking-[0.4em]">
            <p>&copy; {new Date().getFullYear()} Fuelled By Lucie.</p>
            <p className="italic">Fuel for life, not just for sport.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;