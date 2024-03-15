import { inject, injectable } from "inversify";
import Types from "../../common/dependency-injection/types";
import CountryRepository from "../../countries/repositories/country.repository";
import UserRepository from "../../users/repositories/user.repository";
import EventEmitter from "../../common/infraestructure/events/EventEmitter.interface";
import { CreateUserRequest } from "../../users/dtos/CreateUser";
import User from "../../users/entitities/user";
import bcript from 'bcryptjs';


interface RegisterUserResponse {
    username: string;
    email: string;
    fullname: string;
    age: number;
    countryId: number;
    isVerified: boolean;
}

@injectable()
class AuthService {
  
    constructor(
        @inject(Types.EventEmitter) private eventEmitter: EventEmitter, 
        @inject(Types.UserRepository) private repository: UserRepository,
        @inject(Types.CountryRepository) private countryRepository: CountryRepository)
        {
            this.register = this.register.bind(this);
         }
    
        async register(userDto: CreateUserRequest): Promise<RegisterUserResponse> {
            try{
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
                user.email = userDto.email;
                user.password = encriptedPassword;
                user.fullname = userDto.fullname;
                user.username = userDto.username;
                user.countryId = country.id;
                user.age = userDto.age;
                user.isVerified = false;
                await this.repository.save(user);
                this.eventEmitter.emit('user-registered', user);
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            } catch (error) {
                throw new Error(error.message);
            }
        }
}

export default AuthService;
