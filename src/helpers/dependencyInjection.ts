import "reflect-metadata";
import { container, DependencyContainer } from "tsyringe";

import ExecHelper from "./ExecLibHelper";
import HelmRoute from "../routes/HelmRoute";

import Helm from "../services/Helm";
import KubeConfiguration from "../services/KubeConfiguration";

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

}

const Instance = new DependencyInjection()

export default Instance;