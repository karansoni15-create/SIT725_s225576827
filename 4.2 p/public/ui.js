document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("covers-grid");

    const coverFile = document.getElementById("cover-file");
    const saveBtn = document.getElementById("save-btn");
    const clearBtn = document.getElementById("clear-btn");

    let uploadedCoverBase64 = "";

    // Convert file → Base64
    coverFile.onchange = () => {
        const file = coverFile.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            uploadedCoverBase64 = reader.result;
        };
        reader.readAsDataURL(file);
    };

    // Load books on page start
    loadBooks();

    function loadBooks() {
        fetch("/api/books")
            .then(res => res.json())
            .then(list => {
                grid.innerHTML = "";
                list.slice(0, 5).forEach(book => createCard(book));
            })
            .catch(err => console.error(err));
    }

    // Build card UI
    function createCard(book) {
        const card = document.createElement("div");
        card.className = "cover-card";

        const img = document.createElement("img");
        img.src = book.cover;
        img.className = "book-thumb";

        const title = document.createElement("div");
        title.className = "cover-title";
        title.textContent = book.title || "Untitled";

        card.appendChild(img);
        card.appendChild(title);

        // Click = open modal
        card.onclick = () => openModal(book);

        grid.appendChild(card);
    }

    function openModal(book) {
        document.getElementById("modal-img").src = book.cover;
        document.getElementById("modal-title").textContent = book.title;
        document.getElementById("modal-author").textContent = book.author;

        const modal = M.Modal.getInstance(document.getElementById("preview-modal"));
        modal.open();
    }

    // Save new book
    saveBtn.onclick = () => {
        const data = {
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            year: document.getElementById("year").value,
            description: document.getElementById("description").value,
            cover: uploadedCoverBase64
        };

        fetch("/api/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(() => {
            console.log("Book saved");
            loadBooks();
            clearForm();
        })
        .catch(err => console.error(err));
    };

    // Clear form inputs
    clearBtn.onclick = clearForm;

    function clearForm() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("year").value = "";
        document.getElementById("description").value = "";
        uploadedCoverBase64 = "";
    }

    // Initialize Materialize modal
    M.Modal.init(document.querySelectorAll('.modal'));
});
