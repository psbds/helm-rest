import { express, } from "express";
import { createApp } from "../../src/server/Server";

export default class RouteTestServer {


    static get(configureRoutes: (app: express.Application) => any): express.Application {
        const app: express.Application = createApp(configureRoutes);
        return app;
    }

}