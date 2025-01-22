import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import {errorResponse, successResponse} from "~/src/api/utils/HonoResponses";

export class UpdateCreatorEndpoint extends Endpoint {
    protected readonly method: string = 'put'
    protected readonly route: string = '/creators/:id'

    protected async handle(context: Context) {
        const id = context.req.param('id');
        const {name, status, external_id, email} = await context.req.json();

        const user = await this.prismaClient.creators.findFirst({
            where: {email: email, status: 'pending'}
        });

        if(!user) {
            return errorResponse(context,'no user with this id');
        }

        const result = await this.prismaClient.creators.updateMany({
            where: {email: email},
            data: {
                username: name ?? user.username,
                status: status ?? user.status,
                waitlist_id: external_id
            }
        });

        if(!result) return errorResponse(context, '');

        return successResponse(context, '');
    }
}