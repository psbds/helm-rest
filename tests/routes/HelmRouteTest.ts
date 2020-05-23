//# Imports Default
import "reflect-metadata";
import { expect } from 'chai';
import 'mocha';
import { StubbedInstance, stubInterface as StubInterface } from "ts-sinon";
import { Application } from "express";

//# Imports
import { IHelm, ICustomRoute } from "../../src/types";
import HelmRoute from "../../src/routes/HelmRoute";

import RouteTestServer from "./_RouteTestServer";
var request = require('supertest');

describe('Routes: HelmRoute', () => {
    let helmStub: StubbedInstance<IHelm>;
    let testServer: Application;
    let helmRoute: HelmRoute;
    beforeEach(() => {
        helmStub = StubInterface<IHelm>();
        helmRoute = new HelmRoute(helmStub);
        var routes: ICustomRoute[] = [helmRoute];
        testServer = RouteTestServer.get(routes);
    })

    describe('POST /helm/install', () => {
        it('200: should run install command and return result', async () => {
            var spy = helmStub.install.withArgs("nginx", "stable/nginx", "--dry-run").returns(Promise.resolve("successfull result"));

            var result = await request(testServer)
                .post('/helm/install')
                .send({ releaseName: "nginx", chart: "stable/nginx", args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(result.body).equals("successfull result");
            expect(spy.calledOnce).equals(true);
        });

        it('500: should return errors message from not provided required parameters', async () => {
            var result = await request(testServer)
                .post('/helm/install')
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.validation.some(x => x == "releaseName should not be empty")).equals(true);
            expect(result.body.validation.some(x => x == "chart should not be empty")).equals(true);
        });

        it('500: should return error message when error running install command', async () => {
            var spy = helmStub.install.throws(new Error("error result"));

            var result = await request(testServer)
                .post('/helm/install')
                .send({ releaseName: "nginx", chart: "stable/nginx", args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.message).equals("error result");
            expect(spy.calledOnce).equals(true);
        });

    });

    describe('PUT /helm/upgrade', () => {
        it('200: should run upgrade command and return result', async () => {
            var spy = helmStub.upgrade.withArgs("nginx", "stable/nginx", "--dry-run").returns(Promise.resolve("successfull result"));

            var result = await request(testServer)
                .put('/helm/upgrade')
                .send({ releaseName: "nginx", chart: "stable/nginx", args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(result.body).equals("successfull result");
            expect(spy.calledOnce).equals(true);
        });

        it('500: should return errors message from not provided required parameters', async () => {
            var result = await request(testServer)
                .put('/helm/upgrade')
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.validation.some(x => x == "releaseName should not be empty")).equals(true);
            expect(result.body.validation.some(x => x == "chart should not be empty")).equals(true);
        });

        it('500: should return error message when error running upgrade command', async () => {
            var spy = helmStub.upgrade.throws(new Error("error result"));

            var result = await request(testServer)
                .put('/helm/upgrade')
                .send({ releaseName: "nginx", chart: "stable/nginx", args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.message).equals("error result");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('DELETE /helm/delete', () => {
        const PATH = '/helm/delete';
        it('200: should run delete command and return result', async () => {
            var spy = helmStub.delete.withArgs("nginx", "--dry-run").returns(Promise.resolve("successfull result"));

            var result = await request(testServer)
                .delete(PATH)
                .query({ releaseName: "nginx", args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(result.body).equals("successfull result");
            expect(spy.calledOnce).equals(true);
        });

        it('500: should return errors message from not provided required parameters', async () => {
            var result = await request(testServer)
                .delete(PATH)
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.validation.some(x => x == "releaseName should not be empty")).equals(true);
        });

        it('500: should return error message when error running delete command', async () => {
            var spy = helmStub.delete.throws(new Error("error result"));

            var result = await request(testServer)
                .delete(PATH)
                .query({ releaseName: "nginx", chart: "stable/nginx", args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.message).equals("error result");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('PUT /helm/rollback', () => {
        const PATH = '/helm/rollback';
        it('200: should run rollback command and return result', async () => {
            var spy = helmStub.rollback.withArgs("nginx", "0", "--dry-run").returns(Promise.resolve("successfull result"));

            var result = await request(testServer)
                .put(PATH)
                .send({ releaseName: "nginx", revision: "0", args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(result.body).equals("successfull result");
            expect(spy.calledOnce).equals(true);
        });

        it('500: should return errors message from not provided required parameters', async () => {
            var result = await request(testServer)
                .put(PATH)
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.validation.some(x => x == "releaseName should not be empty")).equals(true);
            expect(result.body.validation.some(x => x == "revision should not be empty")).equals(true);
        });

        it('500: should return error message when error running rollback command', async () => {
            var spy = helmStub.rollback.throws(new Error("error result"));

            var result = await request(testServer)
                .put(PATH)
                .send({ releaseName: "nginx", revision: "0", args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.message).equals("error result");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('GET /helm/get', () => {
        const PATH = '/helm/get';
        it('200: should run get command and return result', async () => {
            var spy = helmStub.get.withArgs("all", "nginx", "--dry-run").returns(Promise.resolve("successfull result"));

            var result = await request(testServer)
                .get(PATH)
                .query({ subcommand: "all", releaseName: "nginx", args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(result.body).equals("successfull result");
            expect(spy.calledOnce).equals(true);
        });

        it('500: should return errors message from not provided required parameters', async () => {
            var result = await request(testServer)
                .get(PATH)
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.validation.some(x => x == "releaseName should not be empty")).equals(true);
            expect(result.body.validation.some(x => x == "subcommand should not be empty")).equals(true);
        });

        it('500: should return error message when error running get command', async () => {
            var spy = helmStub.get.throws(new Error("error result"));

            var result = await request(testServer)
                .get(PATH)
                .query({ subcommand: "all", releaseName: "nginx", args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.message).equals("error result");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('POST /helm/repo/add', () => {
        const PATH = '/helm/repo/add';
        it('200: should run repo add command and return result', async () => {
            var spy = helmStub.repoAdd.withArgs("stable", "stable.com", "username", "password", "--dry-run").returns(Promise.resolve("successfull result"));

            var result = await request(testServer)
                .post(PATH)
                .send({ repoName: "stable", repoUrl: "stable.com", username: "username", password: "password", args: "--dry-run" })
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

            expect(result.body.validation.some(x => x == "repoName should not be empty")).equals(true);
            expect(result.body.validation.some(x => x == "repoUrl should not be empty")).equals(true);
        });

        it('500: should return error message when error running get command', async () => {
            var spy = helmStub.repoAdd.throws(new Error("error result"));

            var result = await request(testServer)
                .post(PATH)
                .send({ repoName: "stable", repoUrl: "stable.com", args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.message).equals("error result");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('POST /helm/repo/update', () => {
        const PATH = '/helm/repo/update';
        it('200: should run repo update command and return result', async () => {
            var spy = helmStub.repoUpdate.withArgs("--dry-run").returns(Promise.resolve("successfull result"));

            var result = await request(testServer)
                .post(PATH)
                .send({ args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(result.body).equals("successfull result");
            expect(spy.calledOnce).equals(true);
        });

        it('500: should return error message when error running get command', async () => {
            var spy = helmStub.repoUpdate.throws(new Error("error result"));

            var result = await request(testServer)
                .post(PATH)
                .send({ args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.message).equals("error result");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('GET /helm/list', () => {
        const PATH = '/helm/list';
        it('200: should run list command and return result', async () => {
            var spy = helmStub.list.withArgs("--dry-run").returns(Promise.resolve("successfull result"));

            var result = await request(testServer)
                .get(PATH)
                .query({ args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(result.body).equals("successfull result");
            expect(spy.calledOnce).equals(true);
        });

        it('500: should return error message when error running get command', async () => {
            var spy = helmStub.list.throws(new Error("error result"));

            var result = await request(testServer)
                .get(PATH)
                .query({ args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.message).equals("error result");
            expect(spy.calledOnce).equals(true);
        });
    });


    describe('POST /helm/registry/login', () => {
        const PATH = '/helm/registry/login';
        it('200: should run registry login command and return result', async () => {
            var spy = helmStub.registryLogin.withArgs("host", "username", "password", "--dry-run").returns(Promise.resolve("successfull result"));

            var result = await request(testServer)
                .post(PATH)
                .send({ host: "host", username: "username", password: "password", args: "--dry-run" })
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

            expect(result.body.validation.some(x => x == "host should not be empty")).equals(true);
            expect(result.body.validation.some(x => x == "username should not be empty")).equals(true);
            expect(result.body.validation.some(x => x == "password should not be empty")).equals(true);
        });

        it('500: should return error message when error running get command', async () => {
            var spy = helmStub.registryLogin.throws(new Error("error result"));

            var result = await request(testServer)
                .post(PATH)
                .send({ host: "host", username: "username", password: "password", args: "--dry-run" })
                .expect('Content-Type', /json/)
                .expect(500);

            expect(result.body.message).equals("error result");
            expect(spy.calledOnce).equals(true);
        });
    });

    describe('POST /helm/command', () => {
        const PATH = '/helm/command';
        it('200: should run custom command and return result', async () => {
            var spy = helmStub.command.withArgs("command").returns(Promise.resolve("successfull result"));

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
            var spy = helmStub.command.throws(new Error("error result"));

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