import * as express from 'express';
import { Router } from "express";
import { ICustomRoute, IHelmRoute } from "../types";
import { injectable, inject } from 'tsyringe';

@injectable()
export default class RouteInit {

   constructor(@inject("IHelmRoute") private helmRoute: IHelmRoute) {

   }

   init(app: express.Application): void {
      this.helmRoute.configureRouter(app);
   }
}