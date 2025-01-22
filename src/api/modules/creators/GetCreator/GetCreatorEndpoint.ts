import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import {errorResponse, successResponse} from "~/src/api/utils/HonoResponses";

export class GetCreatorEndpoint extends Endpoint {
    protected readonly method: string = 'get'
    protected readonly route: string = '/creators/:email'

    protected async handle(context: Context) {
        const email = context.req.param('email');

        const creator = await this.prismaClient.creators.findFirst({
            where: {email: email}
        })

        if(!creator) return errorResponse(context, 'no creator with this email', 404);

        return successResponse(context, creator);
    }

}