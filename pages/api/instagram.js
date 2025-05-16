export default async function handler(req, res) {
  // 🔓 Cabeçalhos CORS para permitir chamadas do frontend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const TOKEN = process.env.TOKEN;
  const INSTAGRAM_ID = process.env.INSTAGRAM_ID;

  const fields = 'id,media_type,media_url,caption,permalink,timestamp';
  const url = `https://graph.facebook.com/v19.0/${INSTAGRAM_ID}/media?fields=${fields}&access_token=${TOKEN}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const filtered = data.data.map(item => ({
      id: item.id,
      type: item.media_type,
      image: item.media_url,
      caption: item.caption,
      permalink: item.permalink,
      timestamp: item.timestamp,
    }));

    res.status(200).json(filtered);
  } catch (err) {
    console.error("Erro ao buscar posts:", err);
    res.status(500).json({ error: 'Erro ao buscar posts do Instagram.' });
  }
}
