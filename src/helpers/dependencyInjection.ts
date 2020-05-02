import "reflect-metadata";
import { container, Lifecycle } from "tsyringe";

import ExecHelper from "./ExecLibHelper";
import HelmRoute from "../routes/HelmRoute";

import Helm from "../services/Helm";
import KubeConfiguration from "../services/KubeConfiguration";

export function setup() {
    // Helpers
    container.register("IExecHelper", { useClass: ExecHelper });

    // Services
    container.register("IHelm", { useClass: Helm });
    container.register("IKubeConfiguration", { useClass: KubeConfiguration });

    // Routes
    container.register("IHelmRoute", { useClass: HelmRoute });

    return container;
}


export default container;

export var Routes = [
    "IHelmRoute"
];