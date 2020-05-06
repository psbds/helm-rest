import { NextFunction, Request, Response, Application } from 'express';
import { HttpError } from "../../errors/HttpError";

export default function ErrorHandler(app: Application): void {
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        let httpError: HttpError;

        if (error instanceof HttpError) {
            httpError = error;
        } else {
            httpError = new HttpError(500, error.message, (<any>error).validation);
        }
        console.error(error);
        sendHttpErrorModule(httpError, req, res, next);
        next();
    });
}

function isJson(req: Request) {
    return req.xhr ||
        req.is('json') ||
        (req.is('json') && req.get('Accept')) ||
        !(req.get('Accept') && req.get('Accept').indexOf('html') !== -1);
}

function sendHttpErrorModule(error: HttpError, req: Request, res: Response, next: NextFunction): void {
    res.status(error.status);

    if (isJson(req)) {
        res.json({
            status: error.status,
            name: error.name,
            message: error.message,
            validation: error.validation
        });
    } else {
        res.set('Content-Type', 'text/html');
        res.send(generateHTML(error));
    }
}

function getValidationErrors(error: HttpError): string {
    var htlmString = "";
    if (error.validation && error.validation.length > 0) {
        htlmString += "<ul>";
        for (var validationError of error.validation) {
            htlmString += `<li>${validationError}</li>`;
        }
        htlmString += '</ul>'
    }
    return htlmString;
}

function generateHTML(error: HttpError): string {
    if (error) {
        var validationErrors = getValidationErrors(error);
        var htlmError = '<div style=\'text-align: center;\'>' +
            `<p>Status: ${error.status}</p>` +
            `<p>Name: ${error.name}</p>` +
            validationErrors +
            `<p>${error}</p>` +
            `</div>`;
        return htlmError;
    }

    return '';
};