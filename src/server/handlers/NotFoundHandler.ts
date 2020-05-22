import { Application, Request, Response, NextFunction } from 'express';

export default function NotFoundHandler(app: Application) {
    app.use((req: Request, res: Response, next: NextFunction) => res.status(404).send("Route Not Found"));
}