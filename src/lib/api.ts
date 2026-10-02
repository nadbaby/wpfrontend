// Central API config — reads from VITE_BACKEND_URL in production, falls back to localhost in dev
// Strip any trailing slash to prevent double-slash URLs like //api/auth/sign-in/email
const API_BASE = (import.meta.env.VITE_BACKEND_URL || "http://localhost:5000").replace(/\/$/, "");
export default API_BASE;
