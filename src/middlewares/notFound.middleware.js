const errorNotFoundMiddleware = (req, res, next) => {
    res.status(404).send('Endpoint not found');
}

export default errorNotFoundMiddleware