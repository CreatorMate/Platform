import {BaseController} from "~/src/api/utils/BaseController";
import type {Context} from "hono";
import {errorResponse, inheritResponse, successResponse} from "~/src/api/utils/HonoResponses";
import {CreatorAPI} from "~/src/api/utils/CreatorAPI/CreatorAPI";
import {context} from "esbuild";

export class CoreController extends BaseController {
    async endpoints() {
        this.app.get('/creator_api/check', async (context: Context): Promise<any> => {
            const response = await CreatorAPI.ask(`/check`);
            return inheritResponse(context, response);
        });

        this.app.get('/creator_api/sync/instagram', async (context: Context): Promise<any> => {
            const {brandId, creatorId} = context.req.query();
            console.log(`/sync/instagram${brandId ? `?brandId=${brandId}` : ''}${creatorId ? `?creatorId=${creatorId}` : ''}`);
            const response = await CreatorAPI.ask(`/sync/instagram${brandId ? `?brandId=${brandId}` : ''}${creatorId ? `?creatorId=${creatorId}` : ''}`, 'GET');
            if (!response.success) {
                return errorResponse(context, response.error);
            }
            return successResponse(context, response.data, null, 'data sync started, come back after a few minutes');
        });
    }
}