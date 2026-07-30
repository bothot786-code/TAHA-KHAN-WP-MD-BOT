const db = require('../lib/db');

const toggle = (key, label, emoji, scope) => ({
  name: key,
  category: 'settings',
  desc: `${label} on/off`,
  group: scope === 'group',
  admin: scope === 'group',
  async run({ m, text }) {
    const a = text.toLowerCase().trim();
    if (!['on', 'off'].includes(a)) {
      const cur = scope === 'group' ? db.getGroup(m.chat, key) : db.get(key);
      return m.reply(`${emoji} *${label}:* ${cur ? 'ON ✅' : 'OFF ❌'}\n\nUse: .${key} on  /  .${key} off`);
    }
    const v = a === 'on';
    scope === 'group' ? db.setGroup(m.chat, key, v) : db.set(key, v);
    return m.reply(`${emoji} *${label}* ab *${a.toUpperCase()}* hai.`);
  },
});

module.exports = [
  toggle('antilink', 'ANTILINK', '🔗', 'group'),
  toggle('welcome', 'WELCOME', '👋', 'group'),
  toggle('goodbye', 'GOODBYE', '🥲', 'group'),
  {
    name: 'mode', category: 'settings', owner: true, desc: 'public / private',
    async run({ m, text }) {
      const a = text.toLowerCase().trim();
      if (!['public', 'private'].includes(a))
        return m.reply(`⚙️ *MODE:* ${db.get('mode')}\n\nUse: .mode public / .mode private`);
      db.set('mode', a);
      return m.reply(`⚙️ Mode set to *${a.toUpperCase()}*`);
    },
  },
];
