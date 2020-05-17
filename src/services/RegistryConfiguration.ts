import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { Logger } from "winston";
import { IHelm, IRegistryConfiguration } from "../types";

@injectable()
export default class RegistryConfiguration implements IRegistryConfiguration {

    constructor(@inject("IHelm") private helm: IHelm, @inject("Logger") private logger: Logger) {

    }

    async setupRegistries(registries: string) {
        if (registries) {
            var registryList = registries.split(",");
            for (var registry of registryList) {
                var [credentials, registryUrl] = registry.split("=");
                var { username, password } = this.getCredentials(credentials);
                if (!username || !password || !registryUrl) {
                    throw new Error("Registry string not parseable.");
                }
                this.log(`Adding Registry: ${username} -> ${registryUrl}`);
                var result = await this.helm.registryLogin(registryUrl, username, password);
                this.log(result);
            }
        }
    }

    private getCredentials(credentialString: string): { username: string; password: string; } {
        var [username, password] = credentialString.split(":")
        return { username, password };
    }

    private log(logMessage: string) {
        this.logger.log({ level: "info", message: logMessage });
    }
}