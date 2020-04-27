import { Router } from "express";

export interface IHelm {

    install(releaseName: string, chart: string, args?: string): Promise<string>;
    upgrade(releaseName: string, chart: string, args: string): Promise<string>;
    delete(releaseName: string, args?: string): Promise<string>;
    rollback(releaseName: string, revision: string, args?: string): Promise<string>;
    getAll(releaseName: string, args?: string): Promise<string>;
    repoAdd(repoName: string, repoUrl: string, args?: string): Promise<string>;
    repoUpdate(args?: string): Promise<string>;
    registryLogin(host: string, username: string, password: string, args?: string): Promise<string>;
    command(command: string): Promise<string>;

}

export interface IExecHelper {

    exec(command: string): Promise<{ stdout: string; stderr: string; }>

}

// # Routes
export interface ICustomRoute {

    configureRouter(router: Router): Router

}