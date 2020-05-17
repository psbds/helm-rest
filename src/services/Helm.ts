import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { Logger } from "winston";

import { IHelm, IExecHelper } from "../types";

@injectable()
export default class Helm implements IHelm {

    constructor(@inject("IExecHelper") private execHelper: IExecHelper, @inject("Logger") private logger: Logger) {

    }

    async command(command: string): Promise<string> {
        let cmd = `helm ${command}`;
        return this.executeComand(cmd);
    }

    async list(args: string): Promise<string> {
        let command = `helm list ${args ? args : ""}`;
        return this.executeComand(command);
    }

    async install(releaseName: string, chart: string, args?: string): Promise<string> {
        let command = `helm install ${releaseName} ${chart} ${args ? args : ""}`;
        return this.executeComand(command);
    }

    async upgrade(releaseName: string, chart: string, args: string): Promise<string> {
        let command = `helm upgrade ${releaseName} ${chart} ${args ? args : ""}`;
        return this.executeComand(command);
    }

    async delete(releaseName: string, args?: string): Promise<string> {
        let command = `helm delete ${releaseName} ${args ? args : ""}`;
        return this.executeComand(command);
    }

    async rollback(releaseName: string, revision: string, args?: string): Promise<string> {
        let command = `helm rollback ${releaseName} ${revision} ${args ? args : ""}`;
        return this.executeComand(command);
    }

    async get(subcommand: string, releaseName: string, args?: string): Promise<string> {
        let command = `helm get ${subcommand} ${releaseName} ${args ? args : ""}`;
        return this.executeComand(command);
    }

    async repoAdd(repoName: string, repoUrl: string, username: string, password: string, args?: string): Promise<string> {
        let command = `helm repo add ${repoName} ${repoUrl}${username ? (" --username " + username) : ""}${password ? (" --password " + password) : ""} ${args || ""}`;
        return this.executeComand(command);
    }

    async repoUpdate(args?: string): Promise<string> {
        let command = `helm repo update ${args ? args : ""}`;
        return this.executeComand(command);
    }

    async registryLogin(host: string, username: string, password: string, args?: string): Promise<string> {
        let command = `export HELM_EXPERIMENTAL_OCI=1 && helm registry login ${host} --username ${username} --password ${password} ${args ? args : ""}`;
        return this.executeComand(command);
    }

    private async executeComand(command: string): Promise<string> {
        command = command.trim();
        this.logCommand(command);
        let commandResult = await this.execHelper.exec(command)
        return commandResult.stdout;
    }

    private logCommand(command: string) {
        this.logger.log({ level: "info", message: command });
    }

}