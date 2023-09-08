import express from 'express'
import errorMiddleware from './src/middlewares/error.middleware.js';
import errorNotFoundMiddleware from './src/middlewares/notFound.middleware.js';
import bookRoutes from './src/routers/book.route.js'

const app = express();
const port = 3000;

// set default engine
app.set('view engine', 'pug');

// pars form requests
app.use(express.urlencoded({ extended: true }));

// Handle invalid endpoints
app.use(errorNotFoundMiddleware);

// Error handling middleware
app.use(errorMiddleware);

// book routes
app.use(bookRoutes);

// run the sever on port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
