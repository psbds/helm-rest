import "reflect-metadata";
import { container, Lifecycle } from "tsyringe";

import Helm from "../services/Helm";
import ExecHelper from "./execHelper";
import HelmRoute from "../routes/HelmRoute";

// Services
container.register("IHelm", { useClass: Helm });
container.register("IExecHelper", { useClass: ExecHelper });


container.register("IHelmRoute", { useClass: HelmRoute });


export default container;