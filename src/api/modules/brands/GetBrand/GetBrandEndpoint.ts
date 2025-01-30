import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import {errorResponse, successResponse} from "~/src/api/utils/HonoResponses";

export class GetBrandEndpoint extends Endpoint {
    protected readonly method: string = 'get';
    protected readonly route: string = '/brands/:id';

    protected async handle(context: Context) {
        const id = context.req.param('id');
        const brand = await this.prismaClient.brands.findUnique({
            where: {id: Number(id)}
        })

        if(!brand) return errorResponse(context, 'No brand with this id');
        return successResponse(context, brand);
    }
}