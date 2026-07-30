const shayari = [
  "Dil ki baat labon par laa kar,\nMain kya karta, tum hi bata do.\nJo tum ho, wahi mera sab kuch,\nBaqi duniya ko bhula do.",
  "Chandni raat mein tera zikr aaya,\nDil ne kaha yehi mohabbat hai.\nHum ne poocha kya hai yeh ehsaas,\nDhadkan ne kaha yeh qismat hai.",
  "Rota hoon magar aankhon se nahi,\nDard chhupata hoon lekin hoshon se nahi.\nDuniya samajhti hai main khush hoon,\nMagar khushi mili mujhe barson se nahi.",
  "Mohabbat mein jeet ya haar nahi hoti,\nSirf ehsaas ki deewar nahi hoti.\nJo dil se apna keh de ek baar,\nUs se phir koi takraar nahi hoti.",
  "Tere naam se shuru hoti hai subah meri,\nTere zikr par khatam hoti hai raat meri.\nTu jaan le ya na jaane ae dost,\nTu hi hai sab se pyari baat meri.",
];

const sad = [
  "Kuch log zindagi mein sirf sabaq banne aate hain,\nyaad nahi.",
  "Tanhai bhi ajeeb cheez hai,\nsaath rehti hai magar baat nahi karti.",
  "Wo bhi mera tha, ye bhi meri thi,\nkismat hi meri thi jo meri nahi thi.",
];

const love = [
  "Tum mile to lagta hai duniya mukammal hai,\ntum na ho to har cheez adhoori si lagti hai.",
  "Ek tum ho jise dekh kar dil kehta hai,\nzindagi ab bhi khoobsurat hai.",
];

const pick = (a) => a[Math.floor(Math.random() * a.length)];
const box = (t, title) => `╭━━〔 *${title}* 〕━━┈⊷\n\n${t}\n\n╰━━ *TAHA MD* ━━┈⊷`;

module.exports = [
  { name: 'shayari', alias: ['shayri', 'poetry'], category: 'fun', desc: 'Random shayari',
    run: ({ m }) => m.reply(box(pick(shayari), 'SHAYARI')) },

  { name: 'sadshayari', alias: ['sad', 'dukh'], category: 'fun', desc: 'Sad shayari',
    run: ({ m }) => m.reply(box(pick(sad), 'SAD SHAYARI')) },

  { name: 'loveshayari', alias: ['love', 'ishq'], category: 'fun', desc: 'Love shayari',
    run: ({ m }) => m.reply(box(pick(love), 'LOVE SHAYARI')) },

  { name: 'sona', alias: ['goodnight', 'gn'], category: 'fun', desc: 'Good night message',
    run: ({ m }) => m.reply(box("Aankhein band karo, saare gham bhula do,\nkal ek nayi subah tumhara intezar kar rahi hai.\n\n🌙 *Shab Bakhair* 🌙", 'SONA ACHA')) },
];
