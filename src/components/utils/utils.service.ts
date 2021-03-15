import { ErrorHandler } from '../../middleware/error-handler';
import { emailTransporter } from '../config/email.config';



export default class UtilsService {

  public static async sendEmail(email: string, content:string) {
    emailTransporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: "Formulaire de contact ConfigUrHouse",
      html: content,
    }, (error: Error | null) => {
      if (error) throw new ErrorHandler(500, `Email not sent : ${error.message}`)
    })
  }
}