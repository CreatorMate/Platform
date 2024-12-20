import {Endpoint} from "~/api/utils/Endpoint";
import type {Context} from "hono";
import {successResponse} from "~/api/utils/HonoResponses";

export class GetBrandContentEndpoint extends Endpoint {
    protected readonly method: string = 'get'
    protected readonly route: string = '/creator_api/brands/:id/content'

    protected async handle(context: Context) {
        const brand_id = context.req.param('brand_id') as string;
        const {key, order} = context.req.query();

        const result = await fetch(`http://localhost:5000/brands/${brand_id}/content?key=${key}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.CREATOR_API_KEY}`
            }
        });

        const data = await result.json();

        return successResponse(context, data.data);

    }

}