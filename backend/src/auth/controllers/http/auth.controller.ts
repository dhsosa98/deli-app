import { inject, injectable } from "inversify";
import { Request, Response } from 'express';
import { AuthController as AuthControllerInterface } from "@/auth/controllers/auth.controller.interface";
import Types from "@/common/dependency-injection/types";
import VerifyAccountService from "@/auth/services/verifyAccount.service";
import AuthService from "@/auth/services/auth.service";
import { CreateUserRequest } from "@/users/dtos/CreateUser";


@injectable()
class AuthController implements AuthControllerInterface {

    private frontendUri = process.env.FRONTEND_URI || 'http://localhost:5173';

    constructor(
        @inject(Types.VerifyAccountService) private verifyAccountService: VerifyAccountService,
        @inject(Types.AuthService) private authService: AuthService,   
    ) {
        this.verifyAccount = this.verifyAccount.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    async verifyAccount(req: Request, res: Response): Promise<void> {
        try{
            const token = req.query.token as string;
            await this.verifyAccountService.verifyToken(token);
            res.redirect(`${this.frontendUri}/verify-email/success`);
        } catch (error) {
            if (error.message === 'Token has expired'){ 
                res.redirect(`${this.frontendUri}/verify-email/expired`);
                return;
            }
            res.status(400).json({ message: error.message });
        }
    }

    async signUp(req: Request, res: Response): Promise<void> {
        try{
            const user = await this.authService.register((req as any).user as CreateUserRequest);
            res.json({ user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default AuthController;
