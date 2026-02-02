"use client";

import { useState, useEffect, useRef } from "react";
import {
  Loader2, Zap, Building2, TrendingUp, FileText, ExternalLink,
  AlertCircle, CheckCircle2, Globe, Code, Calculator, Sparkles,
  Crown, Shield, BarChart3, ArrowRight, Copy, Check
} from "lucide-react";

// ============================================
// GOLDEN PATH DATA - CLIENT SIDE FOR STATIC EXPORT
// ============================================
const GOLDEN_PATH_DATA: Record<string, PropertyData> = {
  // Milano Centro - Luxury
  "https://www.immobiliare.it/annunci/98765432/": {
    address: "Via Monte Napoleone 12, Milano Centro",
    price: 485000,
    mq: 85,
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  // Roma EUR - Investment
  "https://www.immobiliare.it/annunci/12345678/": {
    address: "Viale Europa 156, Roma EUR",
    price: 320000,
    mq: 110,
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  // Torino Crocetta - Starter
  "https://www.idealista.it/immobile/12345678/": {
    address: "Corso Re Umberto 45, Torino Crocetta",
    price: 195000,
    mq: 75,
    image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  },
};

// ============================================
// ANIMATED BACKGROUND COMPONENT
// ============================================
function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.7 ? "#f59e0b" : "#64748b",
      });
    }

    // Animation
    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient orbs
      const time = Date.now() * 0.001;

      // Gold orb
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.8 + Math.sin(time * 0.5) * 100,
        canvas.height * 0.2 + Math.cos(time * 0.3) * 50,
        0,
        canvas.width * 0.8,
        canvas.height * 0.2,
        400
      );
      gradient1.addColorStop(0, "rgba(245, 158, 11, 0.15)");
      gradient1.addColorStop(0.5, "rgba(245, 158, 11, 0.05)");
      gradient1.addColorStop(1, "transparent");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blue orb
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.2 + Math.cos(time * 0.4) * 80,
        canvas.height * 0.8 + Math.sin(time * 0.6) * 60,
        0,
        canvas.width * 0.2,
        canvas.height * 0.8,
        350
      );
      gradient2.addColorStop(0, "rgba(59, 130, 246, 0.1)");
      gradient2.addColorStop(0.5, "rgba(59, 130, 246, 0.03)");
      gradient2.addColorStop(1, "transparent");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Purple orb
      const gradient3 = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(time * 0.7) * 120,
        canvas.height * 0.5 + Math.cos(time * 0.5) * 80,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        300
      );
      gradient3.addColorStop(0, "rgba(139, 92, 246, 0.08)");
      gradient3.addColorStop(1, "transparent");
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((particle) => {
        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          particle.x -= dx * 0.01;
          particle.y -= dy * 0.01;
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(")", `, ${particle.opacity})`).replace("rgb", "rgba").replace("#f59e0b", "rgba(245, 158, 11").replace("#64748b", "rgba(100, 116, 139");
        ctx.fill();

        // Draw connections
        particles.forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(100, 116, 139, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ============================================
// FLOATING SHAPES COMPONENT
// ============================================
function FloatingShapes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Hexagons */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-yellow-500/10 rotate-45 animate-float-slow" />
      <div className="absolute top-40 right-20 w-16 h-16 border border-blue-500/10 rotate-12 animate-float-medium" />
      <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-purple-500/10 -rotate-12 animate-float-fast" />

      {/* Circles */}
      <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full border border-yellow-500/5 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full border border-slate-500/5 animate-float-slow" />

      {/* Lines */}
      <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent animate-slide-right" />
      <div className="absolute top-2/3 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-blue-500/10 to-transparent animate-slide-left" />

      {/* Dots grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-1/4 w-1 h-1 rounded-full bg-yellow-500/30 animate-twinkle" />
        <div className="absolute top-1/4 left-10 w-1 h-1 rounded-full bg-blue-500/30 animate-twinkle-delay" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-yellow-500/30 animate-twinkle" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-purple-500/30 animate-twinkle-delay" />
        <div className="absolute bottom-10 right-1/4 w-1 h-1 rounded-full bg-yellow-500/30 animate-twinkle" />
      </div>
    </div>
  );
}

// ============================================
// DEMO LINKS
// ============================================
const DEMO_LINKS = [
  {
    url: "https://www.immobiliare.it/annunci/98765432/",
    label: "Milano Centro",
    price: "€485.000",
    badge: "LUXURY",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    url: "https://www.immobiliare.it/annunci/12345678/",
    label: "Roma EUR",
    price: "€320.000",
    badge: "INVESTMENT",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    url: "https://www.idealista.it/immobile/12345678/",
    label: "Torino Crocetta",
    price: "€195.000",
    badge: "STARTER",
    gradient: "from-purple-500 to-pink-500",
  },
];

// Currency formatter
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Types
interface PropertyData {
  address: string;
  price: number;
  mq: number;
  image_url: string;
}

interface AnalyzeResult {
  success: boolean;
  source?: "live" | "verified" | "simulation";
  message?: string;
  error?: string;
  data?: PropertyData;
}

interface BusinessPlan {
  acquisition: number;
  notary: number;
  renovation: number;
  contingency: number;
  totalCost: number;
  resale: number;
  profit: number;
  roi: number;
}

// Loading steps
const LOADING_STEPS = [
  { icon: Globe, text: "Connessione al portale..." },
  { icon: Code, text: "Analisi dati immobile..." },
  { icon: Calculator, text: "Calcolo proiezioni ROI..." },
];

function calculateBusinessPlan(data: PropertyData): BusinessPlan {
  const acquisition = data.price;
  const notary = acquisition * 0.02;
  const renovation = data.mq * 600;
  const contingency = (acquisition + renovation) * 0.05;
  const totalCost = acquisition + notary + renovation + contingency;
  const resale = totalCost * 1.35;
  const profit = resale - totalCost;
  const roi = (profit / totalCost) * 100;

  return { acquisition, notary, renovation, contingency, totalCost, resale, profit, roi };
}

// Animated Number
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="tabular-nums">
      {prefix}{displayValue.toLocaleString("it-IT")}{suffix}
    </span>
  );
}

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [businessPlan, setBusinessPlan] = useState<BusinessPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      setLoadingStep(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, [loading]);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setUrl(link);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleAnalyze = async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError("Inserisci un URL valido");
      return;
    }

    setLoading(true);
    setLoadingStep(0);
    setResult(null);
    setBusinessPlan(null);
    setError(null);

    // SIMULATED API CALL (Client-Side)
    setTimeout(() => {
      const data = GOLDEN_PATH_DATA[trimmedUrl];

      if (data) {
        setResult({
          success: true,
          source: "verified",
          data: data
        });
        setBusinessPlan(calculateBusinessPlan(data));
      } else {
        // Validation logic
        try {
          const parsed = new URL(trimmedUrl);
          const allowedDomains = ["immobiliare.it", "idealista.it", "casa.it", "subito.it"];
          const isAllowedDomain = allowedDomains.some(domain => parsed.hostname.includes(domain));

          if (!isAllowedDomain) {
            setError(`Portale non supportato. Usa: ${allowedDomains.join(", ")}`);
          } else {
            setError("Questo link non è disponibile in modalità demo. Usa uno dei link demo predefiniti.");
          }
        } catch {
          setError("URL non valido");
        }
      }
      setLoading(false);
    }, 1500); // Simulated network delay
  };

  const CurrentStepIcon = LOADING_STEPS[loadingStep]?.icon || Loader2;

  return (
    <div className="min-h-screen text-slate-200 relative overflow-hidden bg-[#030712]">
      {/* Animated Canvas Background */}
      <AnimatedBackground />

      {/* Floating Decorative Shapes */}
      <FloatingShapes />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#030712]/50 to-[#030712] pointer-events-none" style={{ zIndex: 2 }} />

      {/* Header */}
      <header className="relative z-50 border-b border-white/5">
        <div className="backdrop-blur-xl bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-2 bg-yellow-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 p-2.5 rounded-xl shadow-lg shadow-yellow-500/20">
                  <Building2 className="w-7 h-7 text-slate-900" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight">
                  LEONE <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">GROUP</span>
                </span>
                <span className="text-slate-500 font-light ml-2">AI</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-xs text-slate-400">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 backdrop-blur-sm">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold text-yellow-500">PRO v2.0</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Hero */}
        <section className="text-center space-y-8 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            <span className="text-sm text-slate-400">Powered by Advanced AI</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
            Analisi Immobiliare
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Intelligente
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Incolla un link immobiliare e ottieni <strong className="text-white">proiezioni finanziarie</strong> istantanee
            con calcolo ROI professionale.
          </p>

          {/* Input */}
          <div className="max-w-3xl mx-auto relative group pt-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700 animate-pulse-slow" />
            <div className="relative backdrop-blur-xl bg-slate-900/50 rounded-2xl p-3 flex flex-col sm:flex-row gap-3 border border-white/10">
              <input
                type="text"
                value={url}
                onChange={(e) => { setUrl(e.target.value); setError(null); }}
                onKeyDown={(e) => e.key === "Enter" && !loading && handleAnalyze()}
                placeholder="Incolla link Immobiliare.it o Idealista..."
                className="w-full bg-slate-800/50 text-white px-6 py-5 rounded-xl outline-none placeholder-slate-500 focus:bg-slate-800/80 transition-all duration-300 text-lg border border-slate-700/30 focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
                disabled={loading}
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 disabled:opacity-70 disabled:cursor-not-allowed text-slate-900 font-bold px-10 py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 min-w-[200px] shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analisi...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>ANALIZZA</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Demo Links */}
          <div className="pt-8">
            <p className="text-sm text-slate-500 mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500/50" />
              Prova con un link demo:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {DEMO_LINKS.map((demo) => (
                <button
                  key={demo.url}
                  onClick={() => handleCopyLink(demo.url)}
                  className="group relative overflow-hidden flex items-center gap-4 px-5 py-4 rounded-xl bg-slate-800/20 hover:bg-slate-800/40 border border-slate-700/20 hover:border-slate-600/40 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${demo.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${demo.gradient}`} />
                  <div className="flex flex-col items-start">
                    <span className={`text-xs font-bold bg-gradient-to-r ${demo.gradient} bg-clip-text text-transparent`}>{demo.badge}</span>
                    <span className="text-sm text-slate-300 font-medium">{demo.label}</span>
                    <span className="text-xs text-slate-500">{demo.price}</span>
                  </div>
                  {copiedLink === demo.url ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <section className="text-center py-16 animate-fade-in-up">
            <div className="inline-flex flex-col items-center gap-8 backdrop-blur-xl bg-slate-900/30 rounded-3xl p-12 border border-white/10">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/30 rounded-full blur-2xl animate-pulse" />
                <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-2xl">
                  <CurrentStepIcon className="w-10 h-10 text-slate-900" />
                </div>
              </div>
              <div className="space-y-4">
                {LOADING_STEPS.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={index} className={`flex items-center gap-4 transition-all duration-500 ${index < loadingStep ? "text-green-400" : index === loadingStep ? "text-yellow-500" : "text-slate-600"}`}>
                      {index < loadingStep ? <CheckCircle2 className="w-6 h-6" /> : index === loadingStep ? <Loader2 className="w-6 h-6 animate-spin" /> : <div className="w-6 h-6 rounded-full border-2 border-slate-600" />}
                      <span className={`text-lg ${index <= loadingStep ? "font-medium" : ""}`}>{step.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Error */}
        {error && !loading && (
          <section className="animate-fade-in-up max-w-2xl mx-auto">
            <div className="backdrop-blur-xl bg-red-500/5 rounded-2xl p-8 border border-red-500/20">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-500/20">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-400 mb-2">Analisi non riuscita</h3>
                  <p className="text-slate-300 mb-4">{error}</p>
                  <p className="text-slate-500 text-sm">💡 Prova uno dei link demo qui sopra.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Results */}
        {result && result.data && businessPlan && !loading && (
          <section className="space-y-8 animate-fade-in-up">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Prezzo Acquisizione", value: businessPlan.acquisition, color: "text-white" },
                { label: "Investimento Totale", value: businessPlan.totalCost, color: "text-yellow-500" },
                { label: "Prezzo Vendita", value: businessPlan.resale, color: "text-blue-400" },
                { label: "Profitto Netto", value: businessPlan.profit, color: "text-green-400", prefix: "+" },
              ].map((stat, i) => (
                <div key={i} className="backdrop-blur-xl bg-slate-900/30 rounded-2xl p-6 text-center border border-white/5 hover:border-white/10 transition-all hover:scale-105 duration-300">
                  <p className="text-sm text-slate-500 mb-2">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.prefix}<AnimatedNumber value={stat.value} prefix="€" />
                  </p>
                </div>
              ))}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Property */}
              <div className="backdrop-blur-xl bg-slate-900/30 rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img src={result.data.image_url} alt="Property" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-green-500/20 text-green-400 border border-green-500/30">
                      ✓ VERIFICATO
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white">{result.data.address}</h2>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-slate-800/30 rounded-xl p-5">
                      <p className="text-sm text-slate-500 mb-1">Prezzo Richiesta</p>
                      <p className="text-3xl font-bold text-white">{formatCurrency(result.data.price)}</p>
                    </div>
                    <div className="bg-slate-800/30 rounded-xl p-5">
                      <p className="text-sm text-slate-500 mb-1">Superficie</p>
                      <p className="text-3xl font-bold text-white">{result.data.mq} <span className="text-lg font-normal text-slate-500">m²</span></p>
                    </div>
                  </div>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-slate-800/30 hover:bg-slate-700/30 text-slate-300 hover:text-white transition-all border border-slate-700/30">
                    <ExternalLink className="w-5 h-5" />
                    <span>Vedi Annuncio</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Financial */}
              <div className="backdrop-blur-xl bg-slate-900/30 rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-yellow-500/20">
                        <TrendingUp className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Proiezione Finanziaria</h2>
                        <p className="text-sm text-slate-500">Analisi investimento</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <BarChart3 className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-semibold text-yellow-500">PRO</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: "Costo acquisizione", value: businessPlan.acquisition },
                      { label: "Spese notarili (2%)", value: businessPlan.notary },
                      { label: "Ristrutturazione (€600/m²)", value: businessPlan.renovation },
                      { label: "Imprevisti (+5%)", value: businessPlan.contingency },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-slate-700/30">
                        <span className="text-slate-400">{item.label}</span>
                        <span className="font-mono text-white font-medium">{formatCurrency(item.value)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center py-4 mt-2">
                      <span className="text-lg font-bold text-white">INVESTIMENTO TOTALE</span>
                      <span className="text-2xl font-bold font-mono text-yellow-500">{formatCurrency(businessPlan.totalCost)}</span>
                    </div>
                  </div>

                  <div className="mt-8 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/30">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-400">Prezzo vendita (+35%)</span>
                      <span className="font-mono text-xl font-bold text-blue-400">{formatCurrency(businessPlan.resale)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xl font-bold text-white">PROFITTO NETTO</span>
                        <span className="ml-3 px-2 py-1 rounded-md bg-green-500/20 text-green-400 text-sm font-medium">ROI {businessPlan.roi.toFixed(1)}%</span>
                      </div>
                      <span className="text-3xl font-bold font-mono text-green-400">+{formatCurrency(businessPlan.profit)}</span>
                    </div>
                  </div>

                  <button className="mt-8 w-full py-5 rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-semibold transition-all flex items-center justify-center gap-3 border border-slate-600/30 group">
                    <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Genera Report PDF</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 border-t border-white/5">
        <div className="backdrop-blur-xl bg-slate-900/20 py-8">
          <p className="text-slate-500 text-sm">
            © 2024 <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent font-semibold">Leone Group Immobiliare</span>.
            Piattaforma di analisi AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
