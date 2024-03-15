import { plainToInstance, Expose } from "class-transformer";
import { validate, Matches, IsDefined } from "class-validator";
import { NextFunction } from "express";
import { CreateUserRequest } from "../dtos/CreateUser";
import { Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
class UserValidator {

    public async createUserValidator(req: Request, res: Response, next: NextFunction) {
        const user = plainToInstance(CreateUserRequest, req.body);
        try {
            const errors = await validate(user);
            if (errors.length > 0) {
                res.status(400).json(errors);
            } else {
                (req as any).user = user;
                next();
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while validating the user.' });
        }
    }
}

export default UserValidator;
