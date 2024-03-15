import { inject, injectable } from "inversify";
import { Request, Response } from 'express';
import Types from "@/common/dependency-injection/types";
import EventEmitter from "@/common/infraestructure/events/EventEmitter.interface";
import UserRepository from "@/users/repositories/user.repository";
import { CreateUserRequest } from "@/users/dtos/CreateUser";
import { UserController as UserControllerInterface } from "@/users/controllers/user.controller.interface";
import User from "@/users/entitities/user";
import CountryRepository from "@/countries/repositories/country.repository";
import { HttpError } from "http-errors";
import bcript from 'bcryptjs';

@injectable()
class UserController implements UserControllerInterface {

    constructor(
    @inject(Types.EventEmitter) private eventEmitter: EventEmitter, 
    @inject(Types.UserRepository) private repository: UserRepository,
    @inject(Types.CountryRepository) private countryRepository: CountryRepository)
    {
        this.register = this.register.bind(this);
     }

    async register(req: Request, res: Response): Promise<void> {
        try{
            const userDto = (req as any).user as CreateUserRequest;
            const countryId = userDto.countryId;
            const uniqueUsername = await this.repository.findOneBy({
                username: userDto.username,
            });
            if (uniqueUsername){
                throw new Error('Username already exists');
            }
            const country = await this.countryRepository.findById(countryId);
            if (!country) {
                throw new Error('Country not found');
            }
            const emailExistsInTheCountry = await this.repository.findOneBy({
                email: userDto.email,
                countryId,
            });
            if (emailExistsInTheCountry){
                throw new Error(`Email already registered in the country ${country.name}`);
            }
            const encriptedPassword = await bcript.hash(userDto.password, process.env.SALT_ROUNDS || 10);
            const user = new User();
            console.log('User:', user);
            user.email = userDto.email;
            user.password = encriptedPassword;
            user.fullname = userDto.fullname;
            user.username = userDto.username;
            user.countryId = country.id;
            user.age = userDto.age;
            user.isVerified = false;
            await this.repository.save(user);
            res.json({ message: 'User registered' });
            this.eventEmitter.emit('user-registered', user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default UserController;
