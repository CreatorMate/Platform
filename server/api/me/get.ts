import {PrismaClient} from "@prisma/client";
import {createError, defineEventHandler, readBody} from "h3";
//@ts-ignore
import { getUserSession } from 'nuxt-oidc-auth/runtime/server/utils/session.js'

const prisma = new PrismaClient();
export default defineEventHandler(async event => {
    const session = await getUserSession(event)
    const userId = session.userInfo.sub;

    let user = await prisma.users.findUnique({
        where: {id: userId}
    });

    if(!user) {
        user = await prisma.users.create({
            data: {
                id: userId,
                email: session.userInfo.email,
                full_name: session.userInfo.nickname,
            }
        });
    }

    if(!user) return createError('failed to create user');

    return {
        data: user
    }
});