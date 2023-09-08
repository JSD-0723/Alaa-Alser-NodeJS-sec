import fs from 'fs'
import path from 'path'

const getBooks = () => {
    const filePath = path.join(
        new URL('.', import.meta.url).pathname,
        '../../books.json'
    ); const books = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return books;
}

const getBookById = (id) => {
    const books = getBooks();
    return books.find((book) => book.id === id);
}

const addBook = (newBook) => {
    const books = getBooks();
    const existingBook = books.find((book) => book.id === newBook.id);
    if (existingBook) {
        return false;
    }
    const filePath = path.join(
        new URL('.', import.meta.url).pathname,
        '../../books.json'
    );
    books.push(newBook);
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
    return true;
}


export default {
    getBooks,
    getBookById,
    addBook
}
