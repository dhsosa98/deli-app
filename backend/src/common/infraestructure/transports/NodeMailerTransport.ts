import { EmailOptions, EmailTransport } from './EmailTransport.interface';
import { injectable } from 'inversify';
import nodemailer from 'nodemailer';


@injectable()
class NodeMailerTransport implements EmailTransport {
  constructor() {}

  async sendEmail(emailOptions: EmailOptions): Promise<void> {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        service: process.env.EMAIL_SERVICE || 'gmail',
        port: 588,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const response = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: emailOptions.to,
        subject: emailOptions.subject,
        html: emailOptions.html,
        attachments: emailOptions.attachment,
    });
    console.log(response);
  }
}

export default NodeMailerTransport;
