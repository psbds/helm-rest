//# Imports Default
import "reflect-metadata";
import { expect } from 'chai';
import 'mocha';
import { StubbedInstance, stubInterface as StubInterface } from "ts-sinon";
import { Application } from "express";

//# Imports
import { IHelm, ICustomRoute } from "../../src/types";
import HealthcheckRoute from "../../src/routes/HealthcheckRoute";

import RouteTestServer from "./_RouteTestServer";
var request = require('supertest');

describe('Routes: Healthcheck', () => {
    let testServer: Application;
    let healthcheckRoute: HealthcheckRoute;
    beforeEach(() => {
        healthcheckRoute = new HealthcheckRoute();
        var routes: ICustomRoute[] = [healthcheckRoute];
        testServer = RouteTestServer.get(routes);
    })

    describe('GET /health', () => {
        it('200: return success status', async () => {
            await request(testServer)
                .get('/health')
                .expect(200);
        });


    });
});