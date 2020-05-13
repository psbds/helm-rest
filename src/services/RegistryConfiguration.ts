import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { IHelm, IRegistryConfiguration } from "../types";

@injectable()
export default class RegistryConfiguration implements IRegistryConfiguration {

    constructor(@inject("IHelm") private helm: IHelm) {

    }

    async setupRegistries(registryies: string) {
        if (registryies) {
            var registryList = registryies.split(",");
            for (var registry of registryList) {
                var [credentials, registryUrl] = registry.split("=");
                var [registryUsername, registryPassword] = credentials.split(":");
                if (!registryUsername || !registryPassword || !registryUrl) {
                    throw new Error("Registry string not parseable.");
                }
                console.log(`Adding Repository: ${registryUsername} -> ${registryUrl}`);
                var result = await this.helm.registryLogin(registryUrl, registryUsername, registryPassword);
                console.log(result);
            }
        }
    }
}