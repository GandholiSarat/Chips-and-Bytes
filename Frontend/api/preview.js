/**
 * @file preview.js
 * @description
 * API route handler for fetching Open Graph metadata from a given URL.
 * Accepts a GET request with a 'url' query parameter.
 * Returns the page's title, description, image, and canonical URL.
 * 
 * Dependencies:
 * - open-graph-scraper: Used to fetch and parse Open Graph/Twitter metadata.
 * 
 * Example request:
 *   GET /api/preview?url=https://example.com
 * 
 * Example response:
 *   {
 *     "title": "Example Title",
 *     "description": "Example description.",
 *     "image": "https://example.com/image.png",
 *     "url": "https://example.com"
 *   }
 */

import ogs from 'open-graph-scraper';

/**
 * API Route Handler
 * 
 * Handles GET requests to fetch Open Graph metadata for a given URL.
 * 
 * @param {import('next').NextApiRequest} req - The HTTP request object.
 * @param {import('next').NextApiResponse} res - The HTTP response object.
 */
export default async function handler(req, res) {
  const { url } = req.query;

  // Validate that the URL parameter is provided
  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  const options = { url, timeout: 10000 };

  try {
    // Fetch Open Graph metadata using open-graph-scraper
    const { error, result } = await ogs(options);
    if (error) {
      return res.status(500).json({ error: 'Failed to fetch metadata' });
    }

    // Respond with relevant metadata fields
    res.status(200).json({
      title: result.ogTitle || result.twitterTitle || '',
      description: result.ogDescription || result.twitterDescription || '',
      image: result.ogImage?.url || '',
      url: result.requestUrl,
    });
  } catch (err) {
    // Handle unexpected errors
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
}
