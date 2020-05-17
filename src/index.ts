import "reflect-metadata";

import { default as DIContainer } from "./DependencyInjection";
import { IStartup } from "./types";

DIContainer.setup();
var startup = DIContainer.getContainer().resolve<IStartup>("IStartup")
startup.main()
    .then(() => {
        console.log("Process exit successfully.")
    })
    .catch(error => {
        console.error("Process exited with an error.")
        console.error(error);
    });