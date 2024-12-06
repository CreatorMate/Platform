import {PrismaClient} from "@prisma/client";
import {createError, defineEventHandler, readBody} from "h3";
//@ts-ignore
import { getUserSession } from 'nuxt-oidc-auth/runtime/server/utils/session.js'
import {APIResponse, errorResponse, successResponse} from "../../utils/APIResponse";
import {User} from "../../types/SupabaseTypes";

const prisma = new PrismaClient();
export default defineEventHandler(async (event): Promise<APIResponse<User>>  => {
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

    if(!user) errorResponse("Something went wrong while creating the new user");

    return successResponse({
        ...user,
    });
});