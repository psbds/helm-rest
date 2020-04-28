import { IsNotEmpty, MaxLength } from "class-validator";

export class HelmInstallModel {

    constructor(obj) {
        Object.assign(this, obj)
    }

    @MaxLength(250)
    @IsNotEmpty()
    public releaseName: string;

    @MaxLength(250)
    @IsNotEmpty()
    public chart: string;

    @MaxLength(500)
    public args: string;

}

export class HelmUpgradeModel {

    constructor(obj) {
        Object.assign(this, obj)
    }

    @MaxLength(250)
    @IsNotEmpty()
    public releaseName: string;

    @MaxLength(250)
    @IsNotEmpty()
    public chart: string;

    @MaxLength(500)
    public args: string;

}

export class HelmDeleteModel {

    constructor(obj) {
        Object.assign(this, obj)
    }

    @MaxLength(250)
    @IsNotEmpty()
    public releaseName: string;

    @MaxLength(500)
    public args: string;

}

export class HelmRollbackModel {

    constructor(obj) {
        Object.assign(this, obj)
    }

    @MaxLength(250)
    @IsNotEmpty()
    public releaseName: string;

    @MaxLength(250)
    @IsNotEmpty()
    public revision: string;

    @MaxLength(500)
    public args: string;

}

export class HelmGetModel {

    constructor(obj) {
        Object.assign(this, obj)
    }

    @MaxLength(250)
    @IsNotEmpty()
    public subcommand: string;

    @MaxLength(250)
    @IsNotEmpty()
    public releaseName: string;

    @MaxLength(500)
    public args: string;

}

export class HelmRepoAddModel {

    constructor(obj) {
        Object.assign(this, obj)
    }

    @MaxLength(250)
    @IsNotEmpty()
    public repoName: string;

    @MaxLength(250)
    @IsNotEmpty()
    public repoUrl: string;

    @MaxLength(500)
    public args: string;

}