import "reflect-metadata";
import { container, DependencyContainer } from "tsyringe";
import logger from "./helpers/Logger";
import ExecHelper from "./helpers/ExecLibHelper";
import HelmRoute from "./routes/HelmRoute";

import Helm from "./services/Helm";
import KubeConfiguration from "./services/KubeConfiguration";
import RepositoryConfiguration from "./services/RepositoryConfiguration";
import RegistryConfiguration from "./services/RegistryConfiguration";

import { ICustomRoute } from "./types";

export class DependencyInjection {

    private container: DependencyContainer;

    constructor() {
        this.container = container;
    }

    setup() {
        // Helpers
        container.register("IExecHelper", { useClass: ExecHelper });
        container.register("Logger", { useValue: logger })

        // Services
        container.register("IHelm", { useClass: Helm });
        container.register("IKubeConfiguration", { useClass: KubeConfiguration });
        container.register("IRepositoryConfiguration", { useClass: RepositoryConfiguration });
        container.register("IRegistryConfiguration", { useClass: RegistryConfiguration });

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