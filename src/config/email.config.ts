import * as nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config();

export const emailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})