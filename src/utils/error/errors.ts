import CustomError from "./custom-error";

export class UserRegisterCodeError extends CustomError {
    constructor(message = 'User register code error') {
        super(message);
    }
}

export class UserRegisterCodeExpireDateError extends CustomError {
    constructor(message = 'User register code expire date error') {
        super(message);
    }
}

export class ExistsUserError extends CustomError {
    constructor(message = 'Exists user error') {
        super(message);
    }
}

export class UserResetPasswordKeyError extends CustomError {
    constructor(message = 'User reset password key error') {
        super(message);
    }
}

export class UserResetPasswordExpireDateError extends CustomError {
    constructor(message = 'User reset password expire date error') {
        super(message);
    }
}

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
