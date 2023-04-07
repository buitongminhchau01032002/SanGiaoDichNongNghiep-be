const errorHandler = (err, req, res, next) => {
    console.log(err);
    const { statusCode, message } = err;
    res.status(statusCode || 500).json({
        error: {
            statusCode,
            message: statusCode === 500 ? 'Có lỗi xảy ra!' : message,
        },
    });
};

export default errorHandler;
