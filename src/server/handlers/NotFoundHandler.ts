import { Application, Request, Resolve, NextFunction } from 'express';

export default function NotFoundHandler(app: Application) {
    app.use((req: Request, res: Resolve, next: NextFunction) => res.status(404).send("Route Not Found"));
}