import Types from "../../common/dependency-injection/types";
import { Router as RouterInterface } from "../../common/infraestructure/router/router.interface";
import { Router } from "express";
import { inject, injectable } from "inversify";
import { CountryController } from "../controllers/country.controller.interface";

@injectable()
class CountryRouter implements RouterInterface {
    private router: Router;

    constructor(@inject(Types.CountryController) private countryController: CountryController) {
        this.router = Router();
    }

    getRouter(): Router {
        this.router.get('/', this.countryController.getAll);
        return this.router;
    }
}

export default CountryRouter;
