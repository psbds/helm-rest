import { NextFunction, Request, Application } from 'express';
import { HttpError } from "../errors/HttpError";

export default class ErrorHandler {

    static init(app: Application): void {
        app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
            if (typeof error === 'number') {
                error = new HttpError(error);
            }

            let httpError: HttpError;

            if (error instanceof HttpError) {
                httpError = error;
            } else {
                var isDev = app.get('env') === 'development';
                httpError = new HttpError(500, isDev ? error.message : null, (<any>error).validation);
            }

            ErrorHandler.sendHttpErrorModule(httpError, req, res, next);
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
                message: error.message,
                validation: error.validation
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