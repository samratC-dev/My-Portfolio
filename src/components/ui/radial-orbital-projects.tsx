"use client";
import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface OrbitalProject {
  id: number;
  title: string;
  description: string;
  tags: string[];
  live?: string;
  code?: string;
  image?: string;
}

interface Props {
  projects: OrbitalProject[];
}

export default function RadialOrbitalProjects({ projects }: Props) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoRotate) return;
    const id = setInterval(() => {
      setRotation((r) => (r + 0.25) % 360);
    }, 50);
    return () => clearInterval(id);
  }, [autoRotate]);

  const toggle = (id: number) => {
    setExpandedId((prev) => {
      const next = prev === id ? null : id;
      setAutoRotate(next === null);
      if (next !== null) {
        const idx = projects.findIndex((p) => p.id === id);
        const target = (idx / projects.length) * 360;
        setRotation(270 - target);
      }
      return next;
    });
  };

  const handleBgClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedId(null);
      setAutoRotate(true);
    }
  };

  const isRelated = (id: number) => {
    if (expandedId === null) return false;
    const total = projects.length;
    const a = projects.findIndex((p) => p.id === expandedId);
    const b = projects.findIndex((p) => p.id === id);
    return Math.abs(a - b) === 1 || Math.abs(a - b) === total - 1;
  };

  const radius = 200;

  return (
    <div
      ref={containerRef}
      onClick={handleBgClick}
      className="relative h-[640px] w-full overflow-hidden"
    >
      <div
        ref={orbitRef}
        className="absolute left-1/2 top-1/2 h-px w-px -translate-x-1/2 -translate-y-1/2"
      >
        {/* center sun */}
        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white via-white/80 to-white/20 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
          <div className="absolute inset-2 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center">
            <Code className="h-7 w-7 text-white" />
          </div>
        </div>
        {/* orbit rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          style={{ width: radius * 2, height: radius * 2 }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
          style={{ width: radius * 2 + 60, height: radius * 2 + 60 }} />

        {projects.map((p, i) => {
          const angle = ((i / projects.length) * 360 + rotation) % 360;
          const rad = (angle * Math.PI) / 180;
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);
          const z = Math.round(100 + 50 * Math.cos(rad));
          const opacity = Math.max(0.5, 0.5 + 0.5 * ((1 + Math.sin(rad)) / 2));
          const expanded = expandedId === p.id;
          const related = isRelated(p.id);

          return (
            <div
              key={p.id}
              className="absolute left-1/2 top-1/2 transition-all duration-700"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                zIndex: expanded ? 300 : z,
                opacity: expanded ? 1 : opacity,
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(p.id);
                }}
                className={`relative grid h-14 w-14 place-items-center rounded-full border transition-all duration-300 ${
                  expanded
                    ? "scale-125 border-white bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                    : related
                      ? "border-white/60 bg-white/20 text-white"
                      : "border-white/20 bg-black/40 text-white/80 backdrop-blur-md hover:border-white/50"
                }`}
              >
                <span className="text-xs font-bold">0{p.id}</span>
                {!expanded && (
                  <span className="absolute inset-0 -z-10 animate-ping rounded-full border border-white/20" style={{ animationDuration: "3s" }} />
                )}
              </button>
              <div className={`pointer-events-none absolute left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-white/80 ${expanded ? "opacity-0" : ""}`}>
                {p.title}
              </div>

              {expanded && (
                <div
                  className="absolute left-1/2 top-20 w-80 -translate-x-1/2 rounded-xl border border-white/15 bg-black/80 p-5 text-left text-white shadow-2xl backdrop-blur-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {p.image && (
                    <img src={p.image} alt={p.title} loading="lazy" className="mb-3 h-32 w-full rounded-lg object-cover" />
                  )}
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-xs text-white/70">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <Badge key={t} variant="outline" className="border-white/20 text-[10px] text-white/70">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-white hover:text-white/70">
                        Live <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {p.code && (
                      <a href={p.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-white/80 hover:text-white">
                        <Github className="h-3 w-3" /> Code
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/40">
        Click a node to explore · click background to reset
      </p>
    </div>
  );
}
