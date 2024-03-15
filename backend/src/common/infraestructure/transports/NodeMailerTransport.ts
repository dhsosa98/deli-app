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

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
          if (error) {
              console.log(error);
              reject(error);
          } else {
              console.log("Server is ready to take our messages");
              resolve(success);
          }
      });
  });

  const mailData = {
    from: process.env.EMAIL_USER,
    to: emailOptions.to,
    subject: emailOptions.subject,
    html: emailOptions.html,
    attachments: emailOptions.attachment,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            console.error(err);
            reject(err);
        } else {
            console.log(info);
            resolve(info);
        }
    });
  });      
  }
}

export default NodeMailerTransport;
