import type {EmailTemplate} from './types/EmailTypes'
import nodemailer from 'nodemailer';

type SendMail = { template: EmailTemplate, to: string, from: string, subject: string }

const fromName = "creatormate";

export async function sendEmail(request: SendMail) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.resend.com',
        port: 465,
        secure: true,
        auth: {
            user: 'resend',
            pass: 're_eZQqhxWh_9j15zJ6epuMBHTz7aw998Ey2'
        }
    });
}