import {Controller} from "~/src/api/utils/Controller";
import type {Context} from "hono";
import {errorResponse, successResponse} from "~/src/api/utils/HonoResponses";
import {CreatorAPI} from "~/src/api/utils/CreatorAPI/CreatorAPI";

export class StatisticsController extends Controller {
    async endpoints() {
        this.app.get('/creator_api/statistics/:id/average', async (context: Context): Promise<any> => {
            const id = context.req.param('id') as string;
            const {ids, key} = context.req.query();
            const response = await CreatorAPI.ask(`/brands/${id}/statistics/average?key=${key}&ids=${ids ?? ''}`, 'GET')
            if (!response.success) {
                return errorResponse(context, response.error);
            }
            return successResponse(context, response.data);
        });

        this.app.get('/creator_api/statistics/:id/followers', async (context: Context): Promise<any> => {
            const id = context.req.param('id') as string;
            const {ids, key} = context.req.query();
            const response = await CreatorAPI.ask(`/brands/${id}/statistics/followers?ids=${ids ?? ''}`, 'GET')
            if (!response.success) {
                return errorResponse(context, response.error);
            }
            return successResponse(context, response.data);
        });

        this.app.get('/creator_api/statistics/:id/genders', async (context: Context): Promise<any> => {
            const id = context.req.param('id') as string;
            const {ids, key} = context.req.query();
            const response = await CreatorAPI.ask(`/brands/${id}/statistics/genders?ids=${ids ?? ''}`, 'GET')
            if (!response.success) {
                return errorResponse(context, response.error);
            }
            return successResponse(context, response.data);
        });

        this.app.get('/creator_api/statistics/:id/cities', async (context: Context): Promise<any> => {
            const id = context.req.param('id') as string;
            const {ids, key} = context.req.query();
            const response = await CreatorAPI.ask(`/brands/${id}/statistics/cities?ids=${ids ?? ''}`, 'GET')
            if (!response.success) {
                return errorResponse(context, response.error);
            }
            return successResponse(context, response.data);
        });

        this.app.get('/creator_api/statistics/:id/age', async (context: Context): Promise<any> => {
            const id = context.req.param('id') as string;
            const {ids, key} = context.req.query();
            const response = await CreatorAPI.ask(`/brands/${id}/statistics/ages?ids=${ids ?? ''}`, 'GET')
            if (!response.success) {
                return errorResponse(context, response.error);
            }
            return successResponse(context, response.data);
        });

        this.app.get('/creator_api/statistics/:id/gender_ages', async (context: Context): Promise<any> => {
            const id = context.req.param('id') as string;
            const {ids, key} = context.req.query();
            const response = await CreatorAPI.ask(`/brands/${id}/statistics/gender_ages?ids=${ids ?? ''}`, 'GET')
            if (!response.success) {
                return errorResponse(context, response.error);
            }
            return successResponse(context, response.data);
        });

        this.app.get('/creator_api/statistics/:id/reach-types', async (context: Context): Promise<any> => {
            const id = context.req.param('id') as string;
            const {ids, key} = context.req.query();
            const response = await CreatorAPI.ask(`/brands/${id}/statistics/reach-types?ids=${ids ?? ''}`, 'GET')
            if (!response.success) {
                return errorResponse(context, response.error);
            }
            return successResponse(context, response.data);
        });

        this.app.get('/creator_api/statistics/:id/content_types', async (context: Context): Promise<any> => {
            const id = context.req.param('id') as string;
            const {ids, key} = context.req.query();
            const response = await CreatorAPI.ask(`/brands/${id}/content_types?ids=${ids ?? ''}`, 'GET')
            if (!response.success) {
                return errorResponse(context, response.error);
            }
            return successResponse(context, response.data);
        });
    }
}