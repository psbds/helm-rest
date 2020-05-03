//# Imports Default
import "reflect-metadata";
import { expect } from 'chai';
import 'mocha';
import { StubbedInstance, stubInterface as StubInterface, } from "ts-sinon";

//# Imports

import Startup from "../../src/startup"
import { DependencyInjection } from "../../src/helpers/dependencyInjection";
import { DependencyContainer, } from "tsyringe";
import { IKubeConfiguration } from "../../src/types";
import { Server } from "../../src/server/server";

describe('Startup: Startup', () => {
    beforeEach(() => {

    })

    describe('install', () => {
        it('should run install command with args parameter and return result', async () => {

            let dependencyInjectionStub: StubbedInstance<DependencyInjection> = StubInterface<DependencyInjection>();
            let containerStub: StubbedInstance<DependencyContainer> = StubInterface<DependencyContainer>();
            let kubeConfigurationStub: StubbedInstance<IKubeConfiguration> = StubInterface<IKubeConfiguration>();
            let serverStub: StubbedInstance<Server> = StubInterface<Server>();

            dependencyInjectionStub.getContainer.returns(containerStub)
            containerStub.resolve.withArgs("IKubeConfiguration").returns(kubeConfigurationStub);

            var kubeConfigurationSpy = kubeConfigurationStub.setupKubeConfig.withArgs(process.env.kubeconfig);
            var serverStartSpy = serverStub.startServer;
            var serverCreateAppSpy = serverStub.createAppWithRoutes;

            var startup = new Startup(dependencyInjectionStub, serverStub);

            await startup.main();

            expect(kubeConfigurationSpy.calledOnce).equals(true);
            expect(serverCreateAppSpy.calledOnce).equals(true);
            expect(serverStartSpy.calledOnce).equals(true);

        });
    });
});