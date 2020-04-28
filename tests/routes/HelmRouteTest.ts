//# Imports Default
import "reflect-metadata";
import { expect } from 'chai';
import 'mocha';
import { StubbedInstance, stubInterface as StubInterface } from "ts-sinon";
import { express } from "express";

//# Imports
import { IHelm } from "../../src/types";
import HelmRoute from "../../src/routes/HelmRoute";

import RouteTestServer from "./_RouteTestServer";
var request = require('supertest');

describe('HelmRoute', () => {
    let helmStub: StubbedInstance<IHelm>;
    let testServer: express.Application;
    let helmRoute: HelmRoute;
    beforeEach(() => {
        helmStub = StubInterface<IHelm>();
        helmRoute = new HelmRoute(helmStub);
        testServer = RouteTestServer.get((app) => {
            helmRoute.configureRouter(app);
        });
    })

    describe('/helm/install', () => {
        it('200: should run install command and return result', async () => {
            var spy = helmStub.install.withArgs("nginx", "stable/nginx", "--dry-run").returns(Promise.resolve("successfull result"));

            var result = await request(testServer)
                .get('/helm/install')
                .send({ releaseName: "nginx", chart: "stable/nginx", args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(result.body).equals("successfull result");
            expect(spy.calledOnce).equals(true);
        });

        it('500: should return errors message from not provided required parameters', async () => {
            var result = await request(testServer)
                .get('/helm/install')
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.validation.some(x => x == "releaseName should not be empty")).equals(true);
            expect(result.body.validation.some(x => x == "chart should not be empty")).equals(true);
        });

        it('500: should run broken install command and return error message', async () => {
            var spy = helmStub.install.withArgs("nginx", "stable/nginx", "--dry-run").throws(new Error("error result"));

            var result = await request(testServer)
                .get('/helm/install')
                .send({ releaseName: "nginx", chart: "stable/nginx", args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.message).equals("error result");
            expect(spy.calledOnce).equals(true);
        });



    });

});