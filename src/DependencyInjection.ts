import "reflect-metadata";
import { container, DependencyContainer } from "tsyringe";
import logger from "./helpers/Logger";
import ExecHelper from "./helpers/ExecLibHelper";
import HelmRoute from "./routes/HelmRoute";
import KubectlRoute from "./routes/KubectlRoute";
import HealthcheckRoute from "./routes/HealthcheckRoute";

import Helm from "./services/Helm";
import Kubectl from "./services/Kubectl";
import KubeConfiguration from "./services/KubeConfiguration";
import RepositoryConfiguration from "./services/RepositoryConfiguration";
import RegistryConfiguration from "./services/RegistryConfiguration";
import Server from "./server/Server";
import { ICustomRoute } from "./types";
import Startup from "./Startup";

export class DependencyInjection {

    private container: DependencyContainer;

    constructor() {
        this.container = container;
    }

    setup() {
        // Startup
        container.register("IStartup", { useClass: Startup });

        // Server
        container.register("IServer", { useClass: Server });

        // Helpers
        container.register("IExecHelper", { useClass: ExecHelper });
        container.register("Logger", { useValue: logger })

        // Services
        container.register("IHelm", { useClass: Helm });
        container.register("IKubectl", { useClass: Kubectl });
        container.register("IKubeConfiguration", { useClass: KubeConfiguration });
        container.register("IRepositoryConfiguration", { useClass: RepositoryConfiguration });
        container.register("IRegistryConfiguration", { useClass: RegistryConfiguration });

        // Routes
        container.register("IHelmRoute", { useClass: HelmRoute });
        container.register("IKubectlRoute", { useClass: KubectlRoute });
        container.register("IHeathcheckRoute", { useClass: HealthcheckRoute });

        // Injecting Routes for Express
        const Routes = [
            "IHelmRoute",
            "IHeathcheckRoute",
            "IKubectlRoute"
        ];
        var customRoutes = Routes.map(route => Instance.getContainer().resolve<ICustomRoute>(route));
        container.register("CustomRoutes", { useValue: customRoutes })
    }

    getContainer(): DependencyContainer {
        return this.container;
    }
}

const Instance = new DependencyInjection()

export default Instance;