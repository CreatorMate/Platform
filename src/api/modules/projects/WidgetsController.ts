import {BaseController} from "~/src/api/utils/BaseController";
import type {Context} from "hono";
import {usePrisma} from "~/src/api/src/lib/prisma";
import {errorResponse, successResponse} from "~/src/api/utils/HonoResponses";
import {stringToSlug} from "~/src/utils/utils";
import {metricTypesList} from "~/src/api/modules/projects/types/MetricTypesList";
export class WidgetsController extends BaseController {
    async endpoints() {
        this.app.get('/widgets', async (context: Context): Promise<any> => {
            const {brand_id, search} = context.req.query();

            const whereConditions = {
                brand_id: Number(brand_id),
                ...(search && {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { metric_name: { contains: search, mode: 'insensitive' } },
                    ],
                }),
            };

            const widgets = await this.getPrisma().widgets.findMany({
                //@ts-ignore
                where: whereConditions
            })

            if(!widgets) {
                return errorResponse(context, 'error response');
            }

            return successResponse(context, widgets);
        });

        this.app.post('/widgets', async (context: Context): Promise<any> => {
            const {   name,
                description,
                top,
                grouped,
                action,
                endpoint,
                component,
                brand_id,
                metric_name}
                = await context.req.json();

            const widget = await usePrisma().widgets.create({
                data: {
                    name,
                    description,
                    top,
                    grouped,
                    action,
                    endpoint,
                    component,
                    brand_id,
                    metric_name
                }
            });

            if(!widget) return errorResponse(context, 'SOMETHING_WENT_WRONG', 'something went wrong while adding the widget');

            return successResponse(context, metricTypesList, null, `widget ${name} has been added`);
        });
    }
}