import jsonwebtoken from 'jsonwebtoken';
import { AuthPassport } from './AuthPassport';
import { injectable } from 'inversify';

@injectable()
export class JwtPassport implements AuthPassport {
  private readonly secret = process.env.SECRET_KEY;

    sign(payload: any, options: {
        expiresIn: string;
    }): string {
        return jsonwebtoken.sign(payload, this.secret, options);
    }

    verify(token: string): boolean {
        return !!jsonwebtoken.verify(token, this.secret);
    }

    decode(token: string) {
        return jsonwebtoken.decode(token);
    }
}
