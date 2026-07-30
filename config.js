const fs = require('fs');
if (fs.existsSync('.env')) require('dotenv').config();

const bool = (v, d = false) => (v == null || v === '' ? d : v === 'true');

module.exports = {
  SESSION_ID: (process.env.SESSION_ID || '').trim(),
  BOT_NAME: process.env.BOT_NAME || 'TAHA MD',
  OWNER_NAME: process.env.OWNER_NAME || 'TAHA',
  OWNER_NUMBER: (process.env.OWNER_NUMBER || '923474771404').replace(/\D/g, ''),
  PREFIX: process.env.PREFIX || '.',
  MODE: process.env.MODE || 'public',

  // Aap ka newsletter / channel
  NEWSLETTER_JID: '120363409838427367@newsletter',
  NEWSLETTER_NAME: 'TAHA MD',

  BOT_IMAGE: process.env.BOT_IMAGE || 'https://i.ibb.co/placeholder/taha-md.jpg',
  PAIR_SITE: process.env.PAIR_SITE || 'https://erfan-md.vercel.app',

  AI_CHAT: bool(process.env.AI_CHAT, false),
  ANTILINK: bool(process.env.ANTILINK, false),
  WELCOME: bool(process.env.WELCOME, false),
  GOODBYE: bool(process.env.GOODBYE, false),
  AUTO_READ: bool(process.env.AUTO_READ, true),
};
