import ogs from 'open-graph-scraper';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  const options = { url, timeout: 10000 };

  try {
    const { error, result } = await ogs(options);
    if (error) {
      return res.status(500).json({ error: 'Failed to fetch metadata' });
    }

    res.status(200).json({
      title: result.ogTitle || result.twitterTitle || '',
      description: result.ogDescription || result.twitterDescription || '',
      image: result.ogImage?.url || '',
      url: result.requestUrl,
    });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
}
