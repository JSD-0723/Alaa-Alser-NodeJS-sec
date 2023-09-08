import express from 'express'
import bookController from '../controllers/book.controller.js'
const router = express.Router();

router.get('/books', bookController.getBookList);
router.get('/books/:id', bookController.getBookDetails);
router.get('/book/new', bookController.renderAddBookForm);
router.post('/books', bookController.addNewBook);

export default router;
