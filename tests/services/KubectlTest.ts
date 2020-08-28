//# Imports Default
import "reflect-metadata";
import { expect } from 'chai';
import 'mocha';
import { StubbedInstance, stubInterface as StubInterface } from "ts-sinon";

//# Imports
import { IExecHelper } from "../../src/types";
import Kubectl from "../../src/services/Kubectl";
import { Logger } from "winston";

describe('Services: Kubectl', () => {
    let successResult: Promise<{ stdout: string; stderr: string; }>;
    let execHelperStub: StubbedInstance<IExecHelper>;
    let loggerStub: StubbedInstance<Logger>;
    let kubectl: Kubectl;
    beforeEach(() => {
        execHelperStub = StubInterface<IExecHelper>();
        loggerStub = StubInterface<Logger>();
        kubectl = new Kubectl(execHelperStub, loggerStub);
        successResult = Promise.resolve({ stdout: "Success", stderr: null });
    });

    describe('command', () => {
        it('should run command command and return result', async () => {
            var spy = execHelperStub.exec.withArgs("kubectl version").returns(successResult);

            await expect(kubectl.command("version")).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should log the command', async () => {
            execHelperStub.exec.returns(successResult);
            var spyLogger = loggerStub.log.withArgs({ level: "info", message: "kubectl version" });

            await kubectl.command("version");
            expect(spyLogger.calledOnce).equals(true);
        });
    });
});