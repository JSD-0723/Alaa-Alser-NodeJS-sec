import bookService from "../services/book.service.js";

function getBookList(req, res) {
    const books = bookService.getBooks();
    res.render('book-list', { books });
}

function getBookDetails(req, res) {
    const id = parseInt(req.params.id);
    const books = bookService.getBooks();
    const book = books.find((book) => book.id === id);
    if (!book) {
        res.status(404).send('Book not found');
        return;
    }
    res.render('book-details', { book });
}

function renderAddBookForm(req, res) {
    res.render('add-book');
}

function addNewBook(req, res) {
    const { id, name } = req.body;
    if (!id || !name) {
        res.status(400).send('Invalid book data');
        return;
    }
    const newBook = { id: parseInt(id), name };
    const added = bookService.addBook(newBook);
    if (added) {
        res.status(201).send('Book added successfully');
    } else {
        res.status(409).send('A book with the same ID already exists');
    }
}

export default {
    getBookList,
    getBookDetails,
    renderAddBookForm,
    addNewBook,
};
