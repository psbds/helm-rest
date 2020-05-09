import * as express from 'express';
import * as http from 'http';
import * as serverEvents from './serverEvents';
import { DependencyInjection } from "../DependencyInjection";

import DefaultHandler from './handlers/DefaultHandlers';
import ErrorHandler from './handlers/ErrorHandler';
import NotFoundHandler from './handlers/NotFoundHandler';
import SwaggerHandler from './handlers/SwaggerHandler';

import { ICustomRoute } from '../types';

export class Server {

    private app: express.Application;

    constructor(private DependencyInstance?: DependencyInjection) {
    }

    startServer() {
        const Server: http.Server = http.createServer(this.app);
        Server.listen(this.app.get('port'));
        Server.on('error', (error: Error) => serverEvents.onError(error, this.app.get('port')));
        Server.on('listening', serverEvents.onListening.bind(Server));
    }

    createAppWithRoutes() {
        var routeHandlers = this.DependencyInstance.getCustomRoutes();
        this.createApp(routeHandlers);
    }

    createApp(routes: ICustomRoute[]): express.Application {
        this.app = express();

        DefaultHandler(this.app);

        if (routes && routes.length > 0) {
            for (var route of routes) {
                route.configureRouter(this.app);
            }
        }
        SwaggerHandler(this.app);
        NotFoundHandler(this.app);
        ErrorHandler(this.app);

        // App Settings
        this.app.set('port', process.env.PORT || 80);
        this.app.set('secret', process.env.SECRET || 'superSecret');

        return this.app;
    }
}