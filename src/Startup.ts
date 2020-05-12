import { DependencyInjection } from "./DependencyInjection";
import { default as DISingleton } from "./DependencyInjection";

import { IKubeConfiguration, IRepositoryConfiguration } from "./types";
const dotenv = require("dotenv");
import { Server } from "./server/Server";

export default class Startup {
    constructor(private DependencyInstance?: DependencyInjection, private server?: Server) {
        if (this.DependencyInstance == null) {
            this.DependencyInstance = DISingleton;
        }
        if (this.server == null) {
            this.server = new Server(this.DependencyInstance);
        }
    }

    async main(): Promise<void> {
        console.log(`Starting process using NODE_ENV: ${process.env.NODE_ENV}`);
        if (process.env.NODE_ENV == "development") {
            dotenv.config();
        }

        this.DependencyInstance.setup();
        const container = this.DependencyInstance.getContainer();

        var kubeConfiguration = container.resolve<IKubeConfiguration>("IKubeConfiguration");
        var repositoryConfiguration = container.resolve<IRepositoryConfiguration>("IRepositoryConfiguration");

        await kubeConfiguration.setupKubeConfig(process.env.kubeconfig);
        await repositoryConfiguration.setupRepositories(process.env.repositories);
        
        this.server.createAppWithRoutes();
        this.server.startServer();
    }
}