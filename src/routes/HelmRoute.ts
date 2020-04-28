import { injectable, inject } from "tsyringe";
import { Router, Response, Request, NextFunction, Application } from 'express';
import { IHelm, IHelmRoute } from "../types";
import { validate } from "class-validator";
import ValidationError from "../errors/ValidationError";
import { HelmInstallModel, HelmUpgradeModel, HelmDeleteModel, HelmRollbackModel, HelmGetModel, HelmRepoAddModel } from "../models/HelmRouteModels";
import { RouteConfig, RoutePrefix, BaseRoute } from "./BaseRoute";



@injectable()
@RoutePrefix("/helm")
export default class HelmRoute extends BaseRoute implements IHelmRoute {

    constructor(@inject("IHelm") private helm: IHelm) {
        super();
    }

    repoUpdate(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }

    @RouteConfig("post", "/registry/login")
    registryLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }

    @RouteConfig("post", "/install")
    async install(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            var model = new HelmInstallModel(req.body);
            var errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            var result = await this.helm.install(model.releaseName, model.chart, model.args);
            res.status(200).send(JSON.stringify(result));
        } catch (error) {
            next(error);
        }
    }

    @RouteConfig("post", "/upgrade")
    async upgrade(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            var model = new HelmUpgradeModel(req.body);
            var errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            var result = await this.helm.upgrade(model.releaseName, model.chart, model.args);
            res.status(200).send(JSON.stringify(result));
        } catch (error) {
            next(error);
        }
    }

    @RouteConfig("delete", "/delete")
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            var model = new HelmDeleteModel(req.query);
            var errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            var result = await this.helm.delete(model.releaseName, model.args);
            res.status(200).send(JSON.stringify(result));
        } catch (error) {
            next(error);
        }
    }

    @RouteConfig("put", "/rollback")
    async rollback(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            var model = new HelmRollbackModel(req.body);
            var errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            var result = await this.helm.rollback(model.releaseName, model.revision, model.args);
            res.status(200).send(JSON.stringify(result));
        } catch (error) {
            next(error);
        }
    }

    @RouteConfig("get", "/get")
    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            var model = new HelmGetModel(req.query);
            var errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            var result = await this.helm.get(model.subcommand, model.releaseName, model.args);
            res.status(200).send(JSON.stringify(result));
        } catch (error) {
            next(error);
        }
    }

    @RouteConfig("post", "/repo/add")
    async repoAdd(req: any, res: any, next: any): Promise<void> {
        try {
            var model = new HelmRepoAddModel(req.query);
            var errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            var result = await this.helm.repoAdd(model.repoName, model.repoUrl, model.args);
            res.status(200).send(JSON.stringify(result));
        } catch (error) {
            next(error);
        }
    }

}