import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { IHelm, IExecHelper } from "../types";

@injectable()
export default class Helm implements IHelm {

    constructor(@inject("IExecHelper") private execHelper: IExecHelper) {

    }

    async command(command: string): Promise<string> {
        let commandResult = await this.execHelper.exec(`helm ${command}`.trim());
        return commandResult.stdout;
    }

    async list(args: string): Promise<string> {
        let commandResult = await this.execHelper.exec(`helm list ${args ? args : ""}`.trim());
        return commandResult.stdout;
    }

    async install(releaseName: string, chart: string, args?: string): Promise<string> {
        let commandResult = await this.execHelper.exec(`helm install ${releaseName} ${chart} ${args ? args : ""}`.trim());
        return commandResult.stdout;
    }

    async upgrade(releaseName: string, chart: string, args: string): Promise<string> {
        let commandResult = await this.execHelper.exec(`helm upgrade ${releaseName} ${chart} ${args ? args : ""}`.trim());
        return commandResult.stdout;
    }

    async delete(releaseName: string, args?: string): Promise<string> {
        let commandResult = await this.execHelper.exec(`helm delete ${releaseName} ${args ? args : ""}`.trim());
        return commandResult.stdout;
    }

    async rollback(releaseName: string, revision: string, args?: string): Promise<string> {
        let commandResult = await this.execHelper.exec(`helm rollback ${releaseName} ${revision} ${args ? args : ""}`.trim());
        return commandResult.stdout;
    }

    async get(subcommand: string, releaseName: string, args?: string): Promise<string> {
        let commandResult = await this.execHelper.exec(`helm get ${subcommand} ${releaseName} ${args ? args : ""}`.trim());
        return commandResult.stdout;
    }

    async repoAdd(repoName: string, repoUrl: string, args?: string): Promise<string> {
        let commandResult = await this.execHelper.exec(`helm repo add ${repoName} ${repoUrl} ${args ? args : ""}`.trim());
        return commandResult.stdout;
    }

    async repoUpdate(args?: string): Promise<string> {
        let commandResult = await this.execHelper.exec(`helm repo update ${args ? args : ""}`.trim());
        return commandResult.stdout;
    }

    async registryLogin(host: string, username: string, password: string, args?: string): Promise<string> {
        let commandResult = await this.execHelper.exec(`export HELM_EXPERIMENTAL_OCI=1 && helm registry login ${host} --username ${username} --password ${password} ${args ? args : ""}`.trim());
        return commandResult.stdout;
    }

}