const express = require('express');
const app = express();
const port = 3000;

// Serve public folder
app.use(express.static('public'));
app.use(express.json());

// Simple GET test
app.get('/hello', (req, res) => {
  res.send('Hello! Express server is running.');
});

// Add two numbers - GET (required by task)
app.get('/add', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.send('Invalid numbers. Use /add?a=5&b=7');
  }

  res.send(`The sum is ${a + b}`);
});

// Extra calculator endpoint
app.get('/calc', (req, res) => {
  const op = req.query.op;
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.send('Invalid inputs.');
  }

  let result;

  switch (op) {
    case "add": result = a + b; break;
    case "sub": result = a - b; break;
    case "mul": result = a * b; break;
    case "div":
      if (b === 0) return res.send("Cannot divide by zero");
      result = a / b;
      break;
    default:
      return res.send("Invalid operation. Use add, sub, mul, div.");
  }

  res.send(`Result: ${result}`);
});

// Root
app.get('/', (req, res) => {
  res.send('Welcome to SIT725 Express Server');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
