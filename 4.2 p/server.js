const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));

// Serve public folder
app.use(express.static(path.join(__dirname, 'public')));

// Path to books.json
const dataFile = path.join(__dirname, 'data', 'books.json');

// ---------- LOAD BOOK LIST ----------
app.get('/api/books', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        if (err) return res.status(500).json({ error: "Could not read file" });
        res.json(JSON.parse(data));
    });
});

// ---------- ADD NEW BOOK ----------
app.post('/api/books', (req, res) => {
    const { title, author, year, description, cover } = req.body;

    fs.readFile(dataFile, (err, data) => {
        if (err) return res.status(500).json({ error: "Could not read file" });

        let books = JSON.parse(data);
        books.unshift({
            title: title || "Untitled",
            author: author || "Unknown",
            year: year || "",
            description: description || "",
            cover: cover || "/uploads/Screenshot_2025-11-28_173326.png"
        });

        fs.writeFile(dataFile, JSON.stringify(books, null, 2), err => {
            if (err) return res.status(500).json({ error: "Could not write file" });
            res.json({ success: true });
        });
    });
});


// ---------- START SERVER ----------
app.listen(3000, () => {
    console.log("Server running: http://localhost:3000");
});
