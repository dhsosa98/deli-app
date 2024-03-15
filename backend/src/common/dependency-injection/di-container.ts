import { Container } from "inversify";
import HelloRouter from "@/hello/routers/hello.router";
import { RouterRegister } from "@/common/infraestructure/router/routerRegister";
import Types from "./types";
import UserRouter from "@/users/routers/user.router";
import UserController from "@/users/controllers/http/user.controller";
import UserValidator from "@/users/validators/user.validator";
import EventEmitter from "@/common/infraestructure/events/EventEmitter";
import UsersRepository from "@/users/repositories/user.repository";
import User from "@/users/entitities/user";
import CountryController from "@/countries/controllers/http/country.controller";
import Country from "@/countries/entities/country";
import CountryRepository from "@/countries/repositories/country.repository";
import CountryRouter from "@/countries/routers/country.router";
import { AuthPassport } from "../infraestructure/passports/AuthPassport";
import { JwtPassport } from "../infraestructure/passports/JwtPassport";
import VerifyAccountService from "@/auth/services/verifyAccount.service";
import { EmailTransport } from "../infraestructure/transports/EmailTransport.interface";
import VerifyAccountEmailTemplate from "@/auth/services/verifyAccountEmailTemplate";
import AuthController from "@/auth/controllers/http/auth.controller";
import AuthRouter from "@/auth/routers/auth.router";
import NodeMailerTransport from "../infraestructure/transports/NodeMailerTransport";
import dataSource from "../infraestructure/database/db";
import MailgunEmailTransport from "../infraestructure/transports/MailgunEmailTransport";
import AuthService from "@/auth/services/auth.service";



class DIContainer {
    private container: Container;
    private isMailgunConfigured: boolean = (!!process.env.MAILGUN_API_KEY && !!process.env.MAILGUN_DOMAIN);

    constructor() {
        this.configure();
        this.initializeDb();
    }

    public configure(): void {
        this.container = new Container();
        this.container.bind<HelloRouter>(Types.HelloRouter).to(HelloRouter);
        this.container.bind<RouterRegister>(Types.RouterRegister).to(RouterRegister);
        this.container.bind<UserController>(Types.UserController).to(UserController);
        this.container.bind<UserRouter>(Types.UserRouter).to(UserRouter);
        this.container.bind<UserValidator>(Types.UserValidator).to(UserValidator);
        this.container.bind<EventEmitter>(Types.EventEmitter).toConstantValue(new EventEmitter());
        this.container.bind<UsersRepository>(Types.UserRepository).to(UsersRepository);
        this.container.bind<User>(Types.UserModel).to(User);
        this.container.bind<CountryController>(Types.CountryController).to(CountryController);
        this.container.bind<CountryRepository>(Types.CountryRepository).to(CountryRepository);
        this.container.bind<Country>(Types.CountryModel).to(Country);
        this.container.bind<CountryRouter>(Types.CountryRouter).to(CountryRouter);
        this.container.bind<AuthPassport>(Types.AuthPassport).to(JwtPassport);
        this.container.bind<VerifyAccountService>(Types.VerifyAccountService).to(VerifyAccountService);
        if (this.isMailgunConfigured) {
            this.container.bind<EmailTransport>(Types.EmailTransport).to(MailgunEmailTransport);
        }
        else {
            this.container.bind<EmailTransport>(Types.EmailTransport).to(NodeMailerTransport);
        }
        this.container.bind<VerifyAccountEmailTemplate>(Types.VerifyAccountEmailTemplate)
            .to(VerifyAccountEmailTemplate);
        this.container.bind<AuthController>(Types.AuthController).to(AuthController);
        this.container.bind<AuthRouter>(Types.AuthRouter).to(AuthRouter);
        this.container.bind<AuthService>(Types.AuthService).to(AuthService);
    }

    async initializeDb(): Promise<void> {
        try {
            await dataSource.initialize();
        }
        catch (error) {
            console.error('Error initializing database:', error);
        }
    }


    public getContainer(): Container {
        return this.container;
    }
}

export default DIContainer;
