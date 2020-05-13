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

                let result: string;
                if (repositoryUrl.match(/@/g)) {
                    let { username, password, host } = this.splitCredentialsAndUrl(repositoryUrl);
                    result = await this.helm.repoAdd(repositoryName, host, username, password);
                } else {
                    result = await this.helm.repoAdd(repositoryName, repositoryUrl, null, null);
                }
                console.log(result);
            }
        }
    }



    private splitCredentialsAndUrl(hostString: string): { username: string; password: string; host: string; } {
        var [credentials, host] = hostString.split("@");

        var [username, password] = credentials.split(":");

        return { username, password, host };
    }
}