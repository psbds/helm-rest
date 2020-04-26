import * as http from 'http';
import { NextFunction, Request } from 'express';
import * as express from 'express';

export class HttpError extends Error {
    status: number;
    message: string;
    name: 'HttpError';

    constructor(status?: number, message?: string) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.status = status || 500;
        this.message = message || http.STATUS_CODES[this.status] || 'Error';
    }
}

export default class ErrorHandler {

    static init(app: express.Application): void {
        app.use((error: Error, req: express.Request, res: Response, next: express.NextFunction) => {
            if (typeof error === 'number') {
                error = new HttpError(error);
            }

            if (error instanceof HttpError) {
                ErrorHandler.sendHttpErrorModule(error, req, res, next);
            } else {
                if (app.get('env') === 'development') {
                    let httpError = new HttpError(500, error.message);
                    ErrorHandler.sendHttpErrorModule(httpError, req, res, next);
                } else {
                    let httpError = new HttpError(500);
                    ErrorHandler.sendHttpErrorModule(httpError, req, res, next);
                }
            }

            console.error(error);
            next();
        });
    }

    private static sendHttpErrorModule(error: HttpError, req: Request, res: any, next: NextFunction): void {
        res.status(error.status);

        if (req.xhr ||
            req.is('json') ||
            (req.is('json') && req.get('Accept')) ||
            !(req.get('Accept') && req.get('Accept').indexOf('html') !== -1)
        ) {
            res.json({
                status: error.status,
                name: error.name,
                message: error.message
            });
        } else {
            res.send(this.generateHTML(error));
        }
    }

    private static generateHTML(error: HttpError): string {
        if (error) {
            return '<div style=\'text-align: center;\'>' +
                `<p>Status: ${error.status}</p>` +
                `<p>Name: ${error.name}</p>` +
                `<p>${error}</p>` +
                `</div>`;
        }

        return '';
    };
}

