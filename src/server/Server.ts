import { Application } from 'express';
import express from 'express';
import http from 'http';
import { injectable, inject } from "tsyringe";
import { Logger } from 'winston';

import * as serverEvents from './serverEvents';
import DefaultHandler from './handlers/DefaultHandlers';
import AuthenticationHandler from './handlers/AuthenticationHandler';
import ErrorHandler from './handlers/ErrorHandler';
import NotFoundHandler from './handlers/NotFoundHandler';
import SwaggerHandler from './handlers/SwaggerHandler';

import { ICustomRoute, IServer } from '../types';

@injectable()
export default class Server implements IServer {

    private app: Application;
    private authentication: boolean;
    constructor(@inject("CustomRoutes") private customRoutes: ICustomRoute[], @inject("Logger") private logger: Logger) {
        this.authentication = !!process.env.authenticationKey;
    }

    startServer(): void {
        const Server: http.Server = http.createServer(this.app);
        Server.listen(this.app.get('port'));
        Server.on('error', (error: Error) => serverEvents.onError(error, this.app.get('port')));
        Server.on('listening', serverEvents.onListening.bind(Server));
    }

    createAppWithRoutes(): Application {
        var routeHandlers = this.customRoutes;
        return this.createApp(routeHandlers);
    }

    createApp(routes: ICustomRoute[]): Application {
        this.app = express();

        DefaultHandler(this.app);

        if (this.authentication) {
            AuthenticationHandler(this.app);
        }

        if (routes && routes.length > 0) {
            for (var route of routes) {
                route.configureRouter(this.app);
            }
        }

        SwaggerHandler(this.app, this.logger);
        NotFoundHandler(this.app);
        ErrorHandler(this.app);

        // App Settings
        this.app.set('port', process.env.PORT || 80);

        return this.app;
    }
}