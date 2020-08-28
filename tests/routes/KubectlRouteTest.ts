//# Imports Default
import "reflect-metadata";
import { expect } from 'chai';
import 'mocha';
import { StubbedInstance, stubInterface as StubInterface } from "ts-sinon";
import { Application } from "express";

//# Imports
import { IKubectl, ICustomRoute } from "../../src/types";
import KubectlRoute from "../../src/routes/KubectlRoute";

import RouteTestServer from "./_RouteTestServer";
var request = require('supertest');

describe('Routes: KubectlRoute', () => {
    let kubectlStub: StubbedInstance<IKubectl>;
    let testServer: Application;
    let kubectlRoute: KubectlRoute;
    beforeEach(() => {
        kubectlStub = StubInterface<IKubectl>();
        kubectlRoute = new KubectlRoute(kubectlStub);
        var routes: ICustomRoute[] = [kubectlRoute];
        testServer = RouteTestServer.get(routes);
    })

    describe('POST /kubectl/command', () => {
        const PATH = '/kubectl/command';
        it('200: should run custom command and return result', async () => {
            var spy = kubectlStub.command.withArgs("command").returns(Promise.resolve("successfull result"));

            var result = await request(testServer)
                .post(PATH)
                .send({ command: "command" })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(result.body).equals("successfull result");
            expect(spy.calledOnce).equals(true);
        });

        it('500: should return errors message from not provided required parameters', async () => {
            var result = await request(testServer)
                .post(PATH)
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.validation.some(x => x == "command should not be empty")).equals(true);
        });

        it('500: should return error message when error running get command', async () => {
            var spy = kubectlStub.command.throws(new Error("error result"));

            var result = await request(testServer)
                .post(PATH)
                .send({ command: "command" })
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.message).equals("error result");
            expect(spy.calledOnce).equals(true);
        });
    });
});