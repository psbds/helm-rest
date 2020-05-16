import { express } from "express";
import { Server } from "../../src/server/Server";
import { ICustomRoute } from "../../src/types";

export default class RouteTestServer {


    static get(routes: ICustomRoute[]): express.Application {
        process.env.NODE_ENV = "unit-test";
        const app: express.Application = new Server().createApp(routes);
        return app;
    }

}