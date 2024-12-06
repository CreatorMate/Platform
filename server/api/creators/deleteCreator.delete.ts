import {createError, defineEventHandler, readBody} from "h3";
import {APIResponse, errorResponse, successResponse} from "../../utils/APIResponse";
import {Creator} from "../../types/SupabaseTypes";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event): Promise<APIResponse<Creator>> => {
    //@ts-ignore
    const {creatorId} = getQuery(event);

    const result = await prisma.creators.delete({
        where: {id: creatorId}
    });

    if(!result) return errorResponse('could not find user with an id of ' + creatorId)

    return successResponse<Creator>(result);
})