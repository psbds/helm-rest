process.env.NODE_ENV = "unit-test";

import { Application } from "express";
import Server from "../../src/server/Server";
import { ICustomRoute } from "../../src/types";
import logger from "../../src/helpers/Logger";

export default class RouteTestServer {

    static get(routes: ICustomRoute[], authKey: string = null): Application {
        if(authKey){
            process.env.authenticationKey = authKey;
        }else{
            delete process.env.authenticationKey;
        }
        const app: Application = new Server(null, logger).createApp(routes);
        return app;
    }

}