import "reflect-metadata";
import { container, Lifecycle } from "tsyringe";

import Helm from "../services/Helm";
import ExecHelper from "./execHelper";
import HelmRoute from "../routes/HelmRoute";
import RouteInit from "../routes/RouteInit";

// Services
container.register("IHelm", { useClass: Helm });
container.register("IExecHelper", { useClass: ExecHelper });


container.register("IHelmRoute", { useClass: HelmRoute });

container.register("RouteInit", { useClass: RouteInit })

export default container;