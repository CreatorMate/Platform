import {BaseController} from "~/src/api/utils/BaseController";
import type {Context} from "hono";
import {usePrisma} from "~/src/api/src/lib/prisma";
import {errorResponse, successResponse} from "~/src/api/utils/HonoResponses";
import {stringToSlug} from "~/src/utils/utils";


export class ProjectsController extends BaseController {
    async endpoints() {
        this.app.get('/projects/:id', async (context: Context): Promise<any> => {
            const id = context.req.param('id');

            const projects = await usePrisma().projects.findMany({
                where: {brand_id: Number(id)}
            });
            return successResponse(context, projects);
        });

        this.app.get('/projects/:id/:name', async (context: Context): Promise<any> => {
            const id = context.req.param('id');
            const name = context.req.param('name');

            const project = await usePrisma().projects.findFirst({
                where: {brand_id: Number(id), slug: name}
            });

            if(!project) return errorResponse(context, 'NOT_FOUND', 'no page with this name')
            return successResponse(context, project);
        });

        this.app.post('/projects/:id', async (context: Context): Promise<any> => {
            const {name, description, creators, days, color} = await context.req.json()
            const id = context.req.param('id');

            const slug = stringToSlug(name);

            const project = await usePrisma().projects.findFirst({
                where: {brand_id: Number(id), slug: slug}
            });

            if(project) {
                return errorResponse(context, 'PROJECT_ALREADY_EXISTS', 'project with this name already exists');
            }

            const newProject = await usePrisma().projects.create({
                data: {
                    name: name,
                    creators: creators,
                    days: days,
                    slug: slug,
                    description: description,
                    color: color,
                    brand_id: Number(id)
                }
            });

            if(!newProject) {
                return errorResponse(context, 'something went wrong while creating project');
            }

            return successResponse(context, 'project');
        })
    }
}