//# Imports Default
import "reflect-metadata";
import { expect } from 'chai';
import 'mocha';
import { StubbedInstance, stubInterface as StubInterface, } from "ts-sinon";

//# Imports

import Startup from "../../src/Startup"
import { DependencyInjection } from "../../src/DependencyInjection";
import { DependencyContainer, } from "tsyringe";
import { IKubeConfiguration, IRepositoryConfiguration, IRegistryConfiguration } from "../../src/types";
import { Server } from "../../src/server/Server";

describe('Startup: Startup', () => {
    beforeEach(() => {

    })

    describe('install', () => {
        it('should run install command with args parameter and return result', async () => {

            let dependencyInjectionStub: StubbedInstance<DependencyInjection> = StubInterface<DependencyInjection>();
            let containerStub: StubbedInstance<DependencyContainer> = StubInterface<DependencyContainer>();
            let kubeConfigurationStub: StubbedInstance<IKubeConfiguration> = StubInterface<IKubeConfiguration>();
            let repositoryConfigurationStub: StubbedInstance<IRepositoryConfiguration> = StubInterface<IRepositoryConfiguration>();
            let registryConfigurationStub: StubbedInstance<IRegistryConfiguration> = StubInterface<IRegistryConfiguration>();
            let serverStub: StubbedInstance<Server> = StubInterface<Server>();

            dependencyInjectionStub.getContainer.returns(containerStub)
            containerStub.resolve.withArgs("IKubeConfiguration").returns(kubeConfigurationStub);
            containerStub.resolve.withArgs("IRepositoryConfiguration").returns(repositoryConfigurationStub);
            containerStub.resolve.withArgs("IRegistryConfiguration").returns(registryConfigurationStub);

            process.env.kubeconfig = "kubeconfig";
            process.env.repositories = "repositories";
            process.env.registries = "registries";

            var kubeConfigurationSpy = kubeConfigurationStub.setupKubeConfig.withArgs(process.env.kubeconfig);
            var registryConfigurationSpy = registryConfigurationStub.setupRegistries.withArgs(process.env.registries);
            var repositoryConfigurationSpy = repositoryConfigurationStub.setupRepositories.withArgs(process.env.repositories);
            var serverStartSpy = serverStub.startServer;
            var serverCreateAppSpy = serverStub.createAppWithRoutes;

            var startup = new Startup(dependencyInjectionStub, serverStub);

            await startup.main();

            expect(kubeConfigurationSpy.calledOnce).equals(true);
            expect(repositoryConfigurationSpy.calledOnce).equals(true);
            expect(registryConfigurationSpy.calledOnce).equals(true);
            expect(serverCreateAppSpy.calledOnce).equals(true);
            expect(serverStartSpy.calledOnce).equals(true);

        });
    });
});