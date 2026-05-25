import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  FileText,
  Twitter,
  MapPin,
  Code2,
  Database,
  Palette,
  Cloud,
  Cpu,
  Wrench,
  Send,
  Loader2,
} from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { Card } from "@/components/ui/card";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import RadialOrbitalProjects from "@/components/ui/radial-orbital-projects";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Samrat Chakraborty — Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Samrat Chakraborty — Web Developer building fast, accessible, and beautiful web apps.",
      },
      { property: "og:title", content: "Samrat Chakraborty — Portfolio" },
      {
        property: "og:description",
        content: "Web Developer building fast, accessible, and beautiful web apps.",
      },
    ],
  }),
  component: Index,
});

// =====================================================================
// EDIT YOUR CONTENT BELOW
// =====================================================================
const PROFILE = {
  name: "Samrat Chakraborty",
  role: "Web Developer",
  location: "Bengaluru, India",
  email: "samratchakraborty537@gmail.com",
  resumeUrl: "/resume.pdf",
  morphingWords: ["Developer", "Designer", "Builder", "Creator", "Engineer"],
  bio: `I build fast, accessible, and beautiful web apps. Currently focused on
React, TypeScript and Node.js. I love turning hard problems into
clean, joyful interfaces.`,
  socials: {
    github: "https://github.com/samratC-dev",
    linkedin: "https://www.linkedin.com/in/samrat-c-861015280/",
    twitter: "https://x.com/Samrattt0",
  },
};

const SKILLS = [
  { icon: Code2, name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { icon: Database, name: "Backend", items: ["Node.js", "Express", "MongoDB", "PostgreSQL"] },
  { icon: Palette, name: "Design", items: ["Figma", "UI/UX", "Design Systems"] },
  { icon: Cloud, name: "Cloud", items: ["AWS", "Vercel", "Render"] },
  { icon: Cpu, name: "Languages", items: ["JavaScript", "TypeScript", "Python"] },
  { icon: Wrench, name: "Tools", items: ["Git", "Docker", "Socket.io", "JWT"] },
];

const PROJECTS = [
  {
    id: 1,
    title: "Chill-Yap",
    description: "Real-time chat app with user auth, messaging, and online tracking — built for seamless conversations.",
    image: "/projects/chill-yap.png",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "JWT"],
    live: "https://chatapp-rhca.onrender.com/",
    code: "https://github.com/samratC-dev/Chill-Yap",
  },
  {
    id: 2,
    title: "MAI Bot",
    description: "AI-powered chatbot with streaming responses and LLM integration — your personal AI assistant.",
    image: "/projects/mai-bot.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "LLM API"],
    live: "https://mai-bot-nine.vercel.app/",
    code: "https://github.com/samratC-dev/MAI_BOT",
  },
  {
    id: 3,
    title: "Easy-Cure",
    description: "Doctor appointment booking system with 3-tier role-based auth for patients, doctors, and admins.",
    image: "/projects/easy-cure.png",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    live: "https://easy-cure-bl9hmfysf-samratc-devs-projects.vercel.app",
    code: "https://github.com/samratC-dev/Easy-Cure",
  },
  {
    id: 4,
    title: "WealthWise",
    description: "Personal finance app for tracking expenses, budgets, and wealth — your financial command center.",
    image: "/projects/wealth-wise.png",
    tags: ["React", "Vite", "JavaScript", "CSS"],
    live: "https://wealth-wise-one.vercel.app",
    code: "https://github.com/samratC-dev/WealthWise",
  },
];
// =====================================================================

