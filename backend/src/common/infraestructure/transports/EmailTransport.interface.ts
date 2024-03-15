
export interface EmailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
    inline?: any;
    attachment?: any;
}

export interface EmailTransport {
    sendEmail(emailOptions: EmailOptions): Promise<void>;
}
