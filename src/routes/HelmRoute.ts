import { injectable, inject } from "tsyringe";
import { Response, Request, NextFunction, } from 'express';
import { IHelm, IHelmRoute } from "../types";
import { validate } from "class-validator";
import ValidationError from "../errors/ValidationError";
import { HelmInstallModel, HelmUpgradeModel, HelmDeleteModel, HelmRollbackModel, HelmGetModel, HelmRepoAddModel, HelmRepoUpdateModel, HelmRegistryLoginModel, HelmCommandModel, HelmListModel } from "../models/HelmRouteModels";
import { RouteConfig, RoutePrefix, BaseRoute } from "./BaseRoute";

@injectable()
@RoutePrefix("/helm")
export default class HelmRoute extends BaseRoute implements IHelmRoute {

    constructor(@inject("IHelm") private helm: IHelm) {
        super();
    }

    /**
    * POST /helm/rollback 
    * @swagger
    * /helm/command:
    *   post:
    *     tags:
    *     - "helm"
    *     summary: "Runs any helm command"
    *     description: "Runs any helm command"
    *     produces:
    *     - "application/json"
    *     consumes:
    *     - "application/json"
    *     requestBody:
    *       content:
    *         application/json:
    *           schema:
    *             $ref: "#/components/schemas/HelmCommand"
    *     responses:
    *       "200":
    *         description: "Helm stdout"
    *       "500":
    *         description: "Helm stderr"
    */
    @RouteConfig("post", "/command")
    async command(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let model = new HelmCommandModel(req.body);
            let errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            let result = await this.helm.command(model.command);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    /**
    * DELETE /helm/delete 
    * @swagger
    * /helm/delete:
    *     delete:
    *       tags:
    *       - "helm"
    *       summary: "Delete a Helm Release in the cluster"
    *       description: "Delete a Helm Release in the cluster"
    *       produces:
    *       - "application/json"
    *       consumes:
    *       - "application/json"
    *       parameters:
    *         - in: query
    *           name: query
    *           schema:
    *              $ref: "#/components/schemas/HelmDelete"
    *       responses:
    *         "200":
    *           description: "Helm stdout"
    *         "500":
    *           description: "Helm stderr"
    */
    @RouteConfig("delete", "/delete")
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let model = new HelmDeleteModel(req.query);
            let errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            let result = await this.helm.delete(model.releaseName, model.args);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    /**
    * GET /helm/get 
    * @swagger
    * /helm/get:
    *   get:
    *     tags:
    *     - "helm"
    *     summary: "Get a Helm Release information from the cluster"
    *     description: "Get a Helm Release information from the cluster"
    *     produces:
    *     - "application/json"
    *     consumes:
    *     - "application/json"
    *     parameters:
    *       - in: query
    *         name: query
    *         schema:
    *            $ref: "#/components/schemas/HelmGet"
    *     responses:
    *       "200":
    *         description: "Helm stdout"
    *       "500":
    *         description: "Helm stderr"
    */
    @RouteConfig("get", "/get")
    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let model = new HelmGetModel(req.query);
            let errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            let result = await this.helm.get(model.subcommand, model.releaseName, model.args);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    /**
    * POST /helm/install 
    * @swagger
    * /helm/install:
    *   post:
    *      tags:
    *      - "helm"
    *      summary: "Install a Helm Chart in the cluster"
    *      description: "Install a Helm Chart in the cluster"
    *      produces:
    *      - "application/json"
    *      consumes:
    *      - "application/json"
    *      requestBody:
    *        content:
    *          application/json:
    *            schema:
    *              $ref: "#/components/schemas/HelmInstall"
    *      responses:
    *        "200":
    *          description: "Helm stdout"
    *        "500":
    *          description: "Helm stderr"
    */
    @RouteConfig("post", "/install")
    async install(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let model = new HelmInstallModel(req.body);
            let errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            let result = await this.helm.install(model.releaseName, model.chart, model.args);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    /**
    * GET /helm/list 
    * @swagger
    * /helm/list:
    *   get:
    *      tags:
    *      - "helm"
    *      summary: "List Helm releases installed in the cluster."
    *      description: "List Helm releases installed in the cluster."
    *      consumes:
    *      - "application/json"
    *      produces:
    *      - "application/json"
    *      parameters:
    *        - in: query
    *          name: query
    *          schema:
    *             $ref: "#/components/schemas/HelmList"
    *      responses:
    *          "200":
    *              description: Helm stdout
    *          "500":
    *              description: Helm stderr
    */
    @RouteConfig("get", "/list")
    async list(req: any, res: any, next: any): Promise<void> {
        try {
            let model = new HelmListModel(req.query);
            let errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            let result = await this.helm.list(model.args);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    /**
    * POST /helm/registry/login 
    * @swagger
    * /helm/registry/login:
    *   post:
    *     tags:
    *     - "experimental"
    *     summary: "Authenticate to a remote registry (Experimental use of OCI Registry: https://helm.sh/docs/topics/registries/)."
    *     description: "Authenticate to a remote registry (Experimental use of OCI Registry: https://helm.sh/docs/topics/registries/)."
    *     produces:
    *     - "application/json"
    *     consumes:
    *     - "application/json"
    *     requestBody:
    *       content:
    *         application/json:
    *           schema:
    *             $ref: "#/components/schemas/HelmRegistryLogin"
    *     responses:
    *       "200":
    *         description: "Helm stdout"
    *       "500":
    *         description: "Helm stderr"
    */
    @RouteConfig("post", "/registry/login")
    async registryLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let model = new HelmRegistryLoginModel(req.body);
            let errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            let result = await this.helm.registryLogin(model.host, model.username, model.password, model.args);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    /**
    * POST /helm/repo/add 
    * @swagger
    * /helm/repo/add:
    *   post:
    *     tags:
    *     - "helm"
    *     summary: "Rollback Helm Release in the cluster"
    *     description: "Rollback Helm Release in the cluster"
    *     produces:
    *     - "application/json"
    *     consumes:
    *     - "application/json"
    *     requestBody:
    *       content:
    *         application/json:
    *           schema:
    *             $ref: "#/components/schemas/HelmRepoAdd"
    *     responses:
    *       "200":
    *         description: "Helm stdout"
    *       "500":
    *         description: "Helm stderr"
    */
    @RouteConfig("post", "/repo/add")
    async repoAdd(req: any, res: any, next: any): Promise<void> {
        try {
            let model = new HelmRepoAddModel(req.body);
            let errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            let result = await this.helm.repoAdd(model.repoName, model.repoUrl, model.args);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    /**
    * POST /helm/repo/update 
    * @swagger
    * /helm/repo/update:
    *   post:
    *     tags:
    *     - "helm"
    *     summary: "Update gets the latest information about charts from the respective chart repositories."
    *     description: "Update gets the latest information about charts from the respective chart repositories."
    *     produces:
    *     - "application/json"
    *     consumes:
    *     - "application/json"
    *     requestBody:
    *       content:
    *         application/json:
    *           schema:
    *             $ref: "#/components/schemas/HelmRepoUpdate"
    *     responses:
    *       "200":
    *         description: "Helm stdout"
    *       "500":
    *         description: "Helm stderr"
    */
    @RouteConfig("post", "/repo/update")
    async repoUpdate(req: any, res: any, next: any): Promise<void> {
        try {
            let model = new HelmRepoUpdateModel(req.body);
            let errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            let result = await this.helm.repoUpdate(model.args);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    /**
    * PUT /helm/rollback 
    * @swagger
    * /helm/rolback:
    *   put:
    *     tags:
    *     - "helm"
    *     summary: "Rollback Helm Release in the cluster"
    *     description: "Rollback Helm Release in the cluster"
    *     produces:
    *     - "application/json"
    *     consumes:
    *     - "application/json"
    *     requestBody:
    *       content:
    *         application/json:
    *           schema:
    *             $ref: "#/components/schemas/HelmRollback"
    *     responses:
    *       "200":
    *         description: "Helm stdout"
    *       "500":
    *         description: "Helm stderr"
    */
    @RouteConfig("put", "/rollback")
    async rollback(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let model = new HelmRollbackModel(req.body);
            let errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            let result = await this.helm.rollback(model.releaseName, model.revision, model.args);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    /**
    * PUT /helm/upgrade 
    * @swagger
    * /helm/upgrade:
    *   put:
    *     tags:
    *     - "helm"
    *     summary: "Upgrade a Helm Release in the cluster"
    *     description: "Upgrade a Helm Release in the cluster"
    *     produces:
    *     - "application/json"
    *     consumes:
    *     - "application/json"
    *     requestBody:
    *       content:
    *         application/json:
    *           schema:
    *             $ref: "#/components/schemas/HelmUpgrade"
    *     responses:
    *       "200":
    *         description: "Helm stdout"
    *       "500":
    *         description: "Helm stderr"
    */
    @RouteConfig("put", "/upgrade")
    async upgrade(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let model = new HelmUpgradeModel(req.body);
            let errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            let result = await this.helm.upgrade(model.releaseName, model.chart, model.args);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

}