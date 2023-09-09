import bookService from "../services/book.service.js";

const getBookList = (_req, res, next) => {
    try {
        const books = bookService.getBooks();
        res.render("book-list", { books });
    } catch (error) {
        next(error)
    }
};

const getBookDetails = (req, res, next) => {
    const id = parseInt(req.params.id);
    const book = bookService.getBookById(id);
    try {
        if (!book) {
            res.status(404).send("Book not found");
            return;
        }
        res.render("book-details", { book });
    } catch (error) {
        next(error)
    }
};

const renderAddBookForm = (_req, res, next) => {
    try {
        res.render("add-book");
    } catch (error) {
        next(error)
    }
};

const addNewBook = (req, res, next) => {
    const { id, name } = req.body;

    try {
        if (!id || !name) {
            res.status(400).send("Invalid book data");
            return;
        }
        const newBook = { id: parseInt(id), name };
        const added = bookService.addBook(newBook);
        if (added) {
            res.render("add-book-success", { pageTitle: "Book Added Successfully" });
        } else {
            res.render("add-book-error", {
                pageTitle: "Error Adding Book",
                errorMessage: "A book with the same ID already exists",
            });
        }
    } catch (error) {
        next(error)
    }
};

export default {
    getBookList,
    getBookDetails,
    renderAddBookForm,
    addNewBook,
};
