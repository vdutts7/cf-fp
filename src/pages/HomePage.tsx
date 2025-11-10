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
  const chars = '0123456789ABCDEF';
  const columns = Array(50).fill(0);
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="flex justify-between">
        {columns.map((_, i) => (
          <div
            key={i}
            className="text-primary/20 font-mono text-xs"
            style={{
              animation: `matrix 15s linear infinite`,
              animationDelay: `${Math.random() * -15}s`,
            }}
          >
            {Array(50)
              .fill(0)
              .map((__, j) => (
                <div key={j}>{chars[Math.floor(Math.random() * chars.length)]}</div>
              ))}
          </div>
        ))}
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
            Scanning Your Digital Echo
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
      className="w-full"
    >
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-display text-foreground">
          Your Digital Fingerprint
        </h1>
        <div className="flex items-center justify-center gap-2 bg-secondary p-3 rounded-lg max-w-xl mx-auto">
          <p className="font-mono text-primary text-sm md:text-base break-all">{visitorId}</p>
          <Button variant="ghost" size="icon" onClick={handleCopy}>
            {isCopied ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Copy className="h-5 w-5 text-muted-foreground" />
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
      "flex items-center justify-center"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="py-8 md:py-10 lg:py-12">
          <AnimatePresence mode="wait">
            {status === 'loading' && <LoadingScreen />}
            {status === 'complete' && <ResultsDashboard />}
            {status === 'error' && <ErrorState />}
          </AnimatePresence>
        </div>
      </div>
      <footer className="border-t border-gray-200 py-10 mt-20">
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