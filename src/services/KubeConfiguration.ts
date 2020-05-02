import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { IExecHelper, IKubeConfiguration } from "../types";

@injectable()
export default class KubeConfiguration implements IKubeConfiguration {

    constructor(@inject("IExecHelper") private execHelper: IExecHelper) {

    }

    async setupKubeConfig(kubeconfigContent: string): Promise<void> {
        await this.recreateKubeFolder();
        await this.createKubeConfigFile(kubeconfigContent);
    }


    private async recreateKubeFolder(): Promise<{ stdout: string; stderr: string; }> {
        return this.execHelper.exec("rm -rf ~/.kube && mkdir ~/.kube")
    }

    private async createKubeConfigFile(kubeconfig: string): Promise<{ stdout: string; stderr: string; }> {
        if(!kubeconfig){
            throw new Error("process.env.kubeconfig not set, the process will exit now.");
        }
        return this.execHelper.exec(`echo "${kubeconfig}" | base64 -d > ~/.kube/config`)
    }
}