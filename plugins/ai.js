const axios = require('axios');
const db = require('../lib/db');

// Apna API endpoint/key .env mein rakhein
async function ask(prompt) {
  try {
    const { data } = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Tum TAHA MD ho, ek dost jaisa WhatsApp bot. Roman Urdu/English mein short jawab do.' },
          { role: 'user', content: prompt },
        ],
      },
      { headers: { Authorization: `Bearer ${process.env.AI_API_KEY}` }, timeout: 30000 }
    );
    return data.choices[0].message.content;
  } catch (e) {
    return null;
  }
}

module.exports = [
  {
    name: 'ai',
    alias: ['chatbot', 'gpt'],
    category: 'ai',
    desc: 'AI chatbot on/off ya sawal poochein',
    async run({ m, text }) {
      const arg = text.toLowerCase().trim();
      if (arg === 'on' || arg === 'off') {
        if (!m.isOwner) return m.reply('🚫 Sirf owner AI on/off kar sakta hai.');
        db.set('ai', arg === 'on');
        return m.reply(`🤖 *AI CHATBOT* ab *${arg.toUpperCase()}* hai.`);
      }
      if (!text) return m.reply(`🤖 *AI STATUS:* ${db.get('ai') ? 'ON ✅' : 'OFF ❌'}\n\nUse: .ai on / .ai off / .ai <sawal>`);
      await m.react('🤖');
      const r = await ask(text);
      return m.reply(r || '❌ AI se jawab nahi mila.');
    },
  },
];

module.exports.ask = ask;
