import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { IHelm, IExecHelper } from "../types";



@injectable()
export default class Helm implements IHelm {

    constructor(@inject("IExecHelper") private execHelper: IExecHelper) {

    }

    async install(releaseName: string, chart: string, args?: string): Promise<string> {
        let commandResult = await this.execHelper.exec(`helm install ${releaseName} ${chart} ${args ? args : ""}`.trim());
        return commandResult.stdout;
    }

}