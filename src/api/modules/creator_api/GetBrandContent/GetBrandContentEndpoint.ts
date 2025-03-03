// import {Endpoint} from "~/src/api/utils/Endpoint";
// import type {Context} from "hono";
// import {type APIResponse, errorResponse, successResponse} from "~/src/api/utils/HonoResponses";
// import {CreatorAPI} from "~/src/api/utils/CreatorAPI/CreatorAPI";
//
// export class GetBrandContentEndpoint extends Endpoint {
//     protected readonly method: string = 'get'
//     protected readonly route: string = '/creator_api/brands/:id/content'
//
//     protected async handle(context: Context) {
//         const id = context.req.param('id') as string;
//         const {key, order, ids, limit, days, page} = context.req.query();
//
//         const result: APIResponse = await CreatorAPI.ask(`/brands/${id}/content?key=${key}&ids=${ids}&limit=${limit}&days=${days}&page=${page}`, 'GET')
//
//         if(!result.success) {
//             return errorResponse(context, result.error, result.message);
//         }
//
//         return successResponse(context, result.data);
//     }
// }