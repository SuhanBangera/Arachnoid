export class ActionNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Action Not Found Error";
    }
}