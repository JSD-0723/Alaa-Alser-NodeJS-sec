import fs from 'fs'
import { filePath } from '../utils/path.js';


const getBooks = () => {
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

    books.push(newBook);
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
    return true;
}


export default {
    getBooks,
    getBookById,
    addBook
}
