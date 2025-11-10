import React, { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Copy,
  Check,
  ServerCrash,
  User,
  Monitor,
  Palette,
  Cpu,
  Globe,
  Fingerprint,
  Database,
  Puzzle,
  Type,
  BadgeCheck,
  Github,
} from 'lucide-react';
import { useFingerprint } from '@/hooks/useFingerprint';
import { useFingerprintStore } from '@/store/fingerprintStore';
import { FingerprintIcon } from '@/components/FingerprintIcon';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';
import { InfoCard } from '@/components/InfoCard';
import { cn } from '@/lib/utils';
const MatrixBackground = React.memo(() => {
  const chars = '01';
  const columns = Array(40).fill(0);
  return (
    <div className="absolute inset-0 overflow-hidden z-0 opacity-20">
      <div className="flex justify-between">
        {columns.map((_, i) => {
          const isAccent = Math.random() > 0.85;
          return (
            <div
              key={i}
              className="font-mono text-xs"
              style={{
                color: isAccent ? '#f38020' : '#64748b',
                animation: `matrix ${15 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * -20}s`,
              }}
            >
              {Array(50)
                .fill(0)
                .map((__, j) => (
                  <div key={j} className="leading-relaxed">
                    {chars[Math.floor(Math.random() * chars.length)]}
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
});
function LoadingScreen() {
  const progress = useFingerprintStore((s) => s.progress);
  const progressText = useFingerprintStore((s) => s.progressText);
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col items-center justify-center space-y-6 relative"
    >
      <MatrixBackground />
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6 text-center">
        <FingerprintIcon className="w-20 h-20 text-primary" />
        <div className="space-y-2">
          <h1 className="text-3xl font-display text-foreground">
            Scanning Your Digital Fingerprint
          </h1>
          <p className="text-muted-foreground">
            Analyzing browser and device characteristics...
          </p>
        </div>
        <div className="w-64 space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-primary font-mono h-4">{progressText}</p>
        </div>
      </div>
    </motion.div>
  );
}
function ResultsDashboard() {
  const visitorId = useFingerprintStore((s) => s.visitorId);
  const fingerprintData = useFingerprintStore((s) => s.fingerprintData);
  const [isCopied, setIsCopied] = React.useState(false);
  const [glitch, setGlitch] = React.useState(false);
  const [visitCount, setVisitCount] = React.useState(1);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  React.useEffect(() => {
    if (visitorId) {
      const key = `fp_visit_${visitorId}`;
      const stored = localStorage.getItem(key);
      const count = stored ? parseInt(stored) + 1 : 1;
      setVisitCount(count);
      localStorage.setItem(key, count.toString());
    }
  }, [visitorId]);
  
  const uniquenessScore = React.useMemo(() => {
    if (!fingerprintData) return 0;
    const dataPoints = Object.keys(fingerprintData).length;
    return Math.min(99.99, 85 + (dataPoints / 50) * 14);
  }, [fingerprintData]);
  
  const handleCopy = () => {
    if (visitorId) {
      navigator.clipboard.writeText(visitorId);
      setIsCopied(true);
      toast.success('Fingerprint hash copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    }
  };
  const cardData = useMemo(() => {
    if (!fingerprintData) return [];
    const {
      ip,
      ipLocation,
      confidence,
      userAgent,
      platform,
      screenResolution,
      colorDepth,
      deviceMemory,
      hardwareConcurrency,
      timezone,
      languages,
      canvas,
      webgl,
      fonts,
      plugins,
      sessionStorage,
      localStorage,
      indexedDB,
      openDatabase,
      cookiesEnabled,
    } = fingerprintData;
    const cards = [];
    if (confidence) {
      cards.push({
        title: 'Status',
        icon: <BadgeCheck className="h-5 w-5 text-muted-foreground" />,
        data: [
          { key: 'Confidence Score', value: confidence.score },
          { key: 'Comment', value: confidence.comment },
        ],
      });
    }
    if (ip && ipLocation) {
        cards.push({
            title: 'Connection Info',
            icon: <Globe className="h-5 w-5 text-muted-foreground" />,
            data: [
                { key: 'IP Address', value: ip.value },
                { key: 'City', value: ipLocation.value?.city?.name },
                { key: 'Country', value: ipLocation.value?.country?.name },
                { key: 'Timezone', value: ipLocation.value?.timezone },
            ],
        });
    }
    cards.push({
      title: 'Basic Information',
      icon: <User className="h-5 w-5 text-muted-foreground" />,
      data: [
        { key: 'User Agent', value: userAgent?.value },
        { key: 'Platform', value: platform?.value },
      ],
    });
    cards.push({
      title: 'Display',
      icon: <Monitor className="h-5 w-5 text-muted-foreground" />,
      data: [
        { key: 'Resolution', value: screenResolution?.value ? `${screenResolution.value[0]}x${screenResolution.value[1]}` : 'N/A' },
        { key: 'Color Depth', value: colorDepth?.value ? `${colorDepth.value} bit` : 'N/A' },
      ],
    });
    cards.push({
      title: 'Hardware',
      icon: <Cpu className="h-5 w-5 text-muted-foreground" />,
      data: [
        { key: 'CPU Cores', value: hardwareConcurrency?.value ?? 'N/A' },
        { key: 'Device Memory', value: deviceMemory?.value ? `${deviceMemory.value} GB` : 'N/A' },
      ],
    });
    cards.push({
      title: 'Localization',
      icon: <Globe className="h-5 w-5 text-muted-foreground" />,
      data: [
        { key: 'Timezone', value: timezone?.value },
        { key: 'Languages', value: languages?.value?.join(', ') },
      ],
    });
    if (canvas) {
      cards.push({
        title: 'Canvas Fingerprint',
        icon: <Palette className="h-5 w-5 text-muted-foreground" />,
        data: [
          { key: 'Geometry Hash', value: canvas.value?.geometry?.substring(0, 40) + '...' },
          { key: 'Text Hash', value: canvas.value?.text?.substring(0, 40) + '...' },
        ],
      });
    }
    if (webgl) {
      cards.push({
        title: 'WebGL Information',
        icon: <Fingerprint className="h-5 w-5 text-muted-foreground" />,
        data: [
          { key: 'Vendor', value: webgl.value?.vendor },
          { key: 'Renderer', value: webgl.value?.renderer },
          { key: 'Version', value: webgl.value?.version },
        ],
      });
    }
    if (fonts) {
      cards.push({
        title: 'Fonts',
        icon: <Type className="h-5 w-5 text-muted-foreground" />,
        data: [
          { key: 'Detected Fonts', value: fonts.value?.length },
          { key: 'First 5 Fonts', value: fonts.value?.slice(0, 5).join(', ') + '...' },
        ],
      });
    }
    if (plugins) {
      cards.push({
        title: 'Browser Plugins',
        icon: <Puzzle className="h-5 w-5 text-muted-foreground" />,
        data: [
          { key: 'Plugin Count', value: plugins.value?.length },
          { key: 'Plugins', value: plugins.value?.map(p => p.name).join(', ') },
        ],
      });
    }
    cards.push({
      title: 'Storage',
      icon: <Database className="h-5 w-5 text-muted-foreground" />,
      data: [
        { key: 'Cookies Enabled', value: String(cookiesEnabled?.value) },
        { key: 'Local Storage', value: String(localStorage?.value) },
        { key: 'Session Storage', value: String(sessionStorage?.value) },
        { key: 'IndexedDB', value: String(indexedDB?.value) },
        { key: 'Open Database', value: String(openDatabase?.value) },
      ],
    });
    return cards;
  }, [fingerprintData]);
  if (!visitorId || !fingerprintData) return null;
  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full relative"
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
      }} />
      
      <div className="text-center space-y-6 mb-12 relative">
        <div className="flex items-center justify-center gap-3">
          <Fingerprint className="h-12 w-12 text-primary animate-pulse" />
          <h1 className={cn(
            "text-4xl md:text-5xl font-display text-foreground tracking-tight",
            glitch && "animate-pulse"
          )} style={glitch ? {
            textShadow: '2px 0 #f38020, -2px 0 #0ff',
            transform: 'translate(2px, 0)'
          } : {}}>
            <span className="text-primary">&gt;</span> Your Digital Fingerprint
          </h1>
        </div>
        
        {/* Stats Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
          <div className="bg-black/40 border border-primary/20 px-4 py-2 rounded backdrop-blur-sm">
            <span className="text-muted-foreground">UNIQUENESS:</span>{' '}
            <span className="text-primary font-bold">{uniquenessScore.toFixed(2)}%</span>
          </div>
          <div className="bg-black/40 border border-primary/20 px-4 py-2 rounded backdrop-blur-sm">
            <span className="text-muted-foreground">VISIT #{visitCount}</span>
          </div>
          <div className="bg-black/40 border border-primary/20 px-4 py-2 rounded backdrop-blur-sm">
            <span className="text-muted-foreground">1 in</span>{' '}
            <span className="text-primary font-bold">{Math.floor(Math.pow(10, 12)).toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 bg-black/40 border border-primary/20 p-4 rounded font-mono max-w-xl mx-auto backdrop-blur-sm">
          <span className="text-primary text-xs">0x</span>
          <p className="text-primary text-sm md:text-base break-all tracking-wider">{visitorId}</p>
          <Button variant="ghost" size="icon" onClick={handleCopy} className="hover:bg-primary/10">
            {isCopied ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Copy className="h-5 w-5 text-primary" />
            )}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <InfoCard key={card.title} {...card} />
        ))}
      </div>
    </motion.div>
  );
}
function ErrorState() {
    const error = useFingerprintStore((s) => s.error);
    return (
        <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4 text-destructive"
        >
            <ServerCrash className="h-16 w-16 mx-auto" />
            <h2 className="text-2xl font-display">Scan Failed</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't generate your digital fingerprint. This might be due to strict privacy settings or a browser extension blocking the scan.
            </p>
            <p className="font-mono text-xs bg-secondary p-2 rounded">{error}</p>
        </motion.div>
    );
}
export function HomePage() {
  useFingerprint();
  const status = useFingerprintStore((s) => s.status);
  return (
    <div className={cn(
      "min-h-screen w-full bg-background text-foreground transition-colors duration-500",
      "flex flex-col relative"
    )}>
      {/* Cloudflare Logo */}
      <div className="absolute top-4 left-4 z-50">
        <img src="/cf.svg" alt="Cloudflare" className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="py-8 md:py-10 lg:py-12">
            <AnimatePresence mode="wait">
              {status === 'loading' && <LoadingScreen />}
              {status === 'complete' && <ResultsDashboard />}
              {status === 'error' && <ErrorState />}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <footer className="border-t border-border/40 py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center gap-5">
            {/* Social Links */}
            <div className="flex items-center gap-2">
              <button
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all active:scale-95"
                onClick={() => window.open('https://github.com/vdutts7', '_blank')}
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </button>
              <button
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all active:scale-95"
                onClick={() => window.open('https://x.com/vdutts7', '_blank')}
                aria-label="X (Twitter)"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
      <Toaster richColors theme="dark" />
    </div>
  );
}