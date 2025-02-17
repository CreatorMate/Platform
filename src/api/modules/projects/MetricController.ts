import {BaseController} from "~/src/api/utils/BaseController";
import type {Context} from "hono";
import {usePrisma} from "~/src/api/src/lib/prisma";
import {errorResponse, successResponse} from "~/src/api/utils/HonoResponses";
import {stringToSlug} from "~/src/utils/utils";
import {metricTypesList} from "~/src/api/modules/projects/types/MetricTypesList";
export class MetricController extends BaseController {
    async endpoints() {
        this.app.get('/metrics', async (context: Context): Promise<any> => {
            return successResponse(context, metricTypesList);
        });
    }
}