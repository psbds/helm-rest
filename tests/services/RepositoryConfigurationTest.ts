//# Imports Default
import "reflect-metadata";
import { expect } from 'chai';
import 'mocha';
import { StubbedInstance, stubInterface as StubInterface } from "ts-sinon";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

//# Imports
import { IHelm } from "../../src/types";
import RepositoryConfiguration from "../../src/services/RepositoryConfiguration";

describe('Services: RepositoryConfiguration', () => {
    let helmStub: StubbedInstance<IHelm>;
    beforeEach(() => {
        helmStub = StubInterface<IHelm>();
    })

    describe('setupRepositories', () => {
        it('should add default repositories from environment file', async () => {
            var repositories = "stable=https://kubernetes-charts.storage.googleapis.com,bitnami=https://charts.bitnami.com/bitnami"

            var repositoryConfiguration = new RepositoryConfiguration(helmStub);

            var spy = helmStub.repoAdd.withArgs("stable", "https://kubernetes-charts.storage.googleapis.com", null, null).returns(Promise.resolve("Success"));
            var spy2 = helmStub.repoAdd.withArgs("bitnami", "https://charts.bitnami.com/bitnami", null, null).returns(Promise.resolve("Success"));

            await repositoryConfiguration.setupRepositories(repositories);

            expect(spy.calledOnce).equals(true, "Should call repo add for the first repository");
            expect(spy2.calledOnce).equals(true, "Should call repo add for the second repository");
        });

        it('should add default repositories from environment file with credentials', async () => {
            var repositories = "stable=https://kubernetes-charts.storage.googleapis.com,bitnami=username:password@https://charts.bitnami.com/bitnami"

            var repositoryConfiguration = new RepositoryConfiguration(helmStub);

            var spy = helmStub.repoAdd.withArgs("stable", "https://kubernetes-charts.storage.googleapis.com", null, null).returns(Promise.resolve("Success"));
            var spy2 = helmStub.repoAdd.withArgs("bitnami", "https://charts.bitnami.com/bitnami", "username", "password").returns(Promise.resolve("Success"));

            await repositoryConfiguration.setupRepositories(repositories);

            expect(spy.calledOnce).equals(true, "Should call repo add for the first repository");
            expect(spy2.calledOnce).equals(true, "Should call repo add for the second repository");
        });

        it('should throw an error if string is not parseable', async () => {
            var repositories = "2bb973e99c0a49748e9d03fe4bf0404d"

            var repositoryConfiguration = new RepositoryConfiguration(helmStub);

            var spy = helmStub.repoAdd.returns(Promise.resolve("Success"));

            await expect(repositoryConfiguration.setupRepositories(repositories)).to.eventually.be.rejectedWith("Repository string not parseable.")

            expect(spy.calledOnce).equals(false, "Should not call repo add");
        });

        it('should skip method if argument is empty', async () => {
            var repositories = ""

            var repositoryConfiguration = new RepositoryConfiguration(helmStub);

            var spy = helmStub.repoAdd.returns(Promise.resolve("Success"));

            await repositoryConfiguration.setupRepositories(repositories);

            expect(spy.calledOnce).equals(false, "Should not call repo add");
        });
    });
});