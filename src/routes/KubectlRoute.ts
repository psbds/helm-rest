import { injectable, inject } from "tsyringe";
import { Response, Request, NextFunction, } from 'express';
import { IKubectl, IKubectlRoute } from "../types";
import { validate } from "class-validator";
import ValidationError from "../errors/ValidationError";
import { KubectlCommandModel } from "../models/KubectlRouteModels";
import { RouteConfig, RoutePrefix, BaseRoute } from "./BaseRoute";

@injectable()
@RoutePrefix("/kubectl")
export default class HelmRoute extends BaseRoute implements IKubectlRoute {

    constructor(@inject("IKubectl") private kubectl: IKubectl) {
        super();
    }

    /**
    * POST /kubectl/command 
    * @swagger
    * /kubectl/command:
    *   post:
    *     tags:
    *     - "kubectl"
    *     summary: "Runs any kubectl command"
    *     description: "Runs any kubectl command"
    *     security:
    *     - ApiKeyAuth: []
    *     produces:
    *     - "application/json"
    *     consumes:
    *     - "application/json"
    *     requestBody:
    *       content:
    *         application/json:
    *           schema:
    *             $ref: "#/components/schemas/KubectlCommand"
    *     responses:
    *       "200":
    *         description: "Kubectl stdout"
    *       "401":
    *         description: "Unauthorized"
    *       "500":
    *         description: "Kubectl stderr"
    */
    @RouteConfig("post", "/command")
    async command(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let model = new KubectlCommandModel(req.body);
            let errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            let result = await this.kubectl.command(model.command);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

}