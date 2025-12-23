// public/index.js

const btn = document.getElementById('getBooksBtn');
const list = document.getElementById('bookList');
const details = document.getElementById('bookDetails');
const closeBtn = document.getElementById('closeDetails');

let booksCache = [];

btn.addEventListener('click', async () => {
  const res = await fetch('/api/books');
  const books = await res.json();

  booksCache = books;
  list.innerHTML = '';

  books.forEach(book => {
    const li = document.createElement('li');
    li.className = 'book-item';
    li.textContent = `${book.title} — ${book.author} — ${book.price} AUD`;
    li.addEventListener('click', () => showDetails(book.id));
    list.appendChild(li);
  });
});

function showDetails(id) {
  const book = booksCache.find(b => b.id === id);
  if (!book) return;

  details.innerHTML = `
    <h3>${book.title}</h3>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Year:</strong> ${book.year}</p>
    <p><strong>Genre:</strong> ${book.genre}</p>
    <p><strong>Summary:</strong><br>${book.summary}</p>
    <p><strong>Price (AUD):</strong> ${book.price} AUD</p>
  `;

  details.style.display = 'block';
}

closeBtn.addEventListener('click', () => {
  details.style.display = 'none';
});
