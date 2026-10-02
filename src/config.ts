// Central place for public (non-secret) runtime configuration.
// Values can be overridden at build time via VITE_* env vars on Vercel.
const rawApiUrl = (import.meta.env.VITE_API_URL as string | undefined) || "http://localhost:5000";
export const API_URL: string = rawApiUrl.replace(/\/+$/, "");

export const NEON_AUTH_URL: string =
  (import.meta.env.VITE_NEON_AUTH_URL as string | undefined) ||
  "https://ep-dawn-haze-b5is9vub.neonauth.c-7.us-east-2.aws.neon.tech/neondb/auth";
