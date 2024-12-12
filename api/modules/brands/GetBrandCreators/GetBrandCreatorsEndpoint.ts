import {Endpoint} from "~/api/utils/Endpoint";
import type {Context} from "hono";
import {successResponse} from "~/api/utils/HonoResponses";

export class GetBrandCreatorsEndpoint extends Endpoint {
    protected readonly method: string = 'get'
    protected readonly route: string = '/brands/creators'

    protected async handle(context: Context) {
        const {brand, limit, page} = context.req.query();
        const honoUser = this.getHonoUser(context);

        const result = await this.prismaClient.creators.findMany({
            where: {brand_id: Number(brand)},
            take: Number(limit),
            skip: Number(limit) * (Number(page) - 1),
        });

        const total = await this.prismaClient.creators.count({
            where: {brand_id: Number(brand)},
        });

        return successResponse(context, result, {
            pagination: {
                total: total,
                perPage: limit
            }
        });
    }
}