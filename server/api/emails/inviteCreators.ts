import {PrismaClient} from "@prisma/client";
import {createError, defineEventHandler, readBody} from "h3";
import InviteUserTemplate from "../../utils/Emails/templates/InviteUserTemplate";
import {sendEmail} from "../../utils/Emails/emailSender";

export type inviteUsers = {
    emails: string[]
}

const prisma = new PrismaClient();
export default defineEventHandler(async event => {
    const {emails} = await readBody<inviteUsers>(event);

    for(const email of emails) {
        let creator = await prisma.creators.findFirst({
            where: { email: email, brand_id: 1},
        });
        if (!creator) {
            creator = await prisma.creators.create({
                data: {
                    email: email,
                    status: 'invited',
                    type: 'commision',
                    brand_id: 1,
                    country: 'netherlands'
                },
            });
        }

        if(creator.status !== 'invited') continue;

        const template = InviteUserTemplate('{brand_name}', creator.id, 1);
        await sendEmail(email, "You are invited to work with {brand_name}", template);
    }

    return {
        data: emails
    }
});