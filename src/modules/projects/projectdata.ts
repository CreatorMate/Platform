export const projects: Map<string, Project> = new Map<string, Project>();

export function getWidgets(id: number): Widget[] {
    return widgets.filter((widget) => widget.project_id === id);
}

projects.set("tutorial-project", {
    id: 1,
    name: 'Tutorial project',
    creators: 'erwqrrwerwqrwqerr,wekrwoeromroqmrowqemr,roiweroimoqemrw',
    days: 365,
    slug: 'tutorial-project',
    icon: 'c',
    description: "oversee all tutorial widgets",
});

const widgets: Widget[] = [
    {
        project_id: 1,
        name: 'average likes',
        type: 'single-stat-card',
        field: 'likes',
        action: 'average',
        props: '{"color": "blue"}',
        value: 'this is text',
    },
    {
        project_id: 1,
        name: 'text widget',
        type: 'text',
        field: '',
        action: '',
        props: '{"color": "blue"}',
        value: 'this is text',
    },
    {
        project_id: 1,
        name: 'countries',
        type: 'bar-diagram',
        field: 'countries',
        action: '',
        props: '{"color": "blue"}',
        value: 'this is text',
    },
    {
        project_id: 1,
        name: 'h',
        type: 'countries',
        field: 'countries',
        action: '',
        props: '',
        value: '',
    }
]

export type Project = {
    id: number,
    name: string,
    creators: string,
    days: number,
    slug: string,
    icon: string,
    description: string,
}

export type Widget = {
    project_id: number,
    name: string,
    type: string,
    field: string,
    action: string,
    props: string,
    value: string,
}