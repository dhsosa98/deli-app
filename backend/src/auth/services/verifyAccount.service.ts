import Types from "@/common/dependency-injection/types";
import { AuthPassport } from "@/common/infraestructure/passports/AuthPassport";
import EventEmitter from "@/common/infraestructure/events/EventEmitter.interface";
import UserRepository from "@/users/repositories/user.repository";
import { inject, injectable } from "inversify";
import { EmailOptions, EmailTransport } from "@/common/infraestructure/transports/EmailTransport.interface";
import { UserRegisteredEvent } from "@/common/infraestructure/events/UserRegisteredEvent";
import VerifyAccountEmailTemplate from "./verifyAccountEmailTemplate";



@injectable()
class VerifyAccountService {
    private emailDomain = process.env.MAILGUN_DOMAIN;
    constructor(
        @inject(Types.AuthPassport) private passport: AuthPassport,
        @inject(Types.UserRepository) private userRepository: UserRepository,
        @inject(Types.EventEmitter) private eventEmitter: EventEmitter,
        @inject(Types.EmailTransport) private emailTransport: EmailTransport,
        @inject(Types.VerifyAccountEmailTemplate) private emailTemplate: VerifyAccountEmailTemplate,
    ){
        this.buildVerifyAccountTokenUrl = this.buildVerifyAccountTokenUrl.bind(this);
        this.verifyToken = this.verifyToken.bind(this);
        this.sendVerifyAccountEmail = this.sendVerifyAccountEmail.bind(this);
        this.eventEmitter.on("user-registered", this.sendVerifyAccountEmail);
    }


    buildVerifyAccountTokenUrl(userId: number): string {
        const token = this.passport.sign({ userId }, {
            expiresIn: '1h',
        });
        const baseUri = process.env.BASE_URI || 'http://localhost:3000';
        const url = `${baseUri}/auth/accounts/verify?token=${token}`;
        return url;
    }

    async verifyToken(token: string): Promise<void> {
        const decodedToken = this.passport.decode(token);
        if (!decodedToken){
            throw new Error('Invalid token');
        }
        if (decodedToken){
            const now = Math.floor(Date.now() / 1000);

            if (decodedToken.exp < now) {
              throw new Error('Token has expired');
            }
        }
        const user = await this.userRepository.findById(decodedToken.userId);
        if (!user){
            throw new Error('User not found');
        }
        user.isVerified = true;
        await this.userRepository.save(user);
    }

    async sendVerifyAccountEmail(payload: UserRegisteredEvent): Promise<void>
    {
        try{
            const { id, email, username } = payload;
            const verificationCode = this.buildVerifyAccountTokenUrl(id);
            const html = this.emailTemplate.getTemplate({ user: {
                username,
            }, verificationCode });
            console.log(html);
            const emailOptions: EmailOptions = {
                to: email,
                from: `Deli Accounts <deli@${this.emailDomain}>`,
                subject: "Verifica tu cuenta de Deli",
                html,
                attachment: this.emailTemplate.getAttachments(),
            };
            await this.emailTransport.sendEmail(emailOptions);
        } catch (error) {
            console.log(error);
        }
    }
}

export default VerifyAccountService;
