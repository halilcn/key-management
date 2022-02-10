import CustomError from "./custom-error";

export class TokenError extends CustomError {
    constructor(message = 'Token error') {
        super(message);
    }
}
