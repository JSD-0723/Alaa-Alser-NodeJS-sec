import fs from 'fs'
import path from 'path'

const getBooks = () => {
    const filePath = path.join(
        new URL('.', import.meta.url).pathname,
        '../../books.json'
    );
    try {
        let data;
        if (fs.existsSync(filePath)) {
            data = fs.readFileSync(filePath, 'utf-8');
            const parsedData = JSON.parse(data);
            if (!Array.isArray(parsedData)) {
                throw new Error('Book file is invalid');
            }
            return parsedData;
        } else {
            fs.writeFileSync(filePath, '[]');
            return [];
        }
    } catch (error) {
        throw error;
    }
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
