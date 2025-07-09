const errorHandler = (err, req, res, next) => {
    console.error('Error:', err); // Log error details to the console
    res.status(err.status || 500).json({
        message: err.message || 'An unexpected error occurred.',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

export default errorHandler;
