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
                where: {brand_id: Number(id)},
                orderBy: { id: 'asc' }
            });

            return successResponse(context, projects);
        });

        this.app.put('/projects/:id/widgets', async (context: Context): Promise<any> => {
            const id = context.req.param('id');
            const {columnOrder, itemOrder} = await context.req.json();

            for(const item of itemOrder) {
                await this.getPrisma().project_widgets.update({
                    where: {id: item.id},
                    data: {column_id: item.column_id, order: item.order}
                });
            }

            for(const item of columnOrder) {
                await this.getPrisma().columns.update({
                    where: {id: item.id},
                    data: {position: item.position}
                });
            }

            return successResponse(context, itemOrder);
        });

        this.app.put('/projects/:id/widgets/:widget_id', async (context: Context): Promise<any> => {
            const widgetId = context.req.param('widget_id');
            const {value} = await context.req.json();

            const updated = await usePrisma().project_widgets.update({
                where: {id: Number(widgetId)},
                data: {value: value}
            })

            return successResponse(context, []);
        });

        this.app.get('/projects/:id/:name', async (context: Context): Promise<any> => {
            const id = context.req.param('id');
            const name = context.req.param('name');

            const project = await usePrisma().projects.findFirst({
                where: {brand_id: Number(id), slug: name},
                include: {
                    project_widgets: {
                        include: {
                            widgets: true,
                            columns: true
                        }
                    }
                }
            });

            if(!project) return errorResponse(context, 'NOT_FOUND', 'no page with this name');

            if (project.project_widgets) {
                project.project_widgets.sort((a, b) => {
                    // First, sort by column position
                    if (a.columns.position < b.columns.position) return -1;
                    if (a.columns.position > b.columns.position) return 1;

                    // If column positions are equal, sort by widget order
                    if (a.order < b.order) return -1;
                    if (a.order > b.order) return 1;

                    return 0;
                });
            }

            return successResponse(context, project);
        });


        this.app.delete('/projects/:id/columns/:column_id', async (context: Context): Promise<any> => {
            const id = context.req.param('id');
            const column_id = context.req.param('column_id');

            const deleted = await this.getPrisma().columns.delete({
                where: {id: Number(column_id)}
            });

            if(!deleted) {
                return errorResponse(context, 'COLUMN_ERROR');
            }

            return successResponse(context, '');
        });

        this.app.post('/projects/:id/columns', async (context: Context): Promise<any> => {
            const id = context.req.param('id');

            const column = await this.getPrisma().columns.create({
                data: {
                    project_id: Number(id),
                    position: 9999,
                }
            });

            if(!column) {
                return errorResponse(context, 'COLUMN_ERROR');
            }

            return successResponse(context, column);
        });

        this.app.delete('/projects/:id/widgets/:widget_id', async (context: Context): Promise<any> => {
            const project_id = Number(context.req.param('id'));
            const widget_id = Number(context.req.param('widget_id'));

            const deleted = await this.getPrisma().project_widgets.delete({
                where: {id: widget_id}
            });

            return successResponse(context, 'deleted widget');
        });
        this.app.post('/projects/:id/widgets', async (context: Context): Promise<any> => {
            const project_id = Number(context.req.param('id'));
            const custom: string|undefined = context.req.query('custom');
            const {widget_id, component, value} = await context.req.json();

            if(custom == undefined) {
                return errorResponse(context, 'missing params');
            }

            const column = await this.getPrisma().columns.create({
                data: {
                    project_id: project_id,
                    position: 9999,
                }
            });

            if(!column) {
                return errorResponse(context, 'COLUMN_ERROR');
            }

            let projectWidget = null;

            if(custom == 'true') {
                projectWidget = await this.getPrisma().project_widgets.create({
                    data: {
                        widget_id: widget_id,
                        project_id: project_id,
                        column_id: column.id,
                        order: 999,
                    }
                });
            } else {
                projectWidget = await this.getPrisma().project_widgets.create({
                    data: {
                        component: component,
                        value: value,
                        project_id: project_id,
                        column_id: column.id,
                        order: 999,
                    }
                });
            }

            if(!projectWidget) {
                return errorResponse(context, 'WIDGET_LINK_ERROR');
            }

            return successResponse(context, 'widget added', null,'successfully added widget to project');
        });

        this.app.delete('/projects/:id', async (context: Context): Promise<any> => {
            const id = context.req.param('id');

            const deletedProject = await usePrisma().projects.delete({
                where: {id: Number(id)}
            });

            if(!deletedProject) {
                return errorResponse(context, 'no project with this id');
            }

            return successResponse(context, 'project deleted');
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
        });

        this.app.put('/projects/:id', async (context: Context): Promise<any> => {
            const {name, description, creators, days, color, brand_id} = await context.req.json()
            const id = context.req.param('id');

            const slug = stringToSlug(name);

            const project = await usePrisma().projects.findFirst({
                where: {brand_id: brand_id, slug: slug}
            });

            if(project && project.id != Number(id)) {
                return errorResponse(context, 'NAME_ALREADY EXISTS', 'project with this name already exists');
            }

            const updated = await usePrisma().projects.update({
                where: {id: Number(id)},
                data: {
                    name: name,
                    creators: creators,
                    days: days,
                    slug: slug,
                    description: description,
                    color: color,
                }
            });

            if(!updated) {
                return errorResponse(context, 'something went wrong while creating project');
            }

            return successResponse(context, 'project');
        });
    }
}