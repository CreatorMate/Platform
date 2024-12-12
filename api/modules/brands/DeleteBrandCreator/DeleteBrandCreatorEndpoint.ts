import {Endpoint} from "~/api/utils/Endpoint";
import type {Context} from "hono";
import {errorResponse, successResponse} from "~/api/utils/HonoResponses";
import {type Creator} from "~/src/utils/SupabaseTypes";
export class DeleteBrandCreatorEndpoint extends Endpoint {
    protected readonly method: string = 'delete'
    protected readonly route: string = '/brands/creators/:id'

    protected async handle(context: Context) {
        const id = context.req.param('id');
        const result = await this.prismaClient.creators.delete({
            where: {id: id}
        });

        if(!result) return errorResponse(context, 'could not find user with an id of ' + id)

        return successResponse<Creator>(context, result);
    }
}