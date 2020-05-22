//# Imports Default
import "reflect-metadata";
import { expect } from 'chai';
import 'mocha';
import { StubbedInstance, stubInterface as StubInterface } from "ts-sinon";
import { Application } from "express";

//# Imports

import RouteTestServer from "../routes/_RouteTestServer";
import { ICustomRoute, IHelm } from "../../src/types";
import HelmRoute from "../../src/routes/HelmRoute";
import request from 'supertest';

describe('Handlers: Authentication Handler', () => {
    let helmStub: StubbedInstance<IHelm>;
    let testServer: Application;
    let helmRoute: HelmRoute;
    beforeEach(() => {
        helmStub = StubInterface<IHelm>();
        helmRoute = new HelmRoute(helmStub);
        var routes: ICustomRoute[] = [helmRoute];
        testServer = RouteTestServer.get(routes);
    })

    describe('Authentication Not Configured', () => {
        beforeEach(() => {
            var routes: ICustomRoute[] = [helmRoute];
            testServer = RouteTestServer.get(routes);
        })
    
        it('200: should skip authentication and be able to ping the API', async () => {
            var spy = helmStub.list.returns(Promise.resolve("successfull result"));

            var result = await request(testServer)
                .get('/helm/list')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(result.body).equals("successfull result");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('Authentication Configured', () => {
        beforeEach(() => {
            var routes: ICustomRoute[] = [helmRoute];
            testServer = RouteTestServer.get(routes, "apiKey");
        })

        it('200: should authenticate to the API and be able to ping', async () => {
            var spy = helmStub.list.returns(Promise.resolve("successfull result"));

            var result = await request(testServer)
                .get('/helm/list')
                .set({ "Authorization": "apiKey"})
                .expect('Content-Type', /json/)
                .expect(200);

            expect(result.body).equals("successfull result");
            expect(spy.calledOnce).equals(true);
        });

        it('401: shoud fail the authenticatio and return 401', async () => {
            var result = await request(testServer)
                .get('/helm/list')
                .expect(401);
        });
    });
});