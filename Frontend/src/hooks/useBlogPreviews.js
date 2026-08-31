import { useEffect, useMemo, useState } from 'react';
import { blogPreviewSeed } from '../data/blogPreviewSeed';
import { blogPosts } from '../data/blogPosts';

const CACHE_KEY = 'chips-and-bytes:blog-previews:v2';
const CACHE_TTL = 24 * 60 * 60 * 1000;

const makeIndex = (items) => new Map(items.map((item) => [item.url, item]));

const mergePreviews = (posts, remote = []) => {
  const seeded = makeIndex(blogPreviewSeed);
  const refreshed = makeIndex(remote);

  return posts.map((post) => ({
    ...seeded.get(post.url),
    ...refreshed.get(post.url),
    ...post,
    id: post.id || post.sourceId,
    url: post.url,
    category: post.category,
    accent: post.accent,
  }));
};

const readBrowserCache = () => {
  if (typeof window === 'undefined') return null;

  try {
    const saved = JSON.parse(window.localStorage.getItem(CACHE_KEY));
    if (!saved || !Array.isArray(saved.items) || Date.now() - saved.savedAt > CACHE_TTL) return null;
    return saved.items;
  } catch {
    return null;
  }
};

const writeBrowserCache = (items) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), items }));
  } catch {
    // Local persistence is an optimization. The bundled seed remains available.
  }
};

/**
 * Shows original Medium cover cards immediately from a verified seed, then
 * quietly reconciles them with the server's persistent preview cache.
 */
export const useBlogPreviews = ({ limit } = {}) => {
  const [previews, setPreviews] = useState(() => readBrowserCache() || []);
  const items = useMemo(() => mergePreviews(blogPosts, previews), [previews]);
  const [isRefreshing, setIsRefreshing] = useState(Boolean(process.env.REACT_APP_BACKEND_URL));

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL?.replace(/\/$/, '');
    if (!backendUrl) {
      setIsRefreshing(false);
      return undefined;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    const params = new URLSearchParams();
    if (limit) params.set('limit', String(limit));

    fetch(`${backendUrl}/api/blog-previews?${params.toString()}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('Preview cache unavailable'))))
      .then((payload) => {
        const refreshed = Array.isArray(payload?.items) ? payload.items : [];
        if (refreshed.length) {
          writeBrowserCache(refreshed);
          setPreviews(refreshed);
        }
      })
      .catch(() => {
        // The cards stay useful from the verified bundled snapshot.
      })
      .finally(() => setIsRefreshing(false));

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [limit]);

  return {
    items: limit ? items.slice(0, limit) : items,
    isRefreshing,
  };
};
