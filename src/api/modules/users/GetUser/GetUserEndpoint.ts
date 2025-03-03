import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import {type APIResponse, errorResponse, successResponse} from "~/src/api/utils/HonoResponses";
import type {HonoUser} from "~/src/api/utils/HonoComposables";
import type {PrismaClient} from "@prisma/client";

export class GetUserEndpoint extends Endpoint {
    protected readonly method: string = 'get'
    protected readonly route: string = '/users/me'

    protected async handle(context: Context) {
        try {
            const honoUser = this.getHonoUser(context);
            let user = await this.getUser(honoUser);
            if(!user) {
                await this.createUser(honoUser);
                user = await this.getUser(honoUser);
            }

            if(!user) return errorResponse(context, "Something went wrong while creating the new user");

            return successResponse(context, user);
        } catch (error) {
            //@ts-ignore
            return errorResponse(context, error);
        }
    }

    private async createUser(honoUser: HonoUser) {
         await this.prismaClient.users.create({
            data: {
                external_id: honoUser.sub,
                email: honoUser.email,
                full_name: honoUser.nickname,
            }
        });
    }

    private async getUser(user: HonoUser) {
        return this.prismaClient.users.findFirst({
            where: {external_id: user.sub, email: user.email},
            include: {
                brands: {
                    include: {
                        instagram_accounts: true
                    }
                }
            }
        });
    }
}