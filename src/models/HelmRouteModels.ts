import { IsNotEmpty, MaxLength, IsOptional } from "class-validator";


export class HelmDefaultModel {
    constructor(body) {
        Object.assign(this, body)
    }

    @IsOptional()
    @MaxLength(500)
    public args: string;
}

export class HelmInstallModel extends HelmDefaultModel {

    constructor(body) {
        super(body)
    }

    @MaxLength(250)
    @IsNotEmpty()
    public releaseName: string;

    @MaxLength(250)
    @IsNotEmpty()
    public chart: string;

}

export class HelmUpgradeModel extends HelmDefaultModel {

    constructor(body) {
        super(body)
    }

    @MaxLength(250)
    @IsNotEmpty()
    public releaseName: string;

    @MaxLength(250)
    @IsNotEmpty()
    public chart: string;

}

export class HelmDeleteModel extends HelmDefaultModel {

    constructor(body) {
        super(body)
    }

    @MaxLength(250)
    @IsNotEmpty()
    public releaseName: string;

}

export class HelmRollbackModel extends HelmDefaultModel {

    constructor(body) {
        super(body)
    }

    @MaxLength(250)
    @IsNotEmpty()
    public releaseName: string;

    @MaxLength(250)
    @IsNotEmpty()
    public revision: string;

}

export class HelmGetModel extends HelmDefaultModel {

    constructor(body) {
        super(body)
    }

    @MaxLength(250)
    @IsNotEmpty()
    public subcommand: string;

    @MaxLength(250)
    @IsNotEmpty()
    public releaseName: string;

}

export class HelmRepoAddModel extends HelmDefaultModel {

    constructor(body) {
        super(body)
    }

    @MaxLength(250)
    @IsNotEmpty()
    public repoName: string;

    @MaxLength(250)
    @IsNotEmpty()
    public repoUrl: string;

}

export class HelmRepoUpdateModel extends HelmDefaultModel {

    constructor(body) {
        super(body)
    }

}


export class HelmListModel extends HelmDefaultModel {

    constructor(body) {
        super(body)
    }

}


export class HelmRegistryLoginModel extends HelmDefaultModel {

    constructor(body) {
        super(body)
    }

    @MaxLength(250)
    @IsNotEmpty()
    public host: string;

    @MaxLength(250)
    @IsNotEmpty()
    public username: string;

    @MaxLength(250)
    @IsNotEmpty()
    public password: string;

}

export class HelmCommandModel {

    constructor(body) {
        Object.assign(this, body)
    }

    @MaxLength(500)
    @IsNotEmpty()
    public command: string;

}