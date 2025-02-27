import type {Hono} from "hono";
import {usePrisma} from "~/src/api/src/lib/prisma";

export abstract class BaseController {
    protected app: Hono;
    constructor(app: Hono) {
        this.app = app;
    }

    getPrisma() {
        return usePrisma();
    }

    abstract endpoints(): Promise<any>
}