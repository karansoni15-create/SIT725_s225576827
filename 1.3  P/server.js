
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const publicDir = path.join(__dirname, 'public');
const indexPath = path.join(publicDir, 'index.html');


if (!fs.existsSync(publicDir)) {
  console.error('ERROR: missing public folder at', publicDir);
  process.exit(1);
}
if (!fs.existsSync(indexPath)) {
  console.error('ERROR: missing index.html at', indexPath);
  process.exit(1);
}

// logging middleware
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});

// serve static assets
app.use(express.static(publicDir));

// small API route for basic testing
app.get('/api/ping', (req, res) => {
  res.json({ ok: true, now: new Date().toISOString() });
});

// fallback to index.html for any other GET request
app.get('*', (req, res) => {
  if (req.method !== 'GET') return res.status(405).end();
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('sendFile error:', err);
      res.status(500).send('Server error');
    }
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err && err.stack ? err.stack : err);
  res.status(500).send('Internal server error');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}  (node ${process.version})`);
});
