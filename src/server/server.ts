import * as express from 'express';
import * as http from 'http';
import * as serverEvents from './serverEvents';
import { container, Lifecycle } from "tsyringe";

import RouteInit from "../routes/RouteInit";
import DefaultHandler from './handlers/DefaultHandlers';
import ErrorHandler from './handlers/ErrorHandler';
import NotFoundHandler from './handlers/NotFoundHandler';

export function createApp(configureRoutes: (app: express.Application) => any): express.Application {
    const app: express.Application = express();

    DefaultHandler(app);

    if (configureRoutes)
        configureRoutes(app);

    NotFoundHandler(app);
    ErrorHandler(app);

    // App Settings
    app.set('port', process.env.PORT || 80);
    app.set('secret', process.env.SECRET || 'superSecret');

    return app;
}

export function startServer() {

    const routeConfig: RouteInit = container.resolve<RouteInit>("RouteInit");
    const app: express.Application = createApp((app) => routeConfig.init(app));
    const Server: http.Server = http.createServer(app);

    Server.listen(app.get('port'));

    Server.on('error', (error: Error) => serverEvents.onError(error, app.get('port')));
    Server.on('listening', serverEvents.onListening.bind(Server));
}