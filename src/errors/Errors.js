export class BookError extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    };
};

export class UserError extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    };
};