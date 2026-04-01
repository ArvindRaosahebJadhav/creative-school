import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Resolve media URLs returned by the API.
export const getMediaUrl = (url?: string) => {
  if (!url) return url || '';
  // If already absolute, return as-is
  if (/^https?:\/\//i.test(url)) return url;

  const apiBase = import.meta.env.VITE_API_URL;
  const serverBase = apiBase.replace(/\/api\/?$/i, '');

  // If path starts with /uploads, prefix server base
  if (url.startsWith('/uploads') || url.startsWith('uploads')) {
    return `${serverBase}${url.startsWith('/') ? '' : '/'}${url}`;
  }

  // Fallback to returning the raw url
  return url;
};

// Extract a YouTube video ID from various URL formats or plain ID
export function extractYouTubeId(url?: string | null) {
  if (!url) return null;
  if (/^[A-Za-z0-9_-]{11}$/.test(url)) return url;
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    if (host === 'youtu.be') return u.pathname.replace(/^\//, '');
    if (host.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return v;
      const parts = u.pathname.split('/').filter(Boolean);
      const idx = parts.findIndex((p) => p === 'embed' || p === 'v');
      if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
    }
  } catch (e) {
    // not a full URL
  }
  const m = url.match(/([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}
