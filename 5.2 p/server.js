const express = require('express');
const path = require('path');
const bookRoutes = require('./routes/routes');

const app = express();
const PORT = 3000;

app.use(express.json());

// serve static client
app.use(express.static(path.join(__dirname, 'public')));

// api routes
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
