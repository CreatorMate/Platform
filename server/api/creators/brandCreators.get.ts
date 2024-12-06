import {PrismaClient} from "@prisma/client";
import {createError, defineEventHandler, readBody} from "h3";

import {getSession} from "../../utils/Composables";
import {APIResponse, successResponse} from "../../utils/APIResponse";
import {Creator} from "../../types/SupabaseTypes";

const prisma = new PrismaClient();
export default defineEventHandler(async (event): Promise<APIResponse<Creator[]>> => {
    const session = await getSession(event)
    //@ts-ignore
    const {brand, limit, page} = getQuery(event);
    const userId = session.userInfo.sub;

    const result = await prisma.creators.findMany({
        where: {brand_id: Number(brand)},
        take: Number(limit),
        skip: limit * (page - 1),
    });

    const total = await prisma.creators.count({
        where: {brand_id: Number(brand)},
    });

    return successResponse(result, {
        pagination: {
            total: total,
            perPage: limit
        }
    });
});