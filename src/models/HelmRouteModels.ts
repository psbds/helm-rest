import { IsNotEmpty, MaxLength, IsOptional } from "class-validator";


export class HelmDefaultModel {
    constructor(body) {
        Object.assign(this, body)
    }

    @IsOptional()
    @MaxLength(500)
    public args: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     HelmInstall:
 *      type: "object"
 *      properties:
 *        releaseName:
 *          type: "string"
 *          required: true
 *          example: "mynginx"
 *        chart:
 *          type: "string"
 *          required: true
 *          example: "stable/nginx-ingress"
 *        args:
 *          type: "string"
 *          example: "--set NGINX_PORT=80"
*/
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


/**
 * @swagger
 * components:
 *   schemas:
 *     HelmUpgrade:
 *      type: "object"
 *      properties:
 *        releaseName:
 *          type: "string"
 *          required: true
 *          example: "mynginx"
 *        chart:
 *          type: "string"
 *          required: true
 *          example: "stable/nginx-ingress"
 *        args:
 *          type: "string"
 *          example: "--set NGINX_PORT=80"
*/
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

/**
 * @swagger
 * components:
 *   schemas:
 *     HelmDelete:
 *      type: "object"
 *      properties:
 *        releaseName:
 *          type: "string"
 *          required: true
 *          example: "mynginx"
 *        args:
 *          type: "string"
 *          example: "--debug"
*/
export class HelmDeleteModel extends HelmDefaultModel {

    constructor(body) {
        super(body)
    }

    @MaxLength(250)
    @IsNotEmpty()
    public releaseName: string;

}

/**
 * @swagger
 * components:
 *   schemas:
 *     HelmRollback:
 *      type: "object"
 *      properties:
 *        releaseName:
 *          type: "string"
 *          required: true
 *          example: "mynginx"
 *        revision:
 *          type: "string"
 *          required: true
 *          example: "0"
 *        args:
 *          type: "string"
 *          example: "--wait"
*/
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

/**
 * @swagger
 * components:
 *   schemas:
 *     HelmGet:
 *      type: "object"
 *      properties:
 *        subcommand:
 *          type: "string"
 *          enum: [all,hooks,manifest,notes,values]
 *          required: true
 *          example: "all"
 *        releaseName:
 *          type: "string"
 *          required: true
 *          example: "mynginx"
 *        args:
 *          type: "string"
 *          example: "--debug"
*/
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

/**
 * @swagger
 * components:
 *   schemas:
 *     HelmRepoAdd:
 *      type: "object"
 *      properties:
 *        repoName:
 *          type: "string"
 *          required: true
 *          example: "stable"
 *        repoUrl:
 *          type: "string"
 *          required: true
 *          example: "https://kubernetes-charts.storage.googleapis.com"
 *        username:
 *          type: "string"
 *          example: "username"
 *        password:
 *          type: "string"
 *          example: "password"
 *        args:
 *          type: "string"
 *          example: "--debug"
*/
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

    @MaxLength(250)
    @IsOptional()
    public username: string;

    @MaxLength(250)
    @IsOptional()
    public password: string;

}

/**
 * @swagger
 * components:
 *   schemas:
 *     HelmRepoUpdate:
 *      type: "object"
 *      properties:
 *        args:
 *          type: "string"
 *          example: "--debug"
*/
export class HelmRepoUpdateModel extends HelmDefaultModel {

    constructor(body) {
        super(body)
    }

}

/**
* @swagger
* components:
*   schemas:
*     HelmList:
*      type: "object"
*      properties:
*        args:
*          type: "string"
*          example: "--debug"
*/
export class HelmListModel extends HelmDefaultModel {

    constructor(body) {
        super(body)
    }

}

/**
* @swagger
* components:
*   schemas:
*     HelmRegistryLogin:
*      type: "object"
*      properties:
*        host:
*          type: "string"
*          example: "myHost"
*          required: true
*        username:
*          type: "string"
*          example: "myUsername"
*          required: true
*        password:
*          type: "string"
*          password: "myPassword"
*          required: true
*        args:
*          type: "string"
*          example: "--debug"
*/
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

/**
* @swagger
* components:
*   schemas:
*     HelmCommand:
*      type: "object"
*      properties:
*        command:
*          type: "string"
*          example: "version --short"
*          required: true
*/
export class HelmCommandModel {

    constructor(body) {
        Object.assign(this, body)
    }

    @MaxLength(500)
    @IsNotEmpty()
    public command: string;

}