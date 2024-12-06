import {defineEventHandler, readBody} from "h3";
import {APIResponse, errorResponse, successResponse} from "../../utils/APIResponse";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event): Promise<APIResponse> => {
    const {name, brandId, userId} = await readBody(event);

    const user = await prisma.creators.findFirst({
        where: {id: userId, status: 'pending'}
    });

    if(!user) {
        return errorResponse('');
    }

    const result = await prisma.creators.update({
        where: {id: userId},
        data: {
            username: name,
            status: 'acquired'
        }
    });

    if(!result) return errorResponse('');

    return successResponse('');
});