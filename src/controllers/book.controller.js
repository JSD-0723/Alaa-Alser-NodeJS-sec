import bookService from "../services/book.service.js";

const getBookList = (_req, res) => {
    const books = bookService.getBooks();
    res.render('book-list', { books });
}

const getBookDetails = (req, res) => {
    const id = parseInt(req.params.id);
    const books = bookService.getBooks();
    const book = books.find((book) => book.id === id);
    if (!book) {
        res.status(404).send('Book not found');
        return;
    }
    res.render('book-details', { book });
}

const renderAddBookForm = (_req, res) => {
    res.render('add-book');
}

const addNewBook = (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) {
        res.status(400).send('Invalid book data');
        return;
    }
    const newBook = { id: parseInt(id), name };
    const added = bookService.addBook(newBook);
    if (added) {
        res.render('add-book-success', { pageTitle: 'Book Added Successfully' });
    } else {
        res.render('add-book-error', {
            pageTitle: 'Error Adding Book',
            errorMessage: 'A book with the same ID already exists',
        });
    }
}

export default {
    getBookList,
    getBookDetails,
    renderAddBookForm,
    addNewBook,
};
