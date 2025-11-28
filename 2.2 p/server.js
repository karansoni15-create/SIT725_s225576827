const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// parse JSON bodies
app.use(express.json());

// serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// calculation endpoint
app.post('/calc', (req, res) => {
  try {
    const { a, b, op } = req.body;

    const numA = Number(a);
    const numB = Number(b);

    if (!isFinite(numA) || !isFinite(numB)) {
      return res.status(400).json({ error: 'Invalid numbers' });
    }

    let result;
    switch (op) {
      case '+':
        result = numA + numB;
        break;
      case '-':
        result = numA - numB;
        break;
      case '*':
      case 'x':
        result = numA * numB;
        break;
      case '/':
        if (numB === 0) return res.status(400).json({ error: 'Division by zero' });
        result = numA / numB;
        break;
      case '%':
        result = numA % numB;
        break;
      default:
        return res.status(400).json({ error: 'Unsupported operator' });
    }

    // normalize result precision for floats
    if (!Number.isInteger(result)) result = parseFloat(result.toFixed(8));

    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// fallback to index.html for unknown routes (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