function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const duration = 2600;
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(onDone, 250);
      }
    }, 30);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(120,119,198,0.35),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,100,150,0.25),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-10 left-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(100,200,255,0.25),transparent_60%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 20, letterSpacing: "0.5em" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-7xl"
      >
        {PROFILE.name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 mt-4 text-xs uppercase tracking-[0.4em] text-white/50 md:text-sm"
      >
        {PROFILE.role}
      </motion.p>
      <div className="relative z-10 mt-12 w-64 md:w-80">
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-white via-white to-white/60 transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.3em] text-white/40">
          <span>Loading</span>
          <span>{Math.floor(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
}

function Nav() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-2 py-2 backdrop-blur-xl">
      <ul className="flex items-center gap-1 text-sm text-white/80">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="rounded-full px-4 py-1.5 transition hover:bg-white/10 hover:text-white">
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-black transition hover:bg-white/90"
          >
            <FileText className="h-3.5 w-3.5" /> Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section id="about" className="relative min-h-screen w-full scroll-mt-24 overflow-hidden bg-black">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-8 px-6 pt-28 md:flex-row md:pt-20">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2 text-sm text-white/60"
          >
            <MapPin className="h-4 w-4" /> {PROFILE.location}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl"
          >
            {PROFILE.name}
          </motion.h1>
          <div className="mt-6 h-20">
            <GooeyText texts={PROFILE.morphingWords} className="h-20" textClassName="text-3xl md:text-5xl text-white" />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 max-w-lg text-base text-white/70 md:text-lg"
          >
            {PROFILE.bio}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <LiquidButton variant="dark" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View My Work <ExternalLink className="h-4 w-4" />
            </LiquidButton>
            <LiquidButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Get in Touch
            </LiquidButton>
          </motion.div>
        </div>
        <div className="relative h-[400px] w-full flex-1 md:h-[600px]">
          <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 bg-black py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold md:text-5xl"
        >
          Skills & Stack
        </motion.h2>
        <p className="mt-3 max-w-xl text-white/60">The tools and technologies I reach for when shipping production work.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              {/* ✅ FIX: bumped border, bg and text to full white for visibility */}
              <Card className="group h-full border-white/20 bg-white/5 p-6 transition hover:border-white/40 hover:bg-white/10">
                <s.icon className="h-7 w-7 text-white transition group-hover:scale-110" />
                <h3 className="mt-4 text-xl font-semibold text-white">{s.name}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 bg-black py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold md:text-5xl"
        >
          Selected Projects
        </motion.h2>
        <p className="mt-3 max-w-xl text-white/60">An orbit of recent work — tap a node to open details.</p>
      </div>
      <div className="mt-8">
        <RadialOrbitalProjects projects={PROJECTS} />
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  // ✅ FIX: replaced broken /api/contact with Web3Forms
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const formData = new FormData();
      formData.append("access_key", "2fbbd3e4-8b46-4e53-af92-0ee5be10e43d");
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);
      formData.append("subject", `New message from ${form.name} — Portfolio`);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to send");
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl text-left">
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/50">Name</label>
        <Input
          required
          maxLength={100}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border-white/10 bg-black/40 text-white placeholder:text-white/30"
          placeholder="Jane Doe"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/50">Email</label>
        <Input
          required
          type="email"
          maxLength={255}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border-white/10 bg-black/40 text-white placeholder:text-white/30"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/50">Message</label>
        <Textarea
          required
          maxLength={2000}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="min-h-[140px] border-white/10 bg-black/40 text-white placeholder:text-white/30"
          placeholder="Tell me about your project…"
        />
      </div>
      <LiquidButton variant="dark" type="submit" disabled={status === "sending"} className="w-full">
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send Message
          </>
        )}
      </LiquidButton>
      {status === "ok" && <p className="text-sm text-emerald-400">Thanks — your message is on its way.</p>}
      {status === "error" && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-black py-24 text-white">
      <Spotlight className="left-1/2 top-0 -translate-x-1/2" fill="white" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl"
          >
            Let's build something together.
          </motion.h2>
          <p className="mt-5 text-white/60">
            I'm open to opportunities, collaborations, and a good cup of coffee.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LiquidButton variant="dark" onClick={() => (window.location.href = `mailto:${PROFILE.email}`)}>
              <Mail className="h-4 w-4" /> {PROFILE.email}
            </LiquidButton>
            <LiquidButton onClick={() => window.open(PROFILE.resumeUrl, "_blank")}>
              <FileText className="h-4 w-4" /> Resume
            </LiquidButton>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full border border-white/10 p-3 text-white/70 transition hover:border-white/30 hover:text-white">
              <Github className="h-5 w-5" />
            </a>
            <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-white/10 p-3 text-white/70 transition hover:border-white/30 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={PROFILE.socials.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="rounded-full border border-white/10 p-3 text-white/70 transition hover:border-white/30 hover:text-white">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
      <p className="mt-16 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {PROFILE.name}. Built with React & Tailwind.
      </p>
    </section>
  );
}

function Index() {
  const [loading, setLoading] = useState(true);
  return (
    <main className="min-h-screen bg-black text-white">
      {loading && <Loader onDone={() => setLoading(false)} />}
      {!loading && (
        <>
          <Nav />
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        </>
      )}
    </main>
  );
}