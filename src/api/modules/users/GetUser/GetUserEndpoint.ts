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
            await this.connectWithRetry(this.prismaClient)
            const honoUser = this.getHonoUser(context);
            let user = await this.getUser(honoUser.sub);
            if(!user) {
                await this.createUser(honoUser);
                user = await this.getUser(honoUser.sub);
            }

            if(!user) return errorResponse(context, "Something went wrong while creating the new user");

            return successResponse(context, user);
        } catch (error) {
            //@ts-ignore
            return errorResponse(context, error);
        }
    }

    async connectWithRetry(prisma: PrismaClient, retries = 5, delay = 3000) {
        for (let i = 0; i < retries; i++) {
            try {
                await prisma.$connect();
                console.log("Connected to database!");
                return;
            } catch (error) {
                console.error(`Database connection failed. Retrying in ${delay}ms...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
        throw new Error("Failed to connect to database after multiple attempts.");
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