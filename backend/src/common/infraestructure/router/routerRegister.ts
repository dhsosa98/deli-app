import { inject, injectable } from "inversify";
import { Router } from "./router.interface";
import express from 'express';
import Types from "../../dependency-injection/types";


@injectable()
export class RouterRegister {
    constructor(
    @inject(Types.HelloRouter) private readonly helloRouter: Router, 
    @inject(Types.UserRouter) private readonly userRouter: Router,
    @inject(Types.CountryRouter) private readonly countryRouter: Router,
    @inject(Types.AuthRouter) private readonly authRouter: Router,
    ) {}

    public registerRoutes(app: express.Application): express.Application 
    {
        app.use('/hello', this.helloRouter.getRouter());
        app.use('/users', this.userRouter.getRouter());
        app.use('/countries', this.countryRouter.getRouter());
        app.use('/auth/accounts', this.authRouter.getRouter());
        return app;
    }
}
