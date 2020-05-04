import * as http from 'http';

export class HttpError extends Error {
    
    status: number;
    message: string;
    validation: string[];
    name: 'HttpError';

    constructor(status?: number, message?: string, validation?: string[]) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.status = status || 500;
        this.message = message || http.STATUS_CODES[this.status] || 'Error';
        this.validation = validation;
    }
}