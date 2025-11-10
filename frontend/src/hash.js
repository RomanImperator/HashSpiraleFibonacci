// src/hash.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('hash-form');
  const textarea = document.getElementById('plaintext');
  const clearBtn = document.getElementById('clear');
  const statusEl = document.getElementById('status');
  const resultEl = document.getElementById('result');

  // opzionale: ripristina ultimo input salvato localmente
  const SAVED_KEY = 'fibo_plaintext';
  const saved = localStorage.getItem(SAVED_KEY);
  if (saved) textarea.value = saved;

  clearBtn.addEventListener('click', () => {
    textarea.value = '';
    localStorage.removeItem(SAVED_KEY);
    status('Campo svuotato.');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const plaintext = textarea.value.trim();
    if (!plaintext) return status('Inserisci del testo prima di inviare.');

    // salva comunque localmente per non perdere l’input
    localStorage.setItem(SAVED_KEY, plaintext);

    // === Quando il backend Python sarà pronto, questo è già cablato ===
    try {
      const res = await fetch('/api/hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plaintext }),
      });

      if (!res.ok) throw new Error(await safeText(res) || `HTTP ${res.status}`);

      const data = await res.json(); // es: { hash: "...", meta: {...} }
      status('Hash calcolato con successo.');
      resultEl.textContent = `hash(${JSON.stringify(plaintext)}) = ${data.hash} [${data.bits} bit]`;

    } catch (err) {
      // Finché il backend non esiste, passerai di qua.
      console.warn('[hash] backend non raggiungibile:', err);
      status('Backend non raggiungibile. Test OK: input salvato localmente, pronto a essere inviato quando il backend sarà attivo.');
    }
  });

  function status(msg) { statusEl.textContent = msg; }
  async function safeText(res) { try { return await res.text(); } catch { return ''; } }
});
