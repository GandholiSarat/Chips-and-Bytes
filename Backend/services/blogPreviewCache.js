const BlogPreview = require('../models/BlogPreview');
const blogSources = require('../data/blogSources');

const STALE_AFTER_MS = 7 * 24 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 9000;
const inFlight = new Map();

const isFresh = (preview) => preview?.refreshedAt
  && Date.now() - new Date(preview.refreshedAt).getTime() < STALE_AFTER_MS;

const fetchPreview = async (sourceUrl) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(sourceUrl)}`, {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Microlink returned ${response.status}`);

    const payload = await response.json();
    const data = payload?.data;
    if (!data?.title) throw new Error('Microlink returned no preview title');

    return {
      sourceUrl,
      title: data.title,
      description: data.description || '',
      author: data.author || '',
      date: data.date || null,
      image: data.image?.url || '',
      refreshedAt: new Date(),
    };
  } finally {
    clearTimeout(timeout);
  }
};

const refreshPreview = async (sourceUrl, { force = false } = {}) => {
  if (inFlight.has(sourceUrl)) return inFlight.get(sourceUrl);

  const task = (async () => {
    const existing = await BlogPreview.findOne({ sourceUrl }).lean();
    if (!force && isFresh(existing)) return existing;

    const preview = await fetchPreview(sourceUrl);
    return BlogPreview.findOneAndUpdate(
      { sourceUrl },
      preview,
      { new: true, upsert: true, setDefaultsOnInsert: true },
    ).lean();
  })().finally(() => inFlight.delete(sourceUrl));

  inFlight.set(sourceUrl, task);
  return task;
};

const withConcurrency = async (items, worker, concurrency = 3) => {
  const queue = [...items];
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length) {
      const item = queue.shift();
      try {
        await worker(item);
      } catch (error) {
        console.warn(`Unable to refresh blog preview: ${item}`, error.message);
      }
    }
  });
  await Promise.all(workers);
};

const warmBlogPreviewCache = async ({ limit = blogSources.length, force = false } = {}) => {
  const targets = blogSources.slice(0, Math.max(1, Math.min(Number(limit) || blogSources.length, blogSources.length)));
  await withConcurrency(targets, (sourceUrl) => refreshPreview(sourceUrl, { force }));
};

const getCachedBlogPreviews = async ({ limit = blogSources.length } = {}) => {
  const targetUrls = blogSources.slice(0, Math.max(1, Math.min(Number(limit) || blogSources.length, blogSources.length)));
  const cached = await BlogPreview.find({ sourceUrl: { $in: targetUrls } }).lean();
  const byUrl = new Map(cached.map((preview) => [preview.sourceUrl, preview]));

  return targetUrls
    .map((sourceUrl) => byUrl.get(sourceUrl))
    .filter(Boolean)
    .map(({ sourceUrl, title, description, author, date, image, refreshedAt }) => ({
      url: sourceUrl,
      title,
      description,
      author,
      date,
      image,
      refreshedAt,
    }));
};

module.exports = {
  getCachedBlogPreviews,
  warmBlogPreviewCache,
};
