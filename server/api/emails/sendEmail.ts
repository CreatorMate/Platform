import {PrismaClient} from "@prisma/client";
import {createError, defineEventHandler, readBody} from "h3";
import InviteUserTemplate from "../../utils/Emails/templates/InviteUserTemplate";

export type inviteUsers = {
    emails: string[]
}

const prisma = new PrismaClient();
export default defineEventHandler(async event => {
    const {emails} = await readBody<inviteUsers>(event);

    for(const email of emails) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.resend.com',
            port: 465,
            secure: true,
            auth: {
                user: 'resend',
                pass: 're_eZQqhxWh_9j15zJ6epuMBHTz7aw998Ey2'
            }
        });

        const template = InviteUserTemplate('123456', 'hello@creatormate.com', 'support name', 'robin mons')

        const mailOptions = {
            from: 'hello@creatormate.com',
            to: email,
            subject: 'You are invited to use creatormate!',
            html: template.html,
            text: template.text
        }

        const info = await transporter.sendMail(mailOptions);
    }

    return {
        data: emails
    }
})
;