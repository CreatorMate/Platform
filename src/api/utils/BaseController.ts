import type {Hono} from "hono";

export abstract class BaseController {
    protected app: Hono;
    constructor(app: Hono) {
        this.app = app;
    }

    abstract endpoints(): Promise<any>
}