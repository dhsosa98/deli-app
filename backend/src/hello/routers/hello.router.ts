import { Request, Response, Router } from 'express';
import { injectable } from 'inversify';
import { Router as RouterInterface } from '../../common/infraestructure/router/router.interface';

@injectable()
class HelloRouter implements RouterInterface {
    private router: Router;

    constructor() {
        this.router = Router();
    }

    get(req: Request, res: Response): void {
        res.json({ message: 'Hello, world!' });
    }

    getRouter(): Router {
        this.router.get('/', this.get);
        return this.router;
    }
}

export default HelloRouter;
