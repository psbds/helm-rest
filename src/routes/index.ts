import * as express from 'express';
import { Router } from "express";
import container from "../helpers/dependencyInjection";
import { ICustomRoute } from "../types";

export function init(app: express.Application): void {

   const helmRoute = container.resolve<ICustomRoute>("IHelmRoute");

   app.use('/helm', helmRoute.configureRouter(Router()));

}
