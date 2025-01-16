import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import {successResponse} from "~/src/api/utils/HonoResponses";

export class GetBrandProfilesEndpoint extends Endpoint{
    protected readonly method: string = 'get';
    protected readonly route: string = '/creator_api/brands/:id/profiles'

    protected async handle(context: Context) {
        const id = context.req.param('id') as string;

        const result = await fetch(`${process.env.CREATOR_API_PATH}/brands/${id}/profiles`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.CREATOR_API_KEY}`
            }
        });
        const data = await result.json();

        return successResponse(context, data.data);

    }

}