import { Application, Request, Response, NextFunction } from 'express';


/**
* @swagger
* components:
*   securitySchemes:
*     ApiKeyAuth:
*       type: apiKey
*       in: header
*       name: Authorization
* 
*/
export default function AuthenticationHandler(app: Application) {
    app.use("/helm", (req: Request, res: Response, next: NextFunction) => {
        if (process.env.authenticationKey != (req.headers["authorization"] || req.headers["Authorization"])) {
            res.status(401).send("Unauthorized");
            res.end();
        } else {
            next();
        }
    });
}