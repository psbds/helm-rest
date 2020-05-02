//# Imports Default
import "reflect-metadata";
import 'mocha';
import { expect } from 'chai';
import * as chai from "chai";
import { StubbedInstance, stubInterface as StubInterface } from "ts-sinon";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

//# Imports
import { IExecHelper } from "../../src/types";
import KubeConfiguration from "../../src/services/KubeConfiguration";

describe('Services: KubeConfiguration', () => {
    let execHelperStub: StubbedInstance<IExecHelper>;
    beforeEach(() => {
        execHelperStub = StubInterface<IExecHelper>();
    })

    describe('setupKubeConfig', () => {
        it('should execute commands to create folder and create kubeconfig file from provided string', async () => {
            var kubeConfiguration = new KubeConfiguration(execHelperStub);

            var spy1 = execHelperStub.exec.withArgs("rm -rf ~/.kube && mkdir ~/.kube").returns(Promise.resolve({ stdout: "success", stderr: null }));
            var spy2 = execHelperStub.exec.withArgs(`echo "kubefile" | base64 -d > ~/.kube/config`).returns(Promise.resolve({ stdout: "success", stderr: null }));

            await kubeConfiguration.setupKubeConfig("kubefile");

            expect(spy1.calledOnce).equals(true, "Create Folder Error");
            expect(spy2.calledOnce).equals(true, "Create KubeConfig Error");

        });

        it('should throw invalid configuration if kubeconfig is not set', async () => {
            var kubeConfiguration = new KubeConfiguration(execHelperStub);

            await expect(kubeConfiguration.setupKubeConfig(null)).to.eventually.be.rejectedWith("process.env.kubeconfig not set, the process will exit now.");

        });
    });
});