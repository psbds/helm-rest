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
import RegistryConfiguration from "../../src/services/RegistryConfiguration";

describe('Services: RegistryConfiguration', () => {
    let helmStub: StubbedInstance<IHelm>;
    beforeEach(() => {
        helmStub = StubInterface<IHelm>();
    })

    describe('setupRegistries', () => {
        it('should add default registries from environment file', async () => {
            var registries = "user1:password1=host1,user2:password2=host2"

            var registryConfiguration = new RegistryConfiguration(helmStub);

            var spy = helmStub.registryLogin.withArgs("host1", "user1", "password1").returns(Promise.resolve("Success"));
            var spy2 = helmStub.registryLogin.withArgs("host2", "user2", "password2").returns(Promise.resolve("Success"));

            await registryConfiguration.setupRegistries(registries);

            expect(spy.calledOnce).equals(true, "Should call registry login for the first registry");
            expect(spy2.calledOnce).equals(true, "Should call registry login for the second repository");
        });

        it('should throw an error if string is not parseable', async () => {
            var registries = "2bb973e99c0a49748e9d03fe4bf0404d"

            var registryConfiguration = new RegistryConfiguration(helmStub);

            var spy = helmStub.registryLogin.returns(Promise.resolve("Success"));

            await expect(registryConfiguration.setupRegistries(registries)).to.eventually.be.rejectedWith("Registry string not parseable.")

            expect(spy.calledOnce).equals(false, "Should not call repo add");
        });

        it('should skip method if argument is empty', async () => {
            var registries = ""

            var registryConfiguration = new RegistryConfiguration(helmStub);

            var spy = helmStub.registryLogin.returns(Promise.resolve("Success"));

            await registryConfiguration.setupRegistries(registries);

            expect(spy.calledOnce).equals(false, "Should not call repo add");
        });
    });
});