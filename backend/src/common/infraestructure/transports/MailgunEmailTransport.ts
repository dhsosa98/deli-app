import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import { EmailOptions, EmailTransport } from './EmailTransport.interface';
import { injectable } from 'inversify';


@injectable()
class MailgunEmailTransport implements EmailTransport {
    private mailgun: Mailgun;
    private apiKey: string = process.env.MAILGUN_API_KEY;
    private domain: string = process.env.MAILGUN_DOMAIN;
  constructor() {
    this.mailgun = new Mailgun(FormData);
  }

  async sendEmail(emailOptions: EmailOptions): Promise<void> {
    const client = this.mailgun.client({ username: 'api', key: this.apiKey });
    const response = await client.messages.create(this.domain, {
        from: emailOptions.from,
        to: emailOptions.to,
        subject: emailOptions.subject,
        html: emailOptions.html,
        attachment: emailOptions.attachment,
        inline: emailOptions.inline,
    });
    if (response.status !== 200) {
        throw new Error('Error sending email');
    }
  }
}

export default MailgunEmailTransport;
