const errorHandler = (fn) => {
    return (req, res, next) => {
        return fn(req, res, next).catch(e => {
            console.log(e);
            next(e)
        })
    }
}

class AppError extends Error {
    constructor(message = 'Something went wrong', status = 500) {
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = { errorHandler, AppError }