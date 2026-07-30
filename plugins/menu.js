const config = require('../config');
const db = require('../lib/db');
const { runtime, ctx } = require('../lib/functions');
const os = require('os');

module.exports = {
  name: 'menu',
  alias: ['help', 'list', 'allmenu'],
  category: 'main',
  desc: 'Saari commands',
  async run({ sock, m, commands, text }) {
    const cats = {};
    for (const c of commands) (cats[c.category || 'other'] ??= []).push(c.name);

    let body =
`╭━━━〔 *${config.BOT_NAME}* 〕━━━┈⊷
┃ 👤 User    : ${m.pushName}
┃ 👑 Owner   : ${config.OWNER_NAME}
┃ 🔣 Prefix  : ${config.PREFIX}
┃ ⚙️ Mode    : ${db.get('mode')}
┃ 📦 Cmds    : ${commands.length}
┃ ⏱️ Uptime  : ${runtime(process.uptime())}
┃ 💾 RAM     : ${(os.totalmem()/1e9).toFixed(1)} GB
┃ 🤖 AI      : ${db.get('ai') ? 'ON' : 'OFF'}
╰━━━━━━━━━━━━━━━━┈⊷\n`;

    for (const [cat, list] of Object.entries(cats).sort()) {
      body += `\n╭──〔 *${cat.toUpperCase()}* 〕\n`;
      body += list.sort().map(n => `│ ◈ ${config.PREFIX}${n}`).join('\n');
      body += `\n╰────────────┈⊷\n`;
    }
    body += `\n> *POWERED BY TAHA MD*`;

    await sock.sendMessage(m.chat, {
      image: { url: config.BOT_IMAGE },
      caption: body,
      contextInfo: ctx({}),
    }, { quoted: m });
  },
};
