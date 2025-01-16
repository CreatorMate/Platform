import type {Context} from "hono";

export type APIResponse<T = any> = {
    success: true,
    data: T,
    meta: any
} | {
    success: false,
    error: string,
}

export function successResponse<T>(context: Context, data: any, meta: any = null) {
    return {
        success: true,
        data: data,
        meta: meta
    }
}

export function errorResponse(context: Context, error: string) {
    return context.json({
        success: false,
        error: error
    })
}
