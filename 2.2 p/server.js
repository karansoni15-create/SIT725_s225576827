// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve public folder
app.use(express.static(path.join(__dirname, 'public')));

// In-memory list
const codes = [
  "Keep learning",
  "Practice small tasks daily",
  "Read the docs first",
  "Ask for help when stuck"
];

// ---------------------------------------------------
//  GET /api/code — return random tip
// ---------------------------------------------------
app.get('/api/code', (req, res) => {
  const idx = Math.floor(Math.random() * codes.length);
  res.json({ code: codes[idx] });
});

// ---------------------------------------------------
//  POST /api/code — add a new tip
// ---------------------------------------------------
app.post('/api/code', (req, res) => {
  const { code } = req.body;

  if (!code || typeof code !== 'string' || code.trim().length === 0) {
    return res.status(400).json({ error: "Invalid 'code' string" });
  }

  codes.push(code.trim());
  res.status(201).json({ message: "Code added", added: code });
});

// ---------------------------------------------------
//  GET /api/add?x=4&y=7 — add two numbers
// ---------------------------------------------------
app.get('/api/add', (req, res) => {
  console.log("ADD endpoint called:", req.query);

  const x = parseFloat(req.query.x);
  const y = parseFloat(req.query.y);

  if (Number.isNaN(x) || Number.isNaN(y)) {
    return res.status(400).json({
      error: "Please supply numeric x and y. Example: /api/add?x=2&y=3",
      received: req.query
    });
  }

  res.json({
    x,
    y,
    sum: x + y
  });
});

// ---------------------------------------------------
//  GET /api/square?num=5 — square of a number
// ---------------------------------------------------
app.get('/api/square', (req, res) => {
  const n = parseFloat(req.query.num);

  if (Number.isNaN(n)) {
    return res.status(400).json({
      error: "Please supply numeric num. Example: /api/square?num=5"
    });
  }

  res.json({
    number: n,
    square: n * n
  });
});

// ---------------------------------------------------
//  FALLBACK ROUTE — MUST BE LAST
// ---------------------------------------------------
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
