import { useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useFingerprintStore } from '@/store/fingerprintStore';
const progressSteps = [
  { percent: 10, text: 'Analyzing browser attributes...' },
  { percent: 25, text: 'Inspecting canvas rendering...' },
  { percent: 40, text: 'Checking font metrics...' },
  { percent: 55, text: 'Querying WebGL capabilities...' },
  { percent: 70, text: 'Probing audio context...' },
  { percent: 85, text: 'Gathering device information...' },
  { percent: 95, text: 'Computing hash...' },
];
export function useFingerprint() {
  const setProgress = useFingerprintStore((state) => state.setProgress);
  const setComplete = useFingerprintStore((state) => state.setComplete);
  const setError = useFingerprintStore((state) => state.setError);
  const start = useFingerprintStore((state) => state.start);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const runFingerprinting = async () => {
      start();
      try {
        const fpPromise = FingerprintJS.load();
        let currentStep = 0;
        const progressInterval = setInterval(() => {
          if (currentStep < progressSteps.length) {
            const step = progressSteps[currentStep];
            setProgress(step.percent, step.text);
            currentStep++;
          } else {
            clearInterval(progressInterval);
          }
        }, 300);
        const fp = await fpPromise;
        const result = await fp.get();
        clearInterval(progressInterval);
        setComplete(result.visitorId, result.components);
      } catch (error) {
        console.error('Fingerprinting error:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred.');
      }
    };
    // Delay start to allow initial animation to be seen
    timeoutId = setTimeout(runFingerprinting, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}