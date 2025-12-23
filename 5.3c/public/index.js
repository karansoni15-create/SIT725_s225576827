// public/index.js
document.getElementById('getBooksBtn').addEventListener('click', () => {
  fetch('/api/books')
    .then(res => res.json())
    .then(books => {
      const list = document.getElementById('bookList');
      list.innerHTML = '';

      books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} ${book.price} AUD`;
        list.appendChild(li);
      });
    })
    .catch(err => console.error(err));
});
