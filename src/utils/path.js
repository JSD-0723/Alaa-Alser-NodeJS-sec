import path from 'path'

export const filePath = path.join(
    new URL('.', import.meta.url).pathname,
    '../../books.json'
);