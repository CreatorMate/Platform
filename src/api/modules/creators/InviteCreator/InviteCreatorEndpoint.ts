import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import InviteUserTemplate from "~/src/api/utils/Emails/templates/InviteUserTemplate";
import {sendEmail} from "~/src/api/utils/Emails/emailSender";
import {errorResponse, successResponse} from "~/src/api/utils/HonoResponses";
import {AccountStatus} from "~/src/utils/SupabaseTypes";

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
                where: { email: email},
            });
            if (!creator) {
                creator = await this.prismaClient.creators.create({
                    data: {
                        email: email,
                        status: AccountStatus.INVITED
                    },
                });
            }

            let brandCreator = await this.prismaClient.creator_brand.findFirst({
                where: {brand_id: brand.id, creator_id: creator.id}
            });

            if(brandCreator) continue;

            await this.prismaClient.creator_brand.create({
                data: {
                    brand_id: brand.id,
                    creator_id: creator.id,
                    accepted: false,
                }
            });

            const template = InviteUserTemplate(brand.name, creator.id);
            await sendEmail(email, `You are invited to work with ${brand.name}`, template);
        }

        return successResponse(context, emails, null, 'Users invited');
    }

}