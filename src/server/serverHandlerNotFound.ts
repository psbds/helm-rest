import * as express from 'express';

export default class NotFoundHandler {
    static init(app: express.Application): void {
        app.use((req, res, next) => res.status(404).send("Route Not Found"));
    }
}