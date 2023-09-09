const errorMiddleware = (err, req, res, next) => {
    res.status(err.status || 500).json(err.message);
};

export default errorMiddleware