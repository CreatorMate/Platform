export type User = {
    id: string,
    email: string,
    brand_id: number,
    picture: string,
    full_name: string,
    brands: Brand
}

export type Creator = {
    id: string,
    sub: string,
    status: AccountStatus,
    handle: string,
    email: string,
    based_in: string,
    project_types: string,
    created_at: string,
    date_of_birth: string,
    additional_info: string,
    tik_tok: string
    linked: boolean
}

export type Project = {
    id: number,
    name: string,
    creators: string,
    days: number,
    slug: string,
    description: string,
    brand_id: number,
    color: string,
    project_widgets?: ProjectWidget[]
}

export type ProjectWidget = {
    id: number,
    widget_id: number,
    project_id: number,
    component: string,
    value: string,
    order: string,
    column_id: number,
    columns: Column,
    widgets: Widget
}

export type Column = {
    id: number,
    project_id: number,
    position: number
}

export enum AccountStatus {
    NEW = "NEW",
    INVITED = "INVITED",
    IN_REVIEW = "IN_REVIEW",
    ACCEPTED = "ACCEPTED"
}


export type Brand = {
    id: number,
    name: string,
    is_premium: string,
    customer_id: string,
    instagram_accounts: InstagramAccount|null
}

export type InstagramAccount = {
    id: number,
    expires_at: string,
    token: string,
    instagram_id: string
}

export type Widget = {
    id: number,
    name: string,
    description: string,
    brand_id: number,
    action: string,
    endpoint: string,
    metric_name: string,
    grouped: boolean,
    top: number,
    component: string
}