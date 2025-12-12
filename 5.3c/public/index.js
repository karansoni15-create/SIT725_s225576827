document.getElementById("getBooks").addEventListener("click", async () => {
  const res = await fetch("/api/books");
  const data = await res.json();

  const list = document.getElementById("bookList");
  list.innerHTML = "";

  data.data.forEach(book => {
    const item = document.createElement("li");
    item.textContent = `${book.title} — ${book.author}`;
    item.onclick = () => showDetails(book.id);
    list.appendChild(item);
  });
});

async function showDetails(id) {
  const res = await fetch(`/api/books/${id}`);
  const data = await res.json();

  const d = data.data;

  document.getElementById("details").innerHTML = `
    <h2>${d.title}</h2>
    <p><strong>Author:</strong> ${d.author}</p>
    <p><strong>Year:</strong> ${d.year}</p>
    <p><strong>Genre:</strong> ${d.genre}</p>
    <p><strong>Summary:</strong> ${d.summary}</p>
    <p><strong>Price:</strong> $${parseFloat(d.price.$numberDecimal)}</p>
  `;
}
