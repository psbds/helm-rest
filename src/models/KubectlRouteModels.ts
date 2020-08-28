import { IsNotEmpty, MaxLength, IsOptional } from "class-validator";


export class KubectlDefaultModel {
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
*     KubectlCommand:
*      type: "object"
*      properties:
*        command:
*          type: "string"
*          example: "version"
*          required: true
*/
export class KubectlCommandModel {

    constructor(body) {
        Object.assign(this, body)
    }

    @MaxLength(500)
    @IsNotEmpty()
    public command: string;

}