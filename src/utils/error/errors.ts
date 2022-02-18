import CustomError from "./custom-error";

export class TokenError extends CustomError {
    constructor(message = 'Token error') {
        super(message);
    }
}

export class TokenPermissionError extends CustomError {
    constructor(message = 'Token permission error') {
        super(message);
    }
}

export class TokenLimitError extends CustomError {
    constructor(message = 'Token limit error') {
        super(message);
    }
}

export class TokenLogError extends CustomError {
    constructor(message = 'Token log error') {
        super(message);
    }
}

export class TokenExpireDateError extends CustomError {
    constructor(message = 'Token expire date error') {
        super(message);
    }
}

export class ProductError extends CustomError {
    constructor(message = 'Product error') {
        super(message);
    }
}

export class ProductLogError extends CustomError {
    constructor(message = 'Product log error') {
        super(message);
    }
}
