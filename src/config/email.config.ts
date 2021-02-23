import * as nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config();

export const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})