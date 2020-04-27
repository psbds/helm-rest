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

            var spy = execHelperStub.exec.withArgs("helm install nginx stable\\nginx --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.install("nginx", "stable\\nginx", "--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('upgrade', () => {
        it('should run upgrade command and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm upgrade nginx stable\\nginx --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.upgrade("nginx", "stable\\nginx", "--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('delete', () => {
        it('should run delete command and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm delete nginx --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.delete("nginx", "--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('rollback', () => {
        it('should run rollback command and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm rollback nginx 0 --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.rollback("nginx", "0", "--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('getAll', () => {
        it('should run getAll command and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm get all nginx --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.getAll("nginx", "--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('repoAdd', () => {
        it('should run repo add command and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm repo add nginx nginx.url --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.repoAdd("nginx", "nginx.url", "--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('repoUpdate', () => {
        it('should run repo update command and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm repo update --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.repoUpdate("--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('registryLogin', () => {
        it('should run registry login command and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm registry login host --username user --password password --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));
            var response = await helm.registryLogin("host", "user", "password", "--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('command', () => {
        it('should run command command and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm version").returns(Promise.resolve({ stdout: "Success", stderr: null }));
            var response = await helm.command("version");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });
});