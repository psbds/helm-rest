import Startup from "./Startup";

var startup = new Startup();
startup.main()
    .then(() => {
        console.log("Process exit successfully.")
    })
    .catch(error => {
        console.error("Process exited with an error.")
        console.error(error);
    });