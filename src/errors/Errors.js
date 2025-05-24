class BookError extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    };
};

class UserError extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    };
};

export default {BookError, UserError};