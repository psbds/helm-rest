import { Router } from "express";

export interface IHelm {

    install(releaseName: string, chart: string, args?: string): Promise<string>;
    /*upgrade(releaseName: string, chart: string, args: string): string;
    uninstall(command: string): string;
    list(command: string): string;
    rollback(command: string): string;
    repo(command: string): string;*/

}

export interface IExecHelper {

    exec(command: string): Promise<{ stdout: string; stderr: string; }>

}

// # Routes
export interface ICustomRoute {

    configureRouter(router: Router): Router

}