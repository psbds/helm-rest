//# Imports Default
import "reflect-metadata";
import { expect } from 'chai';
import 'mocha';
import { StubbedInstance, stubInterface as StubInterface, } from "ts-sinon";

//# Imports

import Startup from "../../src/Startup"
import { DependencyInjection } from "../../src/DependencyInjection";
import { DependencyContainer, } from "tsyringe";
import { IKubeConfiguration, IRepositoryConfiguration, IRegistryConfiguration, IServer } from "../../src/types";

describe('Startup: Startup', () => {
    let kubeConfigurationStub: StubbedInstance<IKubeConfiguration>;
    let repositoryConfigurationStub: StubbedInstance<IRepositoryConfiguration>;
    let registryConfigurationStub: StubbedInstance<IRegistryConfiguration>;
    let serverStub: StubbedInstance<IServer>;

    let startup: Startup;

    beforeEach(() => {
        kubeConfigurationStub = StubInterface<IKubeConfiguration>();
        repositoryConfigurationStub = StubInterface<IRepositoryConfiguration>();
        registryConfigurationStub = StubInterface<IRegistryConfiguration>();
        serverStub = StubInterface<IServer>();

        startup = new Startup(serverStub, kubeConfigurationStub, repositoryConfigurationStub, registryConfigurationStub);
    })

    describe('install', () => {
        it('should run install command with args parameter and return result', async () => {
            process.env.kubeconfig = "kubeconfig";
            process.env.repositories = "repositories";
            process.env.registries = "registries";

            var kubeConfigurationSpy = kubeConfigurationStub.setupKubeConfig.withArgs(process.env.kubeconfig);
            var registryConfigurationSpy = registryConfigurationStub.setupRegistries.withArgs(process.env.registries);
            var repositoryConfigurationSpy = repositoryConfigurationStub.setupRepositories.withArgs(process.env.repositories);
            var serverStartSpy = serverStub.startServer;
            var serverCreateAppSpy = serverStub.createAppWithRoutes;


            await startup.main();

            expect(kubeConfigurationSpy.calledOnce).equals(true);
            expect(repositoryConfigurationSpy.calledOnce).equals(true);
            expect(registryConfigurationSpy.calledOnce).equals(true);
            expect(serverCreateAppSpy.calledOnce).equals(true);
            expect(serverStartSpy.calledOnce).equals(true);

        });
    });
});