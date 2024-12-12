import {Endpoint} from "~/api/utils/Endpoint";
import type {Context} from "hono";
import InviteUserTemplate from "~/api/utils/Emails/templates/InviteUserTemplate";
import {sendEmail} from "~/api/utils/Emails/emailSender";

export type inviteUsers = {
    emails: string[]
}

export class InviteCreatorEndpoint extends Endpoint {
    protected readonly method: string = 'post'
    protected readonly route: string = '/creators/invite'

    protected async handle(context: Context) {
        const {emails} = await context.req.json() as inviteUsers;
        for(const email of emails) {
            let creator = await this.prismaClient.creators.findFirst({
                where: { email: email, brand_id: 1},
            });
            if (!creator) {
                creator = await this.prismaClient.creators.create({
                    data: {
                        email: email,
                        status: 'pending',
                        type: 'commision',
                        brand_id: 1,
                        country: 'netherlands'
                    },
                });
            }

            if(creator.status !== 'pending') continue;

            const template = InviteUserTemplate('{brand_name}', creator.id, 1);
            await sendEmail(email, "You are invited to work with {brand_name}", template);
        }

        return {
            data: emails
        }
    }

}