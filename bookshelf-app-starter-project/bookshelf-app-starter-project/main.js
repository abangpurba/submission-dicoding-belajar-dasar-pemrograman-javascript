
function saveData(books) {
    localStorage.setItem("books", JSON.stringify(books));
}

function getData() {
    const books = localStorage.getItem("books");
    return books ? JSON.parse(books) : [];
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("bookForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const title = document.getElementById("bookFormTitle").value;
        const author = document.getElementById("bookFormAuthor").value;
        const year = Number(document.getElementById("bookFormYear").value);
        const isComplete = document.getElementById("bookFormIsComplete").checked;

        const newBook = {
            id: Date.now(),
            title,
            author,
            year,
            isComplete,
        };

        const books = getData();
        books.push(newBook);
        saveData(books);
        renderBooks();
    });

    document.getElementById("searchBook").addEventListener("submit", function (event) {
        event.preventDefault();
        const searchQuery = document.getElementById("searchBookTitle").value.toLowerCase();
        renderBooks(searchQuery);
    });

    renderBooks();
});

function renderBooks(searchQuery = '') {
    const books = getData();
    const incompleteBookList = document.getElementById("incompleteBookList");
    const completeBookList = document.getElementById("completeBookList");

    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    books.forEach(book => {
        if (book.title.toLowerCase().includes(searchQuery)) {
            const bookItem = `
                <div data-bookid="${book.id}" data-testid="bookItem">
                    <h3 data-testid="bookItemTitle">${book.title}</h3>
                    <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
                    <p data-testid="bookItemYear">Tahun: ${book.year}</p>
                    <div>
                        <button data-testid="bookItemIsCompleteButton" onclick="toggleComplete(${book.id})">${book.isComplete ? 'Belum Selesai' : 'Selesai Dibaca'}</button>
                        <button data-testid="bookItemDeleteButton" onclick="deleteBook(${book.id})">Hapus Buku</button>
                        <button data-testid="bookItemEditButton" onclick="editBook(${book.id})">Edit Buku</button>
                    </div>
                </div>
            `;
            if (book.isComplete) {
                completeBookList.innerHTML += bookItem;
            } else {
                incompleteBookList.innerHTML += bookItem;
            }
        }
    });
}

function toggleComplete(id) {
    const books = getData();
    const book = books.find(book => book.id === id);
    book.isComplete = !book.isComplete;
    saveData(books);
    renderBooks();
}


function deleteBook(id) {
    let books = getData();
    books = books.filter(book => book.id !== id);
    saveData(books);
    renderBooks();

}