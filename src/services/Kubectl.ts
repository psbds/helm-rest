import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { Logger } from "winston";

import { IKubectl, IExecHelper } from "../types";

@injectable()
export default class Kubectl implements IKubectl {

    constructor(@inject("IExecHelper") private execHelper: IExecHelper, @inject("Logger") private logger: Logger) {

    }

    async command(command: string): Promise<string> {
        let cmd = `kubectl ${command}`;
        return this.executeComand(cmd);
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