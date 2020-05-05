import "reflect-metadata";
import { container, DependencyContainer } from "tsyringe";

import ExecHelper from "./helpers/ExecLibHelper";
import HelmRoute from "./routes/HelmRoute";

import Helm from "./services/Helm";
import KubeConfiguration from "./services/KubeConfiguration";
import { ICustomRoute } from "./types";

export class DependencyInjection {

    private container: DependencyContainer;

    constructor() {
        this.container = container;
    }

    setup() {
        // Helpers
        container.register("IExecHelper", { useClass: ExecHelper });

        // Services
        container.register("IHelm", { useClass: Helm });
        container.register("IKubeConfiguration", { useClass: KubeConfiguration });

        // Routes
        container.register("IHelmRoute", { useClass: HelmRoute });
    }

    getContainer(): DependencyContainer {
        return this.container;
    }

    getCustomRoutes(): ICustomRoute[] {
        const Routes = [
            "IHelmRoute"
        ];
        var customRoutes = Routes.map(route => Instance.getContainer().resolve<ICustomRoute>(route));

        return customRoutes;
    }

}

const Instance = new DependencyInjection()

export default Instance;