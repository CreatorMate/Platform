import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import {errorResponse, successResponse} from "~/src/api/utils/HonoResponses";

export class UpdateCreatorEndpoint extends Endpoint {
    protected readonly method: string = 'put'
    protected readonly route: string = '/creators/:id'

    protected async handle(context: Context) {
        const id = context.req.param('id');
        const {name, status} = await context.req.json();

        const user = await this.prismaClient.creators.findFirst({
            where: {id: id, status: 'pending'}
        });

        if(!user) {
            return errorResponse(context,'no user with this id');
        }

        const result = await this.prismaClient.creators.update({
            where: {id: id},
            data: {
                username: name ?? user.username,
                status: status ?? user.status,
            }
        });

        if(!result) return errorResponse(context, '');

        return successResponse(context, '');
    }
}