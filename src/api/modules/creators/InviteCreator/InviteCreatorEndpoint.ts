import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import InviteUserTemplate from "~/src/api/utils/Emails/templates/InviteUserTemplate";
import {sendEmail} from "~/src/api/utils/Emails/emailSender";
import {errorResponse} from "~/src/api/utils/HonoResponses";

export type inviteUsers = {
    emails: string[],
    brandId: number
}

export class InviteCreatorEndpoint extends Endpoint {
    protected readonly method: string = 'post'
    protected readonly route: string = '/creators/invite'

    protected async handle(context: Context) {
        const {emails, brandId} = await context.req.json() as inviteUsers;

        const brand = await this.prismaClient.brands.findUnique({
            where: {id: brandId}
        })

        if(!brand) return errorResponse(context, 'this brand does not exist');

        for(const email of emails) {
            let creator = await this.prismaClient.creators.findFirst({
                where: { email: email, brand_id: brandId},
            });
            if (!creator) {
                creator = await this.prismaClient.creators.create({
                    data: {
                        email: email,
                        status: 'pending',
                        type: 'commision',
                        brand_id: brandId,
                        country: 'netherlands'
                    },
                });
            }

            if(creator.status !== 'pending') continue;

            const template = InviteUserTemplate(brand.name, creator.id, brand.id);
            await sendEmail(email, `You are invited to work with ${brand.name}`, template);
        }

        return {
            data: emails
        }
    }

}