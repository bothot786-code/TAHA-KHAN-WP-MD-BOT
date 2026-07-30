const config = require('../config');

// Ye contextInfo har reply mein "TAHA MD" newsletter tag lagata hai
const ctx = (extra = {}) => ({
  mentionedJid: extra.mentionedJid || [],
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: config.NEWSLETTER_JID,
    newsletterName: config.NEWSLETTER_NAME,
    serverMessageId: 1,
  },
  externalAdReply: {
    title: config.BOT_NAME,
    body: `ᴏᴡɴᴇʀ: ${config.OWNER_NAME}`,
    thumbnailUrl: config.BOT_IMAGE,
    sourceUrl: config.PAIR_SITE,
    mediaType: 1,
    renderLargerThumbnail: false,
    showAdAttribution: true,
  },
  ...extra.contextInfo,
});

const runtime = (s) => {
  s = Number(s);
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
  return `${d}d ${h}h ${m}m ${sec}s`;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = { ctx, runtime, sleep };
