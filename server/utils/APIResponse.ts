export type APIResponse<T = any> = {
    success: true,
    data: T,
    meta: any
} | {
    success: false,
    error: string,
}

export function successResponse<T>(data: any, meta: any = null): APIResponse<T> {
    return {
        success: true,
        data: data,
        meta: meta
    }
}

export function errorResponse(error: string): APIResponse {
    return {
        success: false,
        error: error
    }
}
