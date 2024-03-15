import Types from "../../common/dependency-injection/types";
import { Router as RouterInterface } from '../../common/infraestructure/router/router.interface';
import { Router } from "express";
import { inject, injectable } from "inversify";
import { UserController } from "../controllers/user.controller.interface";
import UserValidator from "../validators/user.validator";

@injectable()
class UserRouter implements RouterInterface {
    private router: Router;
    private userController: UserController;
    private userValidator: UserValidator;

    constructor(@inject(Types.UserController) userController: UserController,
    @inject(Types.UserValidator) userValidator: UserValidator){
        this.router = Router();
        this.userController = userController;
        this.userValidator = userValidator;
    }

    getRouter(): Router {
        this.router.post('/signup', this.userValidator.createUserValidator, this.userController.register);
        return this.router;
    }
}

export default UserRouter;
