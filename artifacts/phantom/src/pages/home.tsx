import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hexagon, Plane, Wind, Sun, Sparkles, Brain, Infinity as InfinityIcon } from "lucide-react";
import phantomLogo from "@/assets/images/phantom-logo-transparent.png";
import phantomText from "@/assets/images/phantom-text-transparent.png";
import quantumCore from "@/assets/images/quantum-core.png";
import darkMatter from "@/assets/images/dark-matter-machinery.png";
import eventHorizon from "@/assets/images/event-horizon.png";
import cosmicGears from "@/assets/images/cosmic-gears.png";

function AnimatedLogo({ sizeClass = "w-72 h-72 md:w-[420px] md:h-[420px]" }: { sizeClass?: string }) {
  return (
    <div className={`relative ${sizeClass}`} style={{ isolation: "isolate" }}>
      <div className="absolute inset-0 rounded-full blur-[100px] bg-yellow-600/20 animate-pulse-slow pointer-events-none" />
      <div className="absolute inset-0 rounded-full blur-[40px] bg-purple-700/10 animate-pulse-slow pointer-events-none" />

      {/* Single layer: full logo rotates slowly — gear + black hole orbit */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <img
          src={phantomLogo}
          alt="PHANTOM Logo"
          className="w-full h-full object-contain select-none"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

/* ─── Starfield ──────────────────────────────────────────────────── */
const STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  size: Math.random() * 2.5 + 0.5,
  top: Math.random() * 100,
  left: Math.random() * 100,
  dur: Math.random() * 4 + 2,
  delay: Math.random() * 3,
}));

function Starfield() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {STARS.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            width: s.size,
            height: s.size,
            top: `${s.top}%`,
            left: `${s.left}%`,
          }}
          animate={{ opacity: [0.05, 0.7, 0.05], scale: [1, 1.6, 1] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────── */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14">
          <img src={phantomLogo} alt="" className="w-full h-full object-contain" draggable={false} />
        </div>
        <img src={phantomText} alt="PHANTOM" className="h-5 object-contain opacity-90" draggable={false} />
      </div>
      <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-[0.2em] text-muted-foreground">
        <a href="#story" className="hover:text-primary transition-colors uppercase">Origin</a>
        <a href="#machinery" className="hover:text-primary transition-colors uppercase">Architecture</a>
        <a href="#nexus" className="hover:text-primary transition-colors uppercase">Nexus</a>
        <a href="/physics-ai" className="hover:text-white transition-colors uppercase text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full hover:bg-purple-600/20">Physics AI</a>
      </div>
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background z-0" />
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(80,30,120,0.22) 0%, transparent 70%)",
      }} />
      <div className="absolute inset-0 bg-noise opacity-40 z-0 pointer-events-none mix-blend-overlay" />
      <Starfield />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto pt-24">
        <motion.div
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-14"
        >
          <AnimatedLogo />
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.6 }}
          className="mb-6"
        >
          <img src={phantomText} alt="PHANTOM" className="h-16 md:h-24 object-contain mx-auto drop-shadow-[0_0_40px_rgba(201,168,76,0.4)]" draggable={false} />
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-base md:text-xl text-muted-foreground max-w-xl uppercase tracking-[0.25em] leading-relaxed"
        >
          Deep space meets precision engineering.<br />Welcome to the event horizon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-[1px] h-20 bg-gradient-to-b from-primary via-primary/40 to-transparent mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Divider ────────────────────────────────────────────────────── */
function GearDivider() {
  return (
    <div className="flex items-center gap-4 py-2 opacity-20" aria-hidden>
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="relative w-7 h-7" style={{ isolation: "isolate" }}>
        <motion.img
          src={phantomLogo}
          alt=""
          className="w-full h-full object-contain"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          draggable={false}
        />
      </div>
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-primary to-transparent" />
    </div>
  );
}

/* ─── Story ──────────────────────────────────────────────────────── */
function Story() {
  return (
    <section id="story" className="relative py-36 bg-background border-t border-white/5 overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-secondary/15 blur-[60px] rounded-full" />
          <img
            src={quantumCore}
            alt="Quantum Core"
            className="w-full rounded-xl border border-white/8 relative z-10 shadow-2xl shadow-purple-900/20"
          />
          <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-sm px-4 py-2 border border-white/10">
            <div className="text-primary font-mono text-xs tracking-widest">UNIT 001 / QUANTUM CORE</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="text-primary font-mono text-xs tracking-[0.3em] mb-6 uppercase">Origin Protocol</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white uppercase leading-tight">
            THE ENGINE OF <span className="text-primary">INEVITABILITY</span>
          </h2>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              PHANTOM was born not from ambition, but from revelation. At the intersection of cosmic vastness and microscopic perfection, we discovered a new language of engineering.
            </p>
            <p>
              Every gear is forged in the fires of distant stars. Every mechanism calibrated to the heartbeat of a black hole. We do not just measure time — we shape it.
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

/* ─── Manifesto ──────────────────────────────────────────────────── */
function Manifesto() {
  return (
    <section className="relative py-40 bg-[#020204] border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-primary/10" />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-primary text-xs font-bold uppercase tracking-[0.4em] mb-10">The Doctrine</h2>
          <blockquote className="text-3xl md:text-5xl font-display text-white leading-tight uppercase font-medium">
            "WE DO NOT FEAR THE VOID.<br />WE BUILD THE GEARS THAT TURN IT."
          </blockquote>
          <div className="w-24 h-[1px] bg-secondary mx-auto mt-14" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Core Machinery ─────────────────────────────────────────────── */
function CoreMachinery() {
  return (
    <section id="machinery" className="relative py-36 bg-background border-t border-white/5 overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-yellow-600/5 blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="order-2 lg:order-1"
        >
          <div className="text-secondary font-mono text-xs tracking-[0.3em] mb-6 uppercase">Material Science</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white uppercase leading-tight">
            DARK MATTER <span className="text-secondary">FABRICATION</span>
          </h2>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              Traditional materials shatter under the pressures of temporal manipulation. We had to look into the abyss to find elements capable of sustaining the forces we command.
            </p>
            <p>
              Our proprietary dark matter alloys absorb kinetic shock and temporal friction, allowing the impossible to operate seamlessly within your domain.
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
          <div className="absolute -inset-4 bg-primary/10 blur-[60px] rounded-full" />
          <img
            src={darkMatter}
            alt="Dark Matter Machinery"
            className="w-full rounded-xl border border-white/8 relative z-10 shadow-2xl shadow-yellow-900/10"
          />
          <div className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-sm px-4 py-2 border border-white/10">
            <div className="text-secondary font-mono text-xs tracking-widest">ALLOY CLASS Ω</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Specifications ─────────────────────────────────────────────── */
function Specifications() {
  const specs = [
    { label: "01", title: "Singularity Core", desc: "Harnessing localized gravitational fields for infinite power retention." },
    { label: "02", title: "Void Forged", desc: "Materials tempered in the vacuum of deep space for absolute resilience." },
    { label: "03", title: "Temporal Sync", desc: "Quantum-locked movement that defies standard temporal decay." },
    { label: "04", title: "Dark Matter Shell", desc: "Impenetrable chassis absorbing all light and reflecting pure authority." },
    { label: "05", title: "Event Horizon Drive", desc: "A propulsion architecture drawing power from the edge of spacetime itself." },
    { label: "06", title: "Null Entropy Field", desc: "Sustained operation across conditions that would annihilate any competitor." },
  ];

  return (
    <section className="relative py-36 bg-[#020204] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="text-primary font-mono text-xs tracking-[0.4em] mb-6 uppercase">System Specs</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 uppercase">
            ARCHITECTURAL <span className="text-muted-foreground">PRECISION</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">Beyond mechanics. Approaching the divine.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((spec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/20 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t from-transparent via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="text-primary/50 font-mono text-xs mb-5 tracking-widest">{spec.label} // SPEC</div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{spec.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{spec.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Macro Showcase ─────────────────────────────────────────────── */
function MacroShowcase() {
  return (
    <section className="relative py-36 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="text-primary font-mono text-xs tracking-[0.4em] mb-4 uppercase">Visual Record</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase">
              MICROSCOPIC <span className="text-primary">UNIVERSES</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-xs">The intricate details of our mechanisms rival planetary systems.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 relative h-80 md:h-[560px] overflow-hidden border border-white/8 group"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700 z-10" />
            <img src={cosmicGears} alt="Cosmic Gears" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute bottom-6 left-6 z-20">
              <div className="text-primary font-mono text-xs mb-2 tracking-widest">FIG 1.0 / QUANTUM ESCAPEMENT</div>
              <GearDivider />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative h-80 md:h-[560px] border border-white/8 bg-[#05050A] p-8 flex flex-col justify-end"
          >
            <div className="absolute top-8 right-8 opacity-10">
              <motion.img
                src={phantomLogo}
                alt=""
                className="w-24 h-24 object-contain"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                draggable={false}
              />
            </div>
            <div className="text-secondary font-mono text-xs mb-3 tracking-widest">DATA STREAM / LIVE</div>
            <h3 className="text-white font-bold text-2xl uppercase mb-6">Oscillation Rates</h3>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between border-b border-white/8 pb-3">
                <span className="text-muted-foreground">Frequency</span>
                <span className="text-white">2.4 GHz</span>
              </div>
              <div className="flex justify-between border-b border-white/8 pb-3">
                <span className="text-muted-foreground">Variance</span>
                <span className="text-white">0.0000001%</span>
              </div>
              <div className="flex justify-between border-b border-white/8 pb-3">
                <span className="text-muted-foreground">Sync</span>
                <span className="text-white">Quantum</span>
              </div>
              <div className="flex justify-between pb-3">
                <span className="text-muted-foreground">State</span>
                <span className="text-primary animate-pulse">LOCKED</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Social Proof ───────────────────────────────────────────────── */
function SocialProof() {
  const quotes = [
    { text: "It doesn't just tell time. It dictates it. A masterclass in dark engineering.", entity: "Director, Sector 4" },
    { text: "We measured its gravitational pull. It is mathematically impossible, yet it sits on my wrist.", entity: "Lead Physicist, Orion Station" },
    { text: "The silence of the mechanism is deafening. True power does not need to roar.", entity: "The Architect" },
  ];

  return (
    <section className="relative py-36 bg-[#020204] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 uppercase">THE OBSERVERS</h2>
          <div className="w-16 h-[1px] bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((quote, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.18 }}
              className="p-10 border border-white/5 bg-white/[0.02] hover:border-white/10 transition-colors duration-500 relative group"
            >
              <div className="absolute top-6 left-6 text-primary/15 font-serif text-7xl leading-none select-none">"</div>
              <p className="text-muted-foreground italic mb-8 relative z-10 leading-relaxed">{quote.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-6 h-[1px] bg-primary/50" />
                <div className="text-white text-xs font-bold uppercase tracking-widest">{quote.entity}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── The Nexus ──────────────────────────────────────────────────── */
function TheNexus() {
  return (
    <section id="nexus" className="relative py-40 bg-background border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-25 z-0 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/3 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/8 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-primary font-mono text-xs tracking-[0.4em] mb-8 uppercase">Classified Access</div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 uppercase">ENTER THE NEXUS</h2>
          <p className="text-muted-foreground text-lg mb-14 max-w-xl mx-auto leading-relaxed">
            Only a select few are granted access to the internal mechanics of PHANTOM. Submit your identification to request an audience.
          </p>

          <form className="max-w-md mx-auto space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="IDENTIFICATION (EMAIL)"
              data-testid="input-nexus-email"
              className="w-full bg-black/60 border border-white/15 px-6 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-mono text-sm tracking-widest"
            />
            <button
              type="submit"
              data-testid="button-nexus-submit"
              className="w-full px-8 py-4 bg-white text-black font-bold tracking-[0.2em] uppercase hover:bg-primary hover:text-black transition-colors duration-400 font-mono text-sm"
            >
              Request Clearance
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Horizon ────────────────────────────────────────────────────── */
function Horizon() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center border-t border-white/5">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <img
          src={eventHorizon}
          alt="Event Horizon"
          className="w-full h-[130%] object-cover opacity-55 mix-blend-luminosity"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 z-10" />

      <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-10 uppercase leading-tight">
            CROSS THE<br />THRESHOLD
          </h2>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            data-testid="button-ascend"
            className="px-12 py-5 bg-transparent text-white font-bold tracking-[0.25em] uppercase border border-white/30 hover:border-primary hover:text-primary transition-all duration-500 font-mono text-sm"
          >
            Ascend
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#010102] border-t border-white/8 py-16 relative z-30">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14">
              <img src={phantomLogo} alt="" className="w-full h-full object-contain opacity-70" draggable={false} />
            </div>
            <img src={phantomText} alt="PHANTOM" className="h-5 object-contain opacity-70" draggable={false} />
          </div>
          <div className="text-muted-foreground/40 text-xs font-mono tracking-widest">
            THE VOID AWAITS.
          </div>
        </div>

        <div className="text-muted-foreground text-xs flex flex-wrap justify-center gap-8 font-mono tracking-[0.2em]">
          <a href="#" className="hover:text-primary transition-colors uppercase">Initiative</a>
          <a href="#" className="hover:text-primary transition-colors uppercase">Records</a>
          <a href="#" className="hover:text-primary transition-colors uppercase">Protocol</a>
          <a href="#" className="hover:text-primary transition-colors uppercase">Contact</a>
        </div>

        <div className="text-muted-foreground/30 text-xs font-mono tracking-widest">
          © {new Date().getFullYear()} PHANTOM ENTITY
        </div>
      </div>
    </footer>
  );
}

/* ─── Gravity Control ────────────────────────────────────────────── */
const GRAVITY_SHAPES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: Math.random() * 60 + 20,
  left: Math.random() * 80 + 10,
  top: Math.random() * 80 + 10,
  delay: Math.random() * 2,
  duration: Math.random() * 3 + 2,
  isCircle: Math.random() > 0.5,
}));

function GravityControl({ singularityMode }: { singularityMode: boolean }) {
  const [gravityOn, setGravityOn] = useState(true);
  const speedFactor = singularityMode ? 0.6 : 1;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 bg-[#020810]">
      {singularityMode && <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {GRAVITY_SHAPES.map((shape) => (
          <div
            key={shape.id}
            className={`absolute border border-[#0EA5E9]/30 bg-[#0EA5E9]/5 transition-all duration-[1500ms] ${shape.isCircle ? 'rounded-full' : 'rounded-md'}`}
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.left}%`,
              top: gravityOn ? `${shape.top}%` : '-20%',
              opacity: gravityOn ? 0.6 : 0,
              animation: gravityOn
                ? `float-shape ${shape.duration * speedFactor}s ease-in-out ${shape.delay}s infinite`
                : 'none',
            }}
          />
        ))}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#0EA5E9]/20 flex items-center justify-center z-0">
        <div
          className="w-[400px] h-[400px] rounded-full border border-[#0EA5E9]/30"
          style={{ animation: `pulse-ring ${4 * speedFactor}s ease-in-out infinite` }}
        />
        <div
          className="absolute w-[200px] h-[200px] rounded-full border border-[#0EA5E9]/50"
          style={{ animation: `pulse-ring ${3 * speedFactor}s ease-in-out 0.5s infinite` }}
        />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        <div className="font-mono text-xs tracking-[0.4em] mb-6 uppercase text-[#0EA5E9]">Sector 1</div>
        <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6 uppercase drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">
          GRAVITY CONTROL SYSTEMS
        </h2>
        <p className="text-[#38BDF8] text-xl max-w-2xl mx-auto tracking-widest uppercase mb-12">
          We don't fight gravity. We command it.
        </p>

        <button
          onClick={() => setGravityOn(!gravityOn)}
          className="px-8 py-4 border border-[#0EA5E9] text-[#0EA5E9] font-mono text-sm tracking-widest uppercase hover:bg-[#0EA5E9]/10 transition-colors backdrop-blur-sm mb-20"
        >
          {gravityOn ? "Disable Gravity Field" : "Enable Gravity Field"}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono border-t border-[#0EA5E9]/30 pt-12">
          <div>
            <div className="text-3xl font-bold text-white mb-2">9.8 m/s²</div>
            <div className="text-[#38BDF8]/60 text-xs tracking-widest">OVERRIDE</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">400km</div>
            <div className="text-[#38BDF8]/60 text-xs tracking-widest">ZERO-G RADIUS</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">∞</div>
            <div className="text-[#38BDF8]/60 text-xs tracking-widest">FIELD STRENGTH</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Gravity Aircraft ───────────────────────────────────────────── */
function GravityAircraft({ singularityMode }: { singularityMode: boolean }) {
  const speedFactor = singularityMode ? 0.6 : 1;

  return (
    <section className="relative min-h-screen py-32 bg-[#03010A] flex flex-col justify-center overflow-hidden border-t border-white/5">
      {singularityMode && <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Aircraft — CSS animation for smooth infinite travel */}
        <div
          className="absolute top-1/3 w-[600px] h-[100px] flex items-center"
          style={{ animation: `aircraft-glide ${25 * speedFactor}s linear infinite` }}
        >
          <div className="absolute -left-40 w-[300px] h-[40px] bg-gradient-to-r from-transparent to-[#7C3AED]/40 blur-xl rounded-full" />
          <div className="absolute -left-20 w-[200px] h-[20px] bg-gradient-to-r from-transparent to-[#A78BFA]/60 blur-md rounded-full" />
          <div className="relative w-[300px] h-[60px]">
            <div className="absolute inset-0 bg-black border border-[#7C3AED] rounded-[100%_20%_20%_100%] shadow-[0_0_30px_rgba(124,58,237,0.3)] overflow-hidden">
              <div className="absolute right-10 top-1/2 -translate-y-1/2 w-20 h-[2px] bg-[#A78BFA] opacity-50" />
            </div>
            <div className="absolute -bottom-2 left-20 w-32 h-4 bg-[#7C3AED]/20 blur-sm rounded-full" />
          </div>
        </div>
        {/* Second aircraft at different timing */}
        <div
          className="absolute top-2/3 w-[400px] h-[70px] flex items-center opacity-50"
          style={{ animation: `aircraft-glide ${18 * speedFactor}s linear ${8 * speedFactor}s infinite` }}
        >
          <div className="absolute -left-20 w-[150px] h-[25px] bg-gradient-to-r from-transparent to-[#7C3AED]/30 blur-lg rounded-full" />
          <div className="relative w-[200px] h-[40px]">
            <div className="absolute inset-0 bg-black border border-[#7C3AED]/60 rounded-[100%_20%_20%_100%] shadow-[0_0_20px_rgba(124,58,237,0.2)]" />
          </div>
        </div>
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-6 w-full">
        <div className="font-mono text-xs tracking-[0.4em] mb-6 uppercase text-[#A78BFA]">Sector 2</div>
        <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6 uppercase drop-shadow-[0_0_15px_rgba(124,58,237,0.4)]">
          GRAVITY-POWERED AIRCRAFT
        </h2>
        <p className="text-[#A78BFA]/80 text-xl max-w-2xl tracking-widest uppercase mb-32">
          No engines. No fuel. Pure gravity propulsion.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 border border-[#7C3AED]/30 bg-[#7C3AED]/5 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4 uppercase">ZERO FUEL CONSUMPTION</h3>
            <p className="text-[#A78BFA]/60 font-mono text-sm leading-relaxed">Gravity is the engine. The craft falls forward infinitely, generating thrust without combustion.</p>
          </div>
          <div className="p-8 border border-[#7C3AED]/30 bg-[#7C3AED]/5 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4 uppercase">TRANS-ATMOSPHERIC</h3>
            <p className="text-[#A78BFA]/60 font-mono text-sm leading-relaxed">From surface to orbit in 4 minutes. Ignores atmospheric friction via localized spacetime displacement.</p>
          </div>
          <div className="p-8 border border-[#7C3AED]/30 bg-[#7C3AED]/5 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4 uppercase">SILENT OPERATION</h3>
            <p className="text-[#A78BFA]/60 font-mono text-sm leading-relaxed">No combustion, no sound, no limit. Moves through the atmosphere without disturbing it.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Hover Mobility ─────────────────────────────────────────────── */
const BUILDINGS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  height: Math.random() * 40 + 20,
  width: Math.random() * 4 + 2,
  left: i * 5,
  opacity: Math.random() * 0.3 + 0.1,
}));

function HoverMobility({ singularityMode }: { singularityMode: boolean }) {
  const speedFactor = singularityMode ? 0.6 : 1;

  return (
    <section className="relative min-h-screen py-32 bg-[#010D10] flex items-center overflow-hidden border-t border-white/5">
      {singularityMode && <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />}
      
      {/* City Skyline — CSS transition on whileInView via motion */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none">
        {BUILDINGS.map(b => (
          <motion.div
            key={b.id}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: b.id * 0.04 }}
            className="absolute bottom-0 bg-[#06B6D4] origin-bottom"
            style={{ width: `${b.width}%`, left: `${b.left}%`, height: `${b.height}%`, opacity: b.opacity }}
          />
        ))}
      </div>

      {/* Air Highways */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] w-full h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/30 to-transparent" />
        <div className="absolute top-[50%] w-full h-[1px] bg-gradient-to-r from-transparent via-[#22D3EE]/20 to-transparent" />
        <div className="absolute top-[70%] w-full h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/30 to-transparent" />

        {/* Hover Cars — pure CSS travel animations */}
        <div
          className="absolute top-[29%] w-12 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_15px_#22D3EE]"
          style={{ animation: `travel-right ${12 * speedFactor}s linear infinite` }}
        />
        <div
          className="absolute top-[49%] w-16 h-2 rounded-full bg-[#06B6D4] shadow-[0_0_15px_#06B6D4]"
          style={{ animation: `travel-left ${18 * speedFactor}s linear infinite` }}
        />
        <div
          className="absolute top-[69%] w-10 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_15px_#22D3EE]"
          style={{ animation: `travel-right ${9 * speedFactor}s linear ${4 * speedFactor}s infinite` }}
        />
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-6 w-full">
        <div className="bg-black/40 border border-[#06B6D4]/30 p-10 max-w-2xl backdrop-blur-md">
          <div className="font-mono text-xs tracking-[0.4em] mb-4 uppercase text-[#22D3EE]">Sector 3</div>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white mb-4 uppercase drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            HOVER MOBILITY
          </h2>
          <p className="text-[#06B6D4] text-xl tracking-widest uppercase mb-10">
            The city is no longer flat.
          </p>
          
          <ul className="space-y-4 font-mono text-sm text-[#22D3EE]/80">
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 bg-[#22D3EE] rounded-full shadow-[0_0_8px_#22D3EE]" />
              Multi-tier Air Highways
            </li>
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 bg-[#22D3EE] rounded-full shadow-[0_0_8px_#22D3EE]" />
              Zero Emissions Architecture
            </li>
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 bg-[#22D3EE] rounded-full shadow-[0_0_8px_#22D3EE]" />
              Autonomous Grid Integration
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─── Solar Amplifier ────────────────────────────────────────────── */
function SolarAmplifier({ singularityMode }: { singularityMode: boolean }) {
  const speedFactor = singularityMode ? 0.6 : 1;

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 bg-[#08060A] overflow-hidden border-t border-white/5">
      {singularityMode && <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />}
      
      {/* Central Sun — pure CSS animations */}
      <div className="absolute top-1/2 left-1/2 pointer-events-none" style={{ transform: 'none' }}>
        {/* Glow halo */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.8)_0%,rgba(245,158,11,0)_70%)] blur-2xl"
          style={{ animation: `sun-pulse ${4 * speedFactor}s ease-in-out infinite` }}
        />
        {/* Sun core */}
        <div className="absolute w-[100px] h-[100px] rounded-full bg-[#F59E0B] shadow-[0_0_50px_#F59E0B]"
          style={{ transform: 'translate(-50%, -50%)' }} />
        
        {/* Panels arranged radially */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute origin-left"
            style={{ transform: `rotate(${i * 45}deg) translateX(180px) translateY(-10px)` }}
          >
            <div className="w-[120px] h-[20px] bg-black border border-[#FCD34D] rounded-sm relative overflow-hidden">
              <div
                className="absolute inset-0 bg-[#F59E0B]/30"
                style={{ animation: `panel-glow ${2 * speedFactor}s ease-in-out ${i * 0.2}s infinite` }}
              />
            </div>
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-[100px] bg-gradient-to-r from-[#FCD34D] to-transparent origin-left"
              style={{ animation: `beam-scale ${1.5 * speedFactor}s ease-in-out ${i * 0.2}s infinite` }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center mt-96">
        <div className="font-mono text-xs tracking-[0.4em] mb-4 uppercase text-[#FCD34D]">Sector 4</div>
        <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6 uppercase drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
          SOLAR CELL AMPLIFIER
        </h2>
        <p className="text-[#F59E0B]/80 text-xl tracking-widest uppercase mb-16">
          Energy, amplified beyond nature.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono border-t border-[#F59E0B]/30 pt-12 max-w-4xl mx-auto">
          <div>
            <div className="text-4xl font-bold text-white mb-2">847%</div>
            <div className="text-[#FCD34D]/60 text-xs tracking-widest">EFFICIENCY AMP</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">99.97%</div>
            <div className="text-[#FCD34D]/60 text-xs tracking-widest">PHOTON CAPTURE</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">4.7 TW</div>
            <div className="text-[#FCD34D]/60 text-xs tracking-widest">OUTPUT PER UNIT</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Cosmic Ray Condenser ───────────────────────────────────────── */
const COSMIC_RAYS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  angle: Math.random() * 360,
  delay: Math.random() * 2,
  duration: Math.random() * 1 + 0.8,
}));

const SPACE_STARS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
}));

function CosmicRayCondenser({ singularityMode }: { singularityMode: boolean }) {
  const speedFactor = singularityMode ? 0.6 : 1;

  return (
    <section className="relative min-h-screen py-32 bg-[#000005] flex items-center overflow-hidden border-t border-white/5">
      {singularityMode && <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />}
      
      {/* Deep space stars — static, precomputed positions */}
      <div className="absolute inset-0 pointer-events-none">
        {SPACE_STARS.map(s => (
          <div
            key={s.id}
            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-50"
            style={{ left: `${s.left}%`, top: `${s.top}%` }}
          />
        ))}
      </div>

      {/* Condenser Core & Rays — pure CSS */}
      <div className="absolute right-[20%] top-1/2 -translate-y-1/2 pointer-events-none w-[400px] h-[400px]">
        {COSMIC_RAYS.map(ray => (
          <div
            key={ray.id}
            className="absolute top-1/2 left-1/2 origin-left"
            style={{ transform: `rotate(${ray.angle}deg)` }}
          >
            <div
              className="w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[#C026D3] to-[#9333EA]"
              style={{ animation: `ray-flash ${ray.duration * speedFactor}s ease-out ${ray.delay}s infinite` }}
            />
          </div>
        ))}
        
        {/* Core glow */}
        <div
          className="absolute w-[150px] h-[150px] rounded-full bg-[radial-gradient(circle,rgba(192,38,211,1)_0%,rgba(147,51,234,0.5)_50%,rgba(0,0,0,0)_100%)] blur-md shadow-[0_0_80px_rgba(192,38,211,0.6)]"
          style={{ top: '50%', left: '50%', animation: `core-pulse ${2 * speedFactor}s ease-in-out infinite` }}
        />
        <div className="absolute inset-0 m-auto w-[50px] h-[50px] rounded-full bg-white shadow-[0_0_20px_#fff]" />
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <div className="font-mono text-xs tracking-[0.4em] mb-4 uppercase text-[#C026D3]">Sector 5</div>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6 uppercase drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">
            COSMIC RAY CONDENSER
          </h2>
          <p className="text-[#9333EA]/80 text-xl tracking-widest uppercase mb-16">
            We harvest power from the universe itself.
          </p>

          <div className="space-y-8 font-mono">
            <div className="border-l-2 border-[#C026D3] pl-6 py-2">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-[#C026D3]/60 text-xs tracking-widest">RADIATION CAPTURE</div>
            </div>
            <div className="border-l-2 border-[#C026D3] pl-6 py-2">
              <div className="text-3xl font-bold text-white mb-1">890 ZW</div>
              <div className="text-[#C026D3]/60 text-xs tracking-widest">DAILY ENERGY YIELD</div>
            </div>
            <div className="border-l-2 border-[#C026D3] pl-6 py-2">
              <div className="text-3xl font-bold text-white mb-1">4.2 L-Y</div>
              <div className="text-[#C026D3]/60 text-xs tracking-widest">OPERATIONAL DEPTH</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Quantum AI ─────────────────────────────────────────────────── */
const NODES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 2,
  dur: Math.random() * 1 + 1.5,
}));

const EQUATIONS = [
  { text: "∇²Ψ = 0", top: 20, left: 10, delay: 0 },
  { text: "E=mc²", top: 70, left: 20, delay: 1 },
  { text: "Σ∞", top: 40, left: 80, delay: 2 },
  { text: "∂/∂t", top: 80, left: 70, delay: 3 },
  { text: "ℏ", top: 30, left: 60, delay: 4 },
];

function QuantumAI({ singularityMode }: { singularityMode: boolean }) {
  const [metrics, setMetrics] = useState({ cpu: 99.9, coherence: 0.999 });
  const speedFactor = singularityMode ? 0.6 : 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: 99 + Math.random() * 0.9,
        coherence: 0.99 + Math.random() * 0.009,
      });
    }, Math.max(60, 100 * speedFactor));
    return () => clearInterval(interval);
  }, [speedFactor]);

  return (
    <section className="relative min-h-screen py-32 bg-[#010A08] flex items-center justify-center overflow-hidden border-t border-white/5">
      {singularityMode && <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />}
      
      {/* Neural Network SVG — static lines, no framer-motion */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        {NODES.map((node, i) => {
          const next = NODES[(i + 1) % NODES.length];
          return (
            <line
              key={i}
              x1={`${node.x}%`} y1={`${node.y}%`}
              x2={`${next.x}%`} y2={`${next.y}%`}
              stroke="#10B981" strokeWidth="1" opacity={0.4}
            />
          );
        })}
      </svg>

      {/* Nodes — pure CSS pulse */}
      <div className="absolute inset-0 pointer-events-none">
        {NODES.map(node => (
          <div
            key={node.id}
            className="absolute w-2 h-2 rounded-full bg-[#34D399] shadow-[0_0_10px_#10B981]"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              animation: `node-pulse ${node.dur * speedFactor}s ease-in-out ${node.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Floating Equations — pure CSS drift */}
      {EQUATIONS.map((eq) => (
        <div
          key={eq.text}
          className="absolute font-serif text-[#34D399]/40 text-4xl pointer-events-none"
          style={{
            top: `${eq.top}%`,
            left: `${eq.left}%`,
            animation: `eq-drift ${5 * speedFactor}s ease-in-out ${eq.delay}s infinite`,
          }}
        >
          {eq.text}
        </div>
      ))}

      {/* Panel */}
      <div className="absolute top-10 right-10 border border-[#10B981]/30 bg-black/80 p-4 font-mono text-xs text-[#34D399] backdrop-blur-sm z-20 w-64">
        <div className="border-b border-[#10B981]/30 pb-2 mb-2 flex justify-between">
          <span>Q-PROCESSOR</span>
          <span className="animate-pulse">ACTIVE</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>UTILIZATION</span>
          <span>{metrics.cpu.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between">
          <span>COHERENCE</span>
          <span>{metrics.coherence.toFixed(4)}</span>
        </div>
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-6 w-full text-center">
        <div className="font-mono text-xs tracking-[0.4em] mb-6 uppercase text-[#10B981]">Sector 6</div>
        <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6 uppercase drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          QUANTUM AI & PHYSICS ENGINE
        </h2>
        <p className="text-[#34D399]/80 text-xl max-w-2xl mx-auto tracking-widest uppercase mb-20">
          Intelligence that understands reality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 border border-[#10B981]/30 bg-black/60 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest">Quantum Coherence</h3>
          </div>
          <div className="p-8 border border-[#10B981]/30 bg-black/60 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest">Spacetime Modeling</h3>
          </div>
          <div className="p-8 border border-[#10B981]/30 bg-black/60 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest">Neural Physics Mesh</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function Home() {
  const [singularityMode, setSingularityMode] = useState(false);

  return (
    <main className="bg-background min-h-screen text-foreground font-sans selection:bg-primary/30 selection:text-white relative">
      <Navbar />
      <Hero />
      <Story />
      <Manifesto />
      <CoreMachinery />
      <Specifications />
      <MacroShowcase />
      <SocialProof />
      <TheNexus />
      <Horizon />
      
      {/* NEW SECTIONS */}
      <GravityControl singularityMode={singularityMode} />
      
      <div className="w-full h-[2px] bg-gradient-to-r from-[#0EA5E9] to-[#7C3AED] relative flex justify-center items-center z-30">
        <Hexagon className="absolute text-[#7C3AED] w-8 h-8 bg-[#020810] rounded-full p-1 border border-[#0EA5E9]/30" />
      </div>
      
      <GravityAircraft singularityMode={singularityMode} />
      
      <div className="w-full h-[2px] bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] relative flex justify-center items-center z-30">
        <Plane className="absolute text-[#06B6D4] w-8 h-8 bg-[#03010A] rounded-full p-1 border border-[#7C3AED]/30" />
      </div>

      <HoverMobility singularityMode={singularityMode} />
      
      <div className="w-full h-[2px] bg-gradient-to-r from-[#06B6D4] to-[#F59E0B] relative flex justify-center items-center z-30">
        <Wind className="absolute text-[#F59E0B] w-8 h-8 bg-[#010D10] rounded-full p-1 border border-[#06B6D4]/30" />
      </div>

      <SolarAmplifier singularityMode={singularityMode} />
      
      <div className="w-full h-[2px] bg-gradient-to-r from-[#F59E0B] to-[#9333EA] relative flex justify-center items-center z-30">
        <Sun className="absolute text-[#9333EA] w-8 h-8 bg-[#08060A] rounded-full p-1 border border-[#F59E0B]/30" />
      </div>

      <CosmicRayCondenser singularityMode={singularityMode} />
      
      <div className="w-full h-[2px] bg-gradient-to-r from-[#9333EA] to-[#10B981] relative flex justify-center items-center z-30">
        <Sparkles className="absolute text-[#10B981] w-8 h-8 bg-[#000005] rounded-full p-1 border border-[#9333EA]/30" />
      </div>

      <QuantumAI singularityMode={singularityMode} />

      <Footer />

      {/* SINGULARITY TOGGLE */}
      <button
        onClick={() => setSingularityMode(s => !s)}
        className={`fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300 ${
          singularityMode 
            ? 'bg-red-950/80 border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.6)]' 
            : 'bg-black/60 border-white/20 hover:border-white/50 backdrop-blur-md'
        }`}
      >
        <InfinityIcon className={`w-8 h-8 transition-colors duration-300 ${singularityMode ? 'text-red-500 animate-pulse' : 'text-white'}`} />
      </button>
    </main>
  );
}
