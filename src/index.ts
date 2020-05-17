import { setup } from "./helpers/dependencyInjection";
import { startServer } from "./server/Server";
import { IKubeConfiguration } from "./types";
const dotenv = require("dotenv");

async function startup(): Promise<void> {
    console.log(`Starting process using NODE_ENV: ${process.env.NODE_ENV}`);
    if (process.env.NODE_ENV == "development") {
        dotenv.config();
    }

    const container = setup();

    var kubeConfiguration = container.resolve<IKubeConfiguration>("IKubeConfiguration");

    await kubeConfiguration.setupKubeConfig(process.env.kubeconfig);

    startServer();
}

startup()
    .then(() => {
        console.log("Process exit successfully.")
    })
    .catch(error => {
        console.error("Process exited with an error.")
        console.error(error);
    });