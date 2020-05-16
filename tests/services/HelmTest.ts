//# Imports Default
import "reflect-metadata";
import { expect } from 'chai';
import 'mocha';
import { StubbedInstance, stubInterface as StubInterface } from "ts-sinon";

//# Imports
import { IExecHelper } from "../../src/types";
import Helm from "../../src/services/Helm";
import { Logger } from "winston";

describe('Services: Helm', () => {
    let successResult: Promise<{ stdout: string; stderr: string; }>;
    let execHelperStub: StubbedInstance<IExecHelper>;
    let loggerStub: StubbedInstance<Logger>;
    let helm: Helm;
    beforeEach(() => {
        execHelperStub = StubInterface<IExecHelper>();
        loggerStub = StubInterface<Logger>();
        helm = new Helm(execHelperStub, loggerStub);
        successResult = Promise.resolve({ stdout: "Success", stderr: null });
    });

    describe('install', () => {
        it('should run install command with args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm install nginx stable\\nginx --anything").returns(successResult);

            await expect(helm.install("nginx", "stable\\nginx", "--anything")).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run install command without args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm install nginx stable\\nginx").returns(successResult);

            await expect(helm.install("nginx", "stable\\nginx", null)).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should log the install command', async () => {
            execHelperStub.exec.returns(successResult);
            var spyLogger = loggerStub.log.withArgs({ level: "info", message: "helm install nginx stable\\nginx --anything" });

            await helm.install("nginx", "stable\\nginx", "--anything");

            expect(spyLogger.calledOnce).equals(true);
        });
    });

    describe('list', () => {
        it('should run list command with args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm list --anything").returns(successResult);

            await expect(helm.list("--anything")).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run list command without args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm list").returns(successResult);

            await expect(helm.list(null)).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should log the list command', async () => {
            execHelperStub.exec.returns(successResult);
            var spyLogger = loggerStub.log.withArgs({ level: "info", message: "helm list" });

            await helm.list(null);

            expect(spyLogger.calledOnce).equals(true);
        });
    });

    describe('upgrade', () => {
        it('should run upgrade command with args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm upgrade nginx stable\\nginx --anything").returns(successResult);

            await expect(helm.upgrade("nginx", "stable\\nginx", "--anything")).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run upgrade command without args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm upgrade nginx stable\\nginx").returns(successResult);

            await expect(helm.upgrade("nginx", "stable\\nginx", null)).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should log the upgrade command', async () => {
            execHelperStub.exec.returns(successResult);
            var spyLogger = loggerStub.log.withArgs({ level: "info", message: "helm upgrade nginx stable\\nginx" });

            await helm.upgrade("nginx", "stable\\nginx", null);
            expect(spyLogger.calledOnce).equals(true);
        });
    });

    describe('delete', () => {
        it('should run delete command with args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm delete nginx --anything").returns(successResult);

            await expect(helm.delete("nginx", "--anything")).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run delete command with args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm delete nginx").returns(successResult);

            await expect(helm.delete("nginx", null)).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should log the delete command', async () => {
            execHelperStub.exec.returns(successResult);
            var spyLogger = loggerStub.log.withArgs({ level: "info", message: "helm delete nginx" });

            await helm.delete("nginx", null);
            expect(spyLogger.calledOnce).equals(true);
        });
    });

    describe('rollback', () => {
        it('should run rollback command with args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm rollback nginx 0 --anything").returns(successResult);

            await expect(helm.rollback("nginx", "0", "--anything")).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run rollback command without args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm rollback nginx 0").returns(successResult);

            await expect(helm.rollback("nginx", "0", null)).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should log the rollback command', async () => {
            execHelperStub.exec.returns(successResult);
            var spyLogger = loggerStub.log.withArgs({ level: "info", message: "helm rollback nginx 0" });

            await helm.rollback("nginx", "0", null);
            expect(spyLogger.calledOnce).equals(true);
        });
    });

    describe('get', () => {
        it('should run get command with args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm get all nginx --anything").returns(successResult);

            await expect(helm.get("all", "nginx", "--anything")).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run get command without args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm get all nginx").returns(successResult);

            await expect(helm.get("all", "nginx", null)).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should log the get command', async () => {
            execHelperStub.exec.returns(successResult);
            var spyLogger = loggerStub.log.withArgs({ level: "info", message: "helm get all nginx" });

            await helm.get("all", "nginx", null);
            expect(spyLogger.calledOnce).equals(true);
        });
    });

    describe('repoAdd', () => {
        it('should run repo add command without args & credentials parameters and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm repo add nginx nginx.url").returns(successResult);

            await expect(helm.repoAdd("nginx", "nginx.url", null, null, null)).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run repo add command with credentials parameters', async () => {
            var spy = execHelperStub.exec.withArgs("helm repo add nginx nginx.url --username username --password password").returns(successResult);

            await expect(helm.repoAdd("nginx", "nginx.url", "username", "password", null)).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run repo add command with args parameters', async () => {
            var spy = execHelperStub.exec.withArgs("helm repo add nginx nginx.url --anything").returns(successResult);

            await expect(helm.repoAdd("nginx", "nginx.url", null, null, "--anything")).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should log the repo add command', async () => {
            execHelperStub.exec.returns(successResult);
            var spyLogger = loggerStub.log.withArgs({ level: "info", message: "helm repo add nginx nginx.url" });

            await helm.repoAdd("nginx", "nginx.url", null, null, null);
            expect(spyLogger.calledOnce).equals(true);
        });
    });

    describe('repoUpdate', () => {
        it('should run repo update command with args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm repo update --anything").returns(successResult);

            await expect(helm.repoUpdate("--anything")).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run repo update command without args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm repo update").returns(successResult);

            await expect(helm.repoUpdate(null)).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should log the repo update command', async () => {
            execHelperStub.exec.returns(successResult);
            var spyLogger = loggerStub.log.withArgs({ level: "info", message: "helm repo update" });

            await helm.repoUpdate(null);
            expect(spyLogger.calledOnce).equals(true);
        });
    });

    describe('registryLogin', () => {
        it('should run registry login command with args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("export HELM_EXPERIMENTAL_OCI=1 && helm registry login host --username user --password password --anything").returns(successResult);

            await expect(helm.registryLogin("host", "user", "password", "--anything")).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should run registry login command without args parameter and return result', async () => {
            var spy = execHelperStub.exec.withArgs("export HELM_EXPERIMENTAL_OCI=1 && helm registry login host --username user --password password").returns(successResult);

            await expect(helm.registryLogin("host", "user", "password", null)).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should log the registry login command', async () => {
            execHelperStub.exec.returns(successResult);
            var spyLogger = loggerStub.log.withArgs({ level: "info", message: "export HELM_EXPERIMENTAL_OCI=1 && helm registry login host --username user --password password" });

            await helm.registryLogin("host", "user", "password", null);
            expect(spyLogger.calledOnce).equals(true);
        });
    });

    describe('command', () => {
        it('should run command command and return result', async () => {
            var spy = execHelperStub.exec.withArgs("helm version").returns(successResult);

            await expect(helm.command("version")).to.eventually.equal("Success");
            expect(spy.calledOnce).equals(true);
        });

        it('should log the command', async () => {
            execHelperStub.exec.returns(successResult);
            var spyLogger = loggerStub.log.withArgs({ level: "info", message: "helm version" });

            await helm.command("version");
            expect(spyLogger.calledOnce).equals(true);
        });
    });
});