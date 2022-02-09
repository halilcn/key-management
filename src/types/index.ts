export {};

declare global {
    namespace Express {
        export interface Request {
            validated: any;
            user: any;
            currentToken: string;
        }
    }
}
