import Types from "../../common/dependency-injection/types";
import { Router as RouterInterface } from "../../common/infraestructure/router/router.interface";
import { Router } from "express";
import { inject, injectable } from "inversify";
import { AuthController } from "../controllers/auth.controller.interface";
import UserValidator from "../../users/validators/user.validator";

@injectable()
class AuthRouter implements RouterInterface {
    private router: Router;

    constructor(
    @inject(Types.AuthController) private authController: AuthController,
    @inject(Types.UserValidator) private userValidator: UserValidator,
    )
    {
        this.router = Router();
    }

    getRouter(): Router {
        this.router.get('/verify', this.authController.verifyAccount);
        this.router.post('/signup', this.userValidator.createUserValidator, this.authController.signUp);
        return this.router;
    }
}

export default AuthRouter;
