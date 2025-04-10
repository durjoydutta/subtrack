const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;
        // mongoose bad objectid
        if (err.name === 'CastError') {
            return res.status(404).json({ message: 'Resource not found' });
        }
        // mongoose duplicate key
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Duplicate field value entered' });
        }
        // mongoose validation error
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: Object.values(err.errors)[0].message });
        }
        res.status(err.status || 500).json(error);
    } catch(err) {
        next(err);
    }
}

export default errorMiddleware;