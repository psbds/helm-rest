import { Router, Response } from 'express';
import { injectable, inject } from "tsyringe";

import { IHelm, IHelmRoute } from "../types";
import { express } from "express";
import { validate } from "class-validator";
import ValidationError from "../errors/ValidationError";
import { HelmInstallModel } from "../models/HelmRouteModels";

@injectable()
export default class HelmRoute implements IHelmRoute {

    constructor(@inject("IHelm") private helm: IHelm) {
    }

    configureRouter(app: express.Application) {
        var router = Router();
        router.get("/install", this.install.bind(this));

        app.use('/helm', router);
        return router;
    }

    async install(req, res: Response, next): Promise<void> {
        try {

            var model = new HelmInstallModel(req.body);
            var errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            var result = await this.helm.install(req.body.releaseName, req.body.chart, req.body.args);
            res.status(200).send(JSON.stringify(result));
        } catch (error) {
            next(error);
        }
    }

}