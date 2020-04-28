import { Length, IsNotEmpty, MaxLength } from "class-validator";

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