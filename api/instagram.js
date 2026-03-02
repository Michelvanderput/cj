export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Instagram URL is required' });
  }

  if (!url.includes('instagram.com')) {
    return res.status(400).json({ error: 'Invalid Instagram URL' });
  }

  try {
    // Use Instagram's public oEmbed endpoint
    const oembedUrl = `https://api.instagram.com/oembed/?url=${encodeURIComponent(url)}`;
    
    console.log('Fetching Instagram data from:', oembedUrl);
    
    const response = await fetch(oembedUrl);
    
    console.log('Instagram API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Instagram API error:', errorText);
      return res.status(response.status).json({ 
        error: `Failed to fetch Instagram data (${response.status}). Make sure the post is public.`,
        details: errorText
      });
    }

    const data = await response.json();
    
    console.log('Instagram data received:', data);

    return res.status(200).json({
      title: data.title || '',
      imageUrl: data.thumbnail_url || '',
      authorName: data.author_name || '',
    });
  } catch (error) {
    console.error('Instagram fetch error:', error.message, error.stack);
    return res.status(500).json({ 
      error: 'Failed to fetch Instagram data',
      message: error.message
    });
  }
}
