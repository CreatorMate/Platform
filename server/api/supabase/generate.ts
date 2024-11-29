import {PrismaClient} from "@prisma/client";
import {createError, defineEventHandler, readBody} from "h3";
//@ts-ignore
import { getUserSession } from 'nuxt-oidc-auth/runtime/server/utils/session.js'
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
// @ts-ignore
const supabaseSecret = useRuntimeConfig().NUXT_SUPABASE_SECRET as string
export default defineEventHandler(async event => {
    const session = await getUserSession(event)
    const userId = session.userInfo.sub;

    const payload = {
        userId: userId,
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
});