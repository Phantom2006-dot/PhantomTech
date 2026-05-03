import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import phantomLogo from "@assets/1776452487526_1777802177377.png";
import quantumCore from "@/assets/images/quantum-core.png";
import celestialClockwork from "@/assets/images/celestial-clockwork.png";
import darkMatter from "@/assets/images/dark-matter-machinery.png";
import eventHorizon from "@/assets/images/event-horizon.png";
import cosmicGears from "@/assets/images/cosmic-gears.png";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/30 via-background to-background z-0" />
      <div className="absolute inset-0 bg-noise opacity-50 z-0 pointer-events-none mix-blend-overlay" />
      
      {/* Animated stars/particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
          <img 
            src={phantomLogo} 
            alt="PHANTOM Logo" 
            className="w-64 h-64 md:w-96 md:h-96 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(201,168,76,0.3)] animate-spin-slow"
          />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 text-gradient bg-gradient-to-r from-white via-muted-foreground to-primary uppercase"
        >
          MASTERY OVER TIME
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-2xl text-muted-foreground max-w-2xl uppercase tracking-widest"
        >
          Deep space meets precision engineering. Welcome to the event horizon.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 animate-bounce"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-primary to-transparent mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="relative py-32 bg-background border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-secondary/20 blur-[50px] rounded-full" />
          <img 
            src={quantumCore} 
            alt="Quantum Core" 
            className="w-full rounded-2xl border border-white/10 relative z-10 shadow-2xl shadow-primary/5"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white uppercase">THE ENGINE OF <span className="text-primary">INEVITABILITY</span></h2>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              PHANTOM was born not from ambition, but from revelation. At the intersection of cosmic vastness and microscopic perfection, we discovered a new language of engineering.
            </p>
            <p>
              Every gear is forged in the fires of distant stars. Every mechanism calibrated to the heartbeat of a black hole. We do not just measure time; we shape it.
            </p>
          </div>
          
          <div className="mt-12 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-primary" />
            <span className="text-primary uppercase tracking-widest text-sm font-bold">Discover the Architecture</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="relative py-32 bg-[#020204] border-t border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-8">The Doctrine</h2>
          <blockquote className="text-3xl md:text-5xl font-display text-white leading-tight uppercase font-medium">
            "WE DO NOT FEAR THE VOID. WE BUILD THE GEARS THAT TURN IT."
          </blockquote>
          <div className="w-24 h-[1px] bg-secondary mx-auto mt-12" />
        </motion.div>
      </div>
    </section>
  );
}

function CoreMachinery() {
  return (
    <section className="relative py-32 bg-background border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="order-2 lg:order-1"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white uppercase">DARK MATTER <span className="text-secondary">FABRICATION</span></h2>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              Traditional materials shatter under the pressures of temporal manipulation. We had to look into the abyss to find elements capable of sustaining the forces we command.
            </p>
            <p>
              Our proprietary dark matter alloys absorb kinetic shock and temporal friction, allowing the impossible to operate seamlessly on your wrist or within your domain.
            </p>
          </div>
          
          <div className="mt-12 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-secondary" />
            <span className="text-secondary uppercase tracking-widest text-sm font-bold">Explore Materials</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative order-1 lg:order-2"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full" />
          <img 
            src={darkMatter} 
            alt="Dark Matter Machinery" 
            className="w-full rounded-2xl border border-white/10 relative z-10 shadow-2xl shadow-secondary/10"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Specifications() {
  const specs = [
    { title: "Singularity Core", desc: "Harnessing localized gravitational fields for infinite power retention.", delay: 0.1 },
    { title: "Void Forged", desc: "Materials tempered in the vacuum of deep space for absolute resilience.", delay: 0.2 },
    { title: "Temporal Synchronization", desc: "Quantum-locked movement that defies standard temporal decay.", delay: 0.3 },
    { title: "Dark Matter Enclosure", desc: "Impenetrable chassis absorbing all light and reflecting pure authority.", delay: 0.4 }
  ];

  return (
    <section className="relative py-32 bg-[#020204]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 uppercase">ARCHITECTURAL <span className="text-muted-foreground">PRECISION</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Beyond mechanics. Approaching the divine.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {specs.map((spec, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: spec.delay }}
              className="p-8 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-primary font-mono text-sm mb-4">0{i+1} // SPEC</div>
              <h3 className="text-2xl font-bold text-white mb-4 uppercase">{spec.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{spec.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MacroShowcase() {
  return (
    <section className="relative py-32 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase">MICROSCOPIC <span className="text-primary">UNIVERSES</span></h2>
          <p className="text-muted-foreground mt-4 text-lg">The intricate details of our mechanisms rival planetary systems.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 relative h-96 md:h-[600px] rounded-2xl overflow-hidden border border-white/10 group"
          >
             <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
             <img src={cosmicGears} alt="Cosmic Gears" className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000" />
             <div className="absolute bottom-8 left-8 z-20">
               <div className="text-primary font-mono text-xs mb-2">FIG 1.0</div>
               <div className="text-white font-bold text-xl uppercase">Quantum Escapement</div>
             </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden border border-white/10 bg-[#05050A] p-8 flex flex-col justify-end"
          >
             <div className="text-secondary font-mono text-xs mb-2">DATA STREAM</div>
             <h3 className="text-white font-bold text-2xl uppercase mb-4">Oscillation Rates</h3>
             <div className="space-y-4">
               <div className="flex justify-between border-b border-white/10 pb-2">
                 <span className="text-muted-foreground">Frequency</span>
                 <span className="text-white font-mono">2.4 GHz</span>
               </div>
               <div className="flex justify-between border-b border-white/10 pb-2">
                 <span className="text-muted-foreground">Variance</span>
                 <span className="text-white font-mono">0.0000001%</span>
               </div>
               <div className="flex justify-between pb-2">
                 <span className="text-muted-foreground">State</span>
                 <span className="text-primary font-mono animate-pulse">LOCKED</span>
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="relative py-32 bg-[#020204] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 uppercase">THE OBSERVERS</h2>
          <div className="w-16 h-[1px] bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { text: "It doesn't just tell time. It dictates it. A masterclass in dark engineering.", entity: "Director, Sector 4" },
            { text: "We measured its gravitational pull. It is mathematically impossible, yet it sits on my wrist.", entity: "Lead Physicist, Orion Station" },
            { text: "The silence of the mechanism is deafening. True power does not need to roar.", entity: "The Architect" }
          ].map((quote, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 border border-white/5 bg-background relative"
            >
              <div className="text-primary text-4xl font-serif absolute top-4 left-4 opacity-20">"</div>
              <p className="text-muted-foreground italic mb-6 relative z-10">{quote.text}</p>
              <div className="text-white text-sm font-bold uppercase tracking-widest">{quote.entity}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TheNexus() {
  return (
    <section className="relative py-32 bg-background border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-30 z-0 pointer-events-none mix-blend-overlay" />
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
         <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
         >
           <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 uppercase">ENTER THE NEXUS</h2>
           <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto">
             Only a select few are granted access to the internal mechanics of PHANTOM. Submit your credentials to request an audience.
           </p>
           
           <form className="max-w-md mx-auto space-y-4" onSubmit={(e) => e.preventDefault()}>
             <input 
               type="email" 
               placeholder="IDENTIFICATION (EMAIL)" 
               className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-mono"
             />
             <button className="w-full px-8 py-4 bg-white text-black font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300">
               Request Clearance
             </button>
           </form>
         </motion.div>
      </div>
    </section>
  );
}

function Horizon() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center border-t border-white/5">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src={eventHorizon} 
          alt="Event Horizon" 
          className="w-full h-[120%] object-cover opacity-60 mix-blend-luminosity"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
      
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 uppercase">CROSS THE THRESHOLD</h2>
        <button className="px-10 py-5 bg-transparent text-white font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-500 rounded-none border border-white/30 hover:border-white relative overflow-hidden group">
          <span className="relative z-10">Ascend</span>
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#010102] border-t border-white/10 py-16 relative z-30">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <img src={phantomLogo} alt="PHANTOM" className="w-12 h-12 opacity-80" />
          <span className="font-bold text-2xl tracking-widest text-white">PHANTOM</span>
        </div>
        <div className="text-muted-foreground text-sm flex flex-wrap justify-center gap-8 font-mono">
          <a href="#" className="hover:text-primary transition-colors">INITIATIVE</a>
          <a href="#" className="hover:text-primary transition-colors">RECORDS</a>
          <a href="#" className="hover:text-primary transition-colors">PROTOCOL</a>
          <a href="#" className="hover:text-primary transition-colors">CONTACT</a>
        </div>
        <div className="text-muted-foreground/50 text-sm font-mono">
          © {new Date().getFullYear()} PHANTOM ENTITY. THE VOID AWAITS.
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground font-sans selection:bg-primary/30 selection:text-white">
      <Hero />
      <Story />
      <Manifesto />
      <CoreMachinery />
      <Specifications />
      <MacroShowcase />
      <SocialProof />
      <TheNexus />
      <Horizon />
      <Footer />
    </main>
  );
}
