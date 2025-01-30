import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import {type APIResponse, errorResponse, successResponse} from "~/src/api/utils/HonoResponses";
import type {HonoUser} from "~/src/api/utils/HonoComposables";

export class GetUserEndpoint extends Endpoint {
    protected readonly method: string = 'get'
    protected readonly route: string = '/users/me'

    protected async handle(context: Context) {
        const honoUser = this.getHonoUser(context);
        let user = await this.getUser(honoUser.sub);
        if(!user) {
            await this.createUser(honoUser);
            user = await this.getUser(honoUser.sub);
        }

        if(!user) return errorResponse(context, "Something went wrong while creating the new user");

        return successResponse(context, user);
    }

    private async createUser(honoUser: HonoUser) {
         await this.prismaClient.users.create({
            data: {
                id: honoUser.sub,
                email: honoUser.email,
                full_name: honoUser.nickname,
            }
        });
    }

    private async getUser(userId: string) {
        return await this.prismaClient.users.findUnique({
            where: {id: userId},
            include: {
                brands: true,
            }
        });
    }

}