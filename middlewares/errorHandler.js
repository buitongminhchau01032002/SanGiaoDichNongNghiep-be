const errorHandler = (err, req, res, next) => {
    console.log(err);
    let { statusCode, message } = err;
    statusCode = statusCode || 500;
    res.status(statusCode).json({
        error: {
            statusCode,
            message: statusCode === 500 ? 'Có lỗi xảy ra!' : message,
        },
    });
};

export default errorHandler;
