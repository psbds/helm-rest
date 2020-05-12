import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { IHelm, IRepositoryConfiguration } from "../types";

@injectable()
export default class RepositoryConfiguration implements IRepositoryConfiguration {

    constructor(@inject("IHelm") private helm: IHelm) {

    }

    async setupRepositories(repositories: string) {
        if (repositories) {
            var repositoryList = repositories.split(",");
            for (var repository of repositoryList) {
                var [repositoryName, repositoryUrl] = repository.split("=");
                if (!repositoryName || !repositoryUrl) {
                    throw new Error("Repository string not parseable.");
                }
                console.log(`Adding Repository: ${repositoryName} -> ${repositoryUrl}`);
                var result = await this.helm.repoAdd(repositoryName, repositoryUrl);
                console.log(result);
            }
        }
    }
}