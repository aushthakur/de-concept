// API configuration: supports both unified single-service deployments and separate frontend static hosting
const rawUrl = import.meta.env.VITE_API_URL || '';
export const API_BASE = rawUrl ? rawUrl.replace(/\/+$/, '') : '';
