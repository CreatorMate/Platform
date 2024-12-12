import {Endpoint} from "~/api/utils/Endpoint";
import type {Context} from "hono";
//@ts-ignore
import jwt from "jsonwebtoken";

const supabaseSecret = useRuntimeConfig().NUXT_SUPABASE_SECRET as string

export class GetSupabaseEndpoint extends Endpoint {
    protected readonly method: string = 'get';
    protected readonly route: string = '/supabase';

    protected async handle(context: Context) {
        const honoUser = this.getHonoUser(context);

        const payload = {
            userId: honoUser.sub,
            exp: Math.floor(Date.now() / 1000) + 120,
            role: 'authenticated',
        }

        const token = jwt.sign(
            payload,
            supabaseSecret
        )

        return {
            data: token
        }
    }

}