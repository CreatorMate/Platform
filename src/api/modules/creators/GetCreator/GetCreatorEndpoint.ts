import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import {errorResponse, successResponse} from "~/src/api/utils/HonoResponses";

export class GetCreatorEndpoint extends Endpoint {
    protected readonly method: string = 'get'
    protected readonly route: string = '/creators/:id'

    protected async handle(context: Context) {
        const id = context.req.param('id');

        const creator = await this.prismaClient.creators.findUnique({
            where: {id: id}
        })

        if(!creator) return errorResponse(context, 'no creator with this id');

        return successResponse(context, creator);
    }

}