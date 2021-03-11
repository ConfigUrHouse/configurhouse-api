import { ErrorHandler } from '../../middleware/error-handler';
import { emailTransporter } from '../../config/email.config';



export default class UtilsService {

  public static async sendEmail(email: string, subject:string, content:string) {
    emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: content,
    }, (error: Error | null) => {
      if (error) throw new ErrorHandler(500, `Email not sent : ${error.message}`)
    })
  }
}
