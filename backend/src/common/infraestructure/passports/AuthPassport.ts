

export interface AuthPassport {
    sign(payload: any, options?: {
        expiresIn: string;
    }): string;
    verify(token: string): boolean
    decode(token: string): any
}
