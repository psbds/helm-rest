import { Router } from 'express';
import { injectable, inject } from "tsyringe";

import { IHelm, ICustomRoute } from "../types";

@injectable()
export default class HelmRoute implements ICustomRoute {
    constructor(@inject("IHelm") private execHelper: IHelm) {
    }

    configureRouter(router: Router) {
        router.get("/install", this.install);
        return router;
    }

    private install(req, res, next) {
        throw new Error("Not Implemented");
    }


}