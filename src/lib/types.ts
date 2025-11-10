import type { Confidence, VisitorData } from '@fingerprintjs/fingerprintjs';
export type FingerprintData = VisitorData;
export type FingerprintConfidence = Confidence;
export type InfoCardData = {
  key: string;
  value: string | number | boolean | undefined;
}[];