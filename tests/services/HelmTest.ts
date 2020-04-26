//# Imports Default
import "reflect-metadata";
import { expect } from 'chai';
import 'mocha';
import { StubbedInstance, stubInterface as StubInterface } from "ts-sinon";

//# Imports
import { IExecHelper } from "../../src/types";
import Helm from "../../src/services/Helm";

describe('Helm', () => {
    let execHelperStub: StubbedInstance<IExecHelper>;
    beforeEach(() => {
        execHelperStub = StubInterface<IExecHelper>();
    })

    describe('install', () => {
        it('should run install command and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm install nginx stable\\nginx").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.install("nginx", "stable\\nginx", undefined);

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });
});