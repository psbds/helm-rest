//# Imports Default
import "reflect-metadata";
import 'mocha';
import { expect, use } from 'chai';
import * as chaiAsPromised from "chai-as-promised";
use(chaiAsPromised);

import request = require('request-promise');

describe('E2E API Test', () => {
    let host = process.env.HOST;

    beforeEach(() => {
        console.log(`${host}/helm/install`)
    })

    describe('/helm/install', () => {
        it('should install helm chart', async () => {
            let result = await request.post({
                url: `${host}/helm/install`,
                json: true,
                body: {
                    "releaseName": "ngninx-e2e",
                    "chart": "stable/nginx-ingress",
                    "args": "--set NGINX_PORT=80"
                }
            })
        });
    });
});