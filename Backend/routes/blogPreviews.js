const express = require('express');
const auth = require('../middleware/auth');
const { getCachedBlogPreviews, warmBlogPreviewCache } = require('../services/blogPreviewCache');

const router = express.Router();

const normalizedLimit = (value) => {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 22;
  return Math.max(1, Math.min(parsed, 22));
};

// Never make a visitor wait for a third-party metadata fetch. Return the
// database snapshot immediately and refresh stale/missing records afterwards.
router.get('/', async (req, res) => {
  const limit = normalizedLimit(req.query.limit);

  try {
    const items = await getCachedBlogPreviews({ limit });
    res.set('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400');
    res.json({ items, cached: items.length, requested: limit });

    setImmediate(() => {
      warmBlogPreviewCache({ limit }).catch((error) => {
        console.warn('Blog preview cache warmup failed:', error.message);
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to read blog preview cache' });
  }
});

// Admin-only cache refresh for a new article or a deliberately updated cover.
router.post('/refresh', auth, async (req, res) => {
  const limit = normalizedLimit(req.body?.limit);
  const force = Boolean(req.body?.force);

  try {
    await warmBlogPreviewCache({ limit, force });
    const items = await getCachedBlogPreviews({ limit });
    res.json({ items, cached: items.length, requested: limit });
  } catch (error) {
    res.status(502).json({ message: 'Unable to refresh blog previews' });
  }
});

module.exports = router;
