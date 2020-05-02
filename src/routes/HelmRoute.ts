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

    @RouteConfig("put", "/upgrade")
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
            var model = new HelmRepoAddModel(req.body);
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

    @RouteConfig("get", "/repo/update")
    async repoUpdate(req: any, res: any, next: any): Promise<void> {
        try {
            var model = new HelmRepoUpdateModel(req.query);
            var errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            var result = await this.helm.repoUpdate(model.args);
            res.status(200).send(JSON.stringify(result));
        } catch (error) {
            next(error);
        }
    }

    @RouteConfig("get", "/list")
    async list(req: any, res: any, next: any): Promise<void> {
        try {
            var model = new HelmListModel(req.query);
            var errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            var result = await this.helm.list(model.args);
            res.status(200).send(JSON.stringify(result));
        } catch (error) {
            next(error);
        }
    }


    @RouteConfig("post", "/registry/login")
    async registryLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            var model = new HelmRegistryLoginModel(req.body);
            var errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            var result = await this.helm.registryLogin(model.host, model.username, model.password, model.args);
            res.status(200).send(JSON.stringify(result));
        } catch (error) {
            next(error);
        }
    }

    @RouteConfig("post", "/command")
    async command(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            var model = new HelmCommandModel(req.body);
            var errors = await validate(model);
            if (errors.length > 0) {
                throw new ValidationError(errors);
            }
            var result = await this.helm.command(model.command);
            res.status(200).send(JSON.stringify(result));
        } catch (error) {
            next(error);
        }
    }

}