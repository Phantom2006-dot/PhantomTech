import { motion, useScroll, useTransform } from "framer-motion";
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

/* ─── Page ───────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground font-sans selection:bg-primary/30 selection:text-white">
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
      <Footer />
    </main>
  );
}
