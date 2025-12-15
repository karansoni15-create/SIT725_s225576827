document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("getBooksBtn");
  const container = document.getElementById("booksContainer");

  if (!btn || !container) {
    console.error("HTML elements missing");
    return;
  }

  btn.addEventListener("click", async () => {
    container.innerHTML = "";

    try {
      const res = await fetch("/api/books");
      const json = await res.json();

      // backend returns { statusCode, data }
      const books = Array.isArray(json.data) ? json.data : [];

      if (books.length === 0) {
        container.innerHTML = "<p>No books found.</p>";
        return;
      }

      books.forEach(book => {
        if (!book || typeof book !== "object") return;
        if (!book.title || !book.author) return;

        const price =
          book.price && book.price.$numberDecimal
            ? book.price.$numberDecimal
            : "0.00";

        const card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = `
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <p>${price} AUD</p>
        `;

        container.appendChild(card);
      });

    } catch (e) {
      console.error(e);
      container.innerHTML =
        "<p style='color:red'>Failed to load books</p>";
    }
  });
});
