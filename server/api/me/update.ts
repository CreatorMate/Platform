import {PrismaClient} from "@prisma/client";
import {createError, defineEventHandler, readBody} from "h3";
//@ts-ignore
import {getUserSession} from 'nuxt-oidc-auth/runtime/server/utils/session.js'
import {User} from "../../types/User";

const prisma = new PrismaClient();
export default defineEventHandler(async event => {
    const {email, full_name, picture} = await readBody<User>(event);
    const session = await getUserSession(event)
    const userId = session.userInfo.sub;

    const result = await prisma.users.update({
        where: {id: userId},
        data: {
            email: email,
            full_name: full_name,
            picture: picture
        }
    });

    return {
        data: result
    }
})
;