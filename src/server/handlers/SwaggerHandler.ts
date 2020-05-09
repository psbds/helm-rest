import { Router, Application } from 'express';
import * as swaggerUi from 'swagger-ui-express';

export default function SwaggerHandler(app: Application): void {
    const router: Router = Router();

    let swaggerDoc;
    try {
        swaggerDoc = require('../../swagger.json');
    } catch (error) {

    }

    if (swaggerDoc) {
        (swaggerDoc as any).servers[0].url = `/${process.env.API_VERSION || ""}`;
        (swaggerDoc as any).info.description = `API Version: ${process.env.API_VERSION}, Build Version: ${process.env.BUILD_VERSION}`;

        router.use('/', swaggerUi.serve);

        // Middleware mande to handle requests of swagger dependencies through reverse proxy
        // All requests mande to e.g. /v2 will be redirected to /v2/
        router.use('/', (req, res, next) => {
            var envoyPath = req.headers["x-envoy-original-path"];
            var envoyPathString = envoyPath ? envoyPath.toString() : null;
            if (envoyPathString && envoyPathString.match(/^\/v[0-9]*$/gm)) {
                console.log(JSON.stringify(req.headers));
                res.redirect(req.headers["x-envoy-original-path"] + "/");
            }
            else {
                next();
            }
        });

        router.get('/', swaggerUi.setup(swaggerDoc));
    } else if (process.env.NODE_ENV != "test") {
        console.log('***************************************************');
        console.log(' ')
        console.log('  Seems like you doesn\`t have swagger.json file');
        console.log('  Please, run: ');
        console.log('  $ npm run-script swagger');
        console.log(' ')
        console.log('***************************************************');
        router.get('/', (req, res) => {
            res.send('<p>Seems like you doesn\'t have <code>swagger.json</code> file.</p>' +
                '<p>For generate doc file use: <code>npm run-script swagger</code> in terminal</p>' +
                '<p>Then, restart your application</p>');
        });
    }

    app.use("/", router);
}