const express = require('express');
const fs = require('fs');
const pino = require('pino');
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers } =
  require('@whiskeysockets/baileys');

const app = express();
app.use(express.static(__dirname));

app.get('/code', async (req, res) => {
  const num = String(req.query.number || '').replace(/\D/g, '');
  if (num.length < 10) return res.json({ error: 'Invalid number' });

  const dir = `./tmp/${Date.now()}`;
  const { state, saveCreds } = await useMultiFileAuthState(dir);
  let sent = false;

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    browser: Browsers.ubuntu('Chrome'),
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async ({ connection }) => {
    if (connection !== 'open') return;
    await delay(4000);
    const b64 = Buffer.from(fs.readFileSync(`${dir}/creds.json`)).toString('base64');
    const sid = 'TAHA~' + b64;
    // Session ID user ko usi ke apne WhatsApp par bhejo — server par store na karo
    await sock.sendMessage(sock.user.id, { text: sid });
    await sock.sendMessage(sock.user.id, {
      text: '☝️ Ye aap ka *SESSION_ID* hai.\nIse .env / panel variable mein daalein.\n\n⚠️ Kisi ke sath share na karein.\n\n— *TAHA MD*'
    });
    await delay(1500);
    await sock.ws.close();
    fs.rmSync(dir, { recursive: true, force: true }); // creds delete
  });

  try {
    await delay(2000);
    const code = await sock.requestPairingCode(num);
    sent = true;
    res.json({ code: code.match(/.{1,4}/g).join('-') });
  } catch (e) {
    if (!sent) res.json({ error: e.message });
  }
});

app.listen(process.env.PORT || 5000, () => console.log('Pair site running'));
