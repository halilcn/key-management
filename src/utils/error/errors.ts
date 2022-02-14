import CustomError from "./custom-error";

export class TokenError extends CustomError {
    constructor(message = 'Token error') {
        super(message);
    }
}

export class TokenLimitError extends CustomError {
    constructor(message = 'Token limit error') {
        super(message);
    }
}

