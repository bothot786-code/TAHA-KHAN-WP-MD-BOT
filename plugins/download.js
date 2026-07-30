const axios = require('axios');
const config = require('../config');
const { ctx } = require('../lib/functions');

// NOTE: Apna working downloader API yahan lagayein (env: DL_API)
const API = process.env.DL_API || '';

async function fetchMedia(url) {
  if (!API) throw new Error('DL_API set nahi hai (.env mein daalein)');
  const { data } = await axios.get(`${API}?url=${encodeURIComponent(url)}`, { timeout: 60000 });
  return data;
}

module.exports = {
  name: 'alldownload',
  alias: ['dl', 'download', 'ytmp4', 'tiktok', 'igdl', 'fbdl'],
  category: 'download',
  desc: 'YouTube / TikTok / Instagram / Facebook link download',
  async run({ sock, m, text }) {
    const url = text || m.quoted?.body;
    if (!/^https?:\/\//.test(url || ''))
      return m.reply(`📥 *ALL DOWNLOADER*\n\nUse: ${config.PREFIX}dl <link>\nSupported: YouTube, TikTok, Instagram, Facebook`);

    await m.reply('⏳ Download ho raha hai...');
    const r = await fetchMedia(url);
    const media = r?.url || r?.result?.url || r?.data?.url;
    if (!media) return m.reply('❌ Link se media nahi mila.');

    const isAudio = /\.mp3|audio/i.test(media);
    await sock.sendMessage(m.chat, isAudio
      ? { audio: { url: media }, mimetype: 'audio/mpeg' }
      : { video: { url: media }, caption: `✅ *Downloaded by ${config.BOT_NAME}*`, contextInfo: ctx({}) },
      { quoted: m });
  },
};
