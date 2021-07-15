import { emailTransporter } from '../config/email.config';

export default class UtilsService {
  public static async sendEmail(email: string, content: string, subject: string) {
    return true;
    emailTransporter.sendMail(
      {
        from: email,
        to: process.env.EMAIL_USER,
        subject: subject,
        html: content,
      },
      (error: Error | null) => {
        if (error) throw new Error(`Email not sent : ${error.message}`);
      }
    );
  }

  public static async sendEmails(emails: string[], subject: string, content: string) {
    return true;
    emailTransporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: 'noreply@configurhouse.com',
        bcc: emails,
        subject: subject,
        html: content,
      },
      (error: Error | null) => {
        if (error) throw new Error(`Email not sent : ${error.message}`);
      }
    );
  }
}
