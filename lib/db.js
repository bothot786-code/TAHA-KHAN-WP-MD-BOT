const fs = require('fs');
const path = require('path');
const config = require('../config');

const FILE = path.join(__dirname, '..', 'data', 'settings.json');

function ensure() {
  const dir = path.dirname(FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify({
      ai: config.AI_CHAT,
      antilink: config.ANTILINK,
      welcome: config.WELCOME,
      goodbye: config.GOODBYE,
      mode: config.MODE,
      groups: {}
    }, null, 2));
  }
}

function read() { ensure(); try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function write(d) { ensure(); fs.writeFileSync(FILE, JSON.stringify(d, null, 2)); }

const get = (k) => read()[k];
const set = (k, v) => { const d = read(); d[k] = v; write(d); return v; };

// Per-group toggles: getGroup(jid, 'antilink')
function getGroup(jid, k) {
  const d = read();
  if (d.groups?.[jid] && k in d.groups[jid]) return d.groups[jid][k];
  return d[k];
}
function setGroup(jid, k, v) {
  const d = read();
  d.groups = d.groups || {};
  d.groups[jid] = d.groups[jid] || {};
  d.groups[jid][k] = v;
  write(d);
  return v;
}

module.exports = { get, set, getGroup, setGroup, read, write };
