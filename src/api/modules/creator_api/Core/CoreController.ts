import {Controller} from "~/src/api/utils/Controller";
import type {Context} from "hono";
import {errorResponse, inheritResponse, successResponse} from "~/src/api/utils/HonoResponses";
import {CreatorAPI} from "~/src/api/utils/CreatorAPI/CreatorAPI";
import {context} from "esbuild";

export class CoreController extends Controller {
    async endpoints() {
        this.app.get('/creator_api/check', async (context: Context): Promise<any> => {
            const response = await CreatorAPI.ask(`/check`);
            return inheritResponse(context, response);
        });
    }
}