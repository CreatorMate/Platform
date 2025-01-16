import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import {successResponse} from "~/src/api/utils/HonoResponses";

export class GetBrandCountryDistributionEndpoint extends Endpoint {
    protected readonly method: string = 'get'
    protected readonly route: string = '/creator_api/brands/:id/countries'

    protected async handle(context: Context) {
        const id = context.req.param('id') as string;
        const {key, order, ids, limit} = context.req.query();

        const filter = ids ? `?ids=${ids}` : '';
        const result = await fetch(`${process.env.CREATOR_API_PATH}/brands/${id}/statistics/countries${filter}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.CREATOR_API_KEY}`
            }
        });

        const data = await result.json();

        console.log(data.data)

        return successResponse(context, data.data);

    }

}