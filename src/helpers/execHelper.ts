

import "reflect-metadata";
import { injectable } from "tsyringe";

import { exec as e } from "child_process";
import * as util from "util";
const execPromise = util.promisify(e);
import { IExecHelper } from "../types";


@injectable()
export default class ExecHelper implements IExecHelper {

    async exec(command: string): Promise<{ stdout: string; stderr: string; }> {
        return execPromise(command)
    }

}