import { Request, Response, NextFunction } from "express";
import { injectable } from "tsyringe";

import { RouteConfig, BaseRoute, RoutePrefix } from "./BaseRoute";
import { IHealthcheck } from "../types";

@injectable()
@RoutePrefix("//health")
export default class HealthcheckRoute extends BaseRoute implements IHealthcheck {

    constructor() {
        super();
    }

    /**
    * GET /health 
    * @swagger
    * /health:
    *   post:
    *     tags:
    *     - "healthcheck"
    *     summary: "Check if the web server is running properly"
    *     description: "Check if the web server is running properly"
    *     produces:
    *     - "application/json"
    *     consumes:
    *     - "application/json"
    *     responses:
    *       "200":
    *         description: "Ok"
    *       "500":
    *         description: "Internal Server Error"
    */
    @RouteConfig("get", "")
    async health(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.status(200).json("OK");
    }
}