import {Endpoint} from "~/api/utils/Endpoint";
import type {Context} from "hono";
import {type APIResponse, errorResponse, successResponse} from "~/api/utils/HonoResponses";

export class GetCreatorProfileEndpoint extends Endpoint {
    protected readonly method: string = 'get'
    protected readonly route: string = `/creator_api/creator/profile/:id`

    protected async handle(context: Context) {
        const id = context.req.param('id');
        console.log(this.API_KEY)
        const result = await fetch(`http://localhost:5000/creators/profile/${id}`, {
            method: 'GET',
            headers: {
                'CONTENT_TYPE': 'application/json',
                'ACCEPTS': 'application/json',
                'x-api-key': this.API_KEY
            }
        });

        if(!result.ok) return errorResponse(context, 'something went wrong while fetching this user');

        const data = await result.json() as APIResponse;

        return successResponse(context, data)
    }
}