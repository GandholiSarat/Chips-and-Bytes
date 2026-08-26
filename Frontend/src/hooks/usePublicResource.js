import { useEffect, useState } from 'react';

const CACHE_PREFIX = 'chips-and-bytes:public-resource:';
const DEFAULT_CACHE_TTL = 5 * 60 * 1000;

const readCachedValue = (cacheKey, maxAge) => {
  if (typeof window === 'undefined') return null;

  try {
    const cached = JSON.parse(window.localStorage.getItem(`${CACHE_PREFIX}${cacheKey}`));
    if (!cached || !Array.isArray(cached.value) || Date.now() - cached.savedAt > maxAge) {
      return null;
    }
    return cached.value;
  } catch {
    return null;
  }
};

const writeCachedValue = (cacheKey, value) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(
      `${CACHE_PREFIX}${cacheKey}`,
      JSON.stringify({ value, savedAt: Date.now() }),
    );
  } catch {
    // Storage is optional. The supplied fallback remains available.
  }
};

/**
 * Serves public API data with an immediate local fallback and background
 * revalidation. This avoids a blank section when a free-tier backend wakes.
 */
export const usePublicResource = ({ cacheKey, url, fallback = [], maxAge = DEFAULT_CACHE_TTL }) => {
  const [data, setData] = useState(() => readCachedValue(cacheKey, maxAge) || fallback);
  const [isRefreshing, setIsRefreshing] = useState(Boolean(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setIsRefreshing(false);
      return undefined;
    }

    const controller = new AbortController();
    let isActive = true;
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    const refresh = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

        const value = await response.json();
        if (!Array.isArray(value)) throw new Error('Expected an array response');
        if (!isActive) return;

        writeCachedValue(cacheKey, value);
        setData(value);
        setError(null);
      } catch (requestError) {
        if (isActive) setError(requestError);
      } finally {
        if (isActive) setIsRefreshing(false);
      }
    };

    refresh();

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [cacheKey, url]);

  return { data, isRefreshing, error };
};
