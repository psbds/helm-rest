const dotenv = require("dotenv");
import { injectable, inject } from "tsyringe";

import { IKubeConfiguration, IRepositoryConfiguration, IRegistryConfiguration, IServer } from "./types";

@injectable()
export default class Startup {
    constructor(
        @inject("IServer") private server: IServer,
        @inject("IKubeConfiguration") private kubeConfiguration: IKubeConfiguration,
        @inject("IRepositoryConfiguration") private repositoryConfiguration: IRepositoryConfiguration,
        @inject("IRegistryConfiguration") private registryConfiguration: IRegistryConfiguration) {

    }

    async main(): Promise<void> {
        console.log(`Starting process using NODE_ENV: ${process.env.NODE_ENV}`);
        if (process.env.NODE_ENV == "development") {
            dotenv.config();
        }

        await this.registryConfiguration.setupRegistries(process.env.registries);
        await this.kubeConfiguration.setupKubeConfig(process.env.kubeconfig);
        await this.repositoryConfiguration.setupRepositories(process.env.repositories);

        this.server.createAppWithRoutes();
        this.server.startServer();
    }
}