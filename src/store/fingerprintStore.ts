import { create } from 'zustand';
import type { FingerprintData } from '@/lib/types';
type FingerprintState = {
  status: 'loading' | 'complete' | 'error';
  progress: number;
  progressText: string;
  visitorId: string | null;
  fingerprintData: FingerprintData | null;
  error: string | null;
  start: () => void;
  setProgress: (progress: number, text: string) => void;
  setComplete: (visitorId: string, data: FingerprintData) => void;
  setError: (error: string) => void;
};
export const useFingerprintStore = create<FingerprintState>((set) => ({
  status: 'loading',
  progress: 0,
  progressText: 'Initializing...',
  visitorId: null,
  fingerprintData: null,
  error: null,
  start: () => set({ status: 'loading', progress: 0, progressText: 'Initializing...', visitorId: null, fingerprintData: null, error: null }),
  setProgress: (progress, text) => set({ progress, progressText: text }),
  setComplete: (visitorId, fingerprintData) => set({ status: 'complete', progress: 100, visitorId, fingerprintData }),
  setError: (error) => set({ status: 'error', error, progress: 100 }),
}));