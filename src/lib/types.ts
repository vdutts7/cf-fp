import type { GetResult } from '@fingerprintjs/fingerprintjs';
export type FingerprintResult = GetResult;
export type FingerprintData = GetResult['components'];
export type InfoCardData = {
  key: string;
  value: string | number | boolean | undefined | null;
}[];