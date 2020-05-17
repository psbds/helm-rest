import { Router, Application } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import { Logger } from "winston";

export default function SwaggerHandler(app: Application, logger: Logger): void {
    const router: Router = Router();

    let swaggerDoc;
    try {
        swaggerDoc = require('../../swagger.json');
        swaggerDoc.servers[0].url = `/${process.env.API_VERSION || ""}`;
        swaggerDoc.info.description = `API Version: ${process.env.API_VERSION}, Build Version: ${process.env.BUILD_VERSION}`;

        router.use('/', swaggerUi.serve);
        router.get('/', swaggerUi.setup(swaggerDoc));
    } catch (error) {
        logger.error("Seems like you doesn\`t have swagger.json file. Please, run: npm run-script swagger");
        router.get('/', (req, res) => {
            res.send('<p>Seems like you doesn\'t have <code>swagger.json</code> file.</p>' +
                '<p>For generate doc file use: <code>npm run-script swagger</code> in terminal</p>' +
                '<p>Then, restart your application</p>');
        });
    }

    app.use("/", router);
}