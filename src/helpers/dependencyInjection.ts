import "reflect-metadata";
import { container, Lifecycle } from "tsyringe";

import Helm from "../services/Helm";
import ExecHelper from "./execHelper";
import HelmRoute from "../routes/HelmRoute";

// Helpers
container.register("IExecHelper", { useClass: ExecHelper });

// Services
container.register("IHelm", { useClass: Helm });

// Routes
container.register("IHelmRoute", { useClass: HelmRoute });

export default container;

export var Routes = [
    "IHelmRoute"
];