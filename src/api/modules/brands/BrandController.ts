import type {Context, Hono} from "hono";
import {errorResponse, inheritResponse, successResponse} from "~/src/api/utils/HonoResponses";
import {CreatorAPI} from "~/src/api/utils/CreatorAPI/CreatorAPI";
import {context} from "esbuild";
import {BaseController} from "~/src/api/utils/BaseController";
import type {HonoUser} from "~/src/api/utils/HonoComposables";

export class BrandController extends BaseController {
    async endpoints() {
        this.app.delete('/brands/ig', async (context: Context): Promise<any> => {
            const apiUser = this.getHonoUser(context);
            const user = await this.getPrisma().users.findFirst({
                where: {email: apiUser.email, external_id: apiUser.sub},
                include: {
                    brands: true
                }
            });

            if(!user || !user.brands || !user.brands.instagram_id) return errorResponse(context,'USER_NOT_FOUND');

            await this.getPrisma().instagram_accounts.delete({
                where: {id: user.brands.instagram_id}
            });

            return successResponse(context, 'instagram connection deleted')
        });
    }
}