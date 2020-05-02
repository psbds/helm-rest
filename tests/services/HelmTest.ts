//# Imports Default
import "reflect-metadata";
import { expect } from 'chai';
import 'mocha';
import { StubbedInstance, stubInterface as StubInterface } from "ts-sinon";

//# Imports
import { IExecHelper } from "../../src/types";
import Helm from "../../src/services/Helm";

describe('Services: Helm', () => {
    let execHelperStub: StubbedInstance<IExecHelper>;
    beforeEach(() => {
        execHelperStub = StubInterface<IExecHelper>();
    })

    describe('install', () => {
        it('should run install command with args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm install nginx stable\\nginx --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.install("nginx", "stable\\nginx", "--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run install command without args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm install nginx stable\\nginx").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.install("nginx", "stable\\nginx", null);

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('list', () => {
        it('should run list command with args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm list --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.list("--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run list command without args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm list").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.list(null);

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('upgrade', () => {
        it('should run upgrade command with args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm upgrade nginx stable\\nginx --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.upgrade("nginx", "stable\\nginx", "--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run upgrade command without args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm upgrade nginx stable\\nginx").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.upgrade("nginx", "stable\\nginx", null);

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('delete', () => {
        it('should run delete command with args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm delete nginx --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.delete("nginx", "--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run delete command with args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm delete nginx").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.delete("nginx", null);

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('rollback', () => {
        it('should run rollback command with args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm rollback nginx 0 --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.rollback("nginx", "0", "--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run rollback command without args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm rollback nginx 0").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.rollback("nginx", "0", null);

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('get', () => {
        it('should run get command with args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm get all nginx --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.get("all", "nginx", "--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run get command without args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm get all nginx").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.get("all", "nginx", null);

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('repoAdd', () => {
        it('should run repo add command with args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm repo add nginx nginx.url --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.repoAdd("nginx", "nginx.url", "--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run repo add command without args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm repo add nginx nginx.url").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.repoAdd("nginx", "nginx.url", null);

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('repoUpdate', () => {
        it('should run repo update command with args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm repo update --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.repoUpdate("--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run repo update command without args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm repo update").returns(Promise.resolve({ stdout: "Success", stderr: null }));

            var response = await helm.repoUpdate(null);

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('registryLogin', () => {
        it('should run registry login command with args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm registry login host --username user --password password --anything").returns(Promise.resolve({ stdout: "Success", stderr: null }));
            var response = await helm.registryLogin("host", "user", "password", "--anything");

            expect(response).equals("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run registry login command without args parameter and return result', async () => {
            var helm = new Helm(execHelperStub);

            var spy = execHelperStub.exec.withArgs("helm registry login host --username user --password password").returns(Promise.resolve({ stdout: "Success", stderr: null }));
            var response = await helm.registryLogin("host", "user", "password", null);

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