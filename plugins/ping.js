// plugins/ping.js
module.exports = {
  name: 'ping',
  alias: ['speed', 'p'],
  category: 'main',
  desc: 'Bot ki speed check kare',
  async run({ m }) {
    const t = Date.now();
    await m.reply('🏓 Pinging...');
    await m.reply(`🏓 *Pong!* ${Date.now() - t} ms\n⚡ TAHA MD`);
  },
};
