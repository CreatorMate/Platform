import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import {type APIResponse, errorResponse, successResponse} from "~/src/api/utils/HonoResponses";
import type {HonoUser} from "~/src/api/utils/HonoComposables";

export class UpdateUserEndpoint extends Endpoint {
    protected readonly method: string = 'put'
    protected readonly route: string = '/users/me'

    protected async handle(context: Context) {
        const {email, picture, full_name} = await context.req.json();
        const honoUser = this.getHonoUser(context);

        const user = await this.getUser(honoUser.sub);

        if(!user) return errorResponse(context, 'no logged in user object')
        let updatedUser = await this.prismaClient.users.update({
            where: {id: honoUser.sub},
            data: {
                email: email ?? user.email,
                picture: picture ?? user.picture,
                full_name: full_name,
            }
        });

        if(!updatedUser) return errorResponse(context, "Something went wrong while updating the user");

        return successResponse(context, user);
    }

    private async getUser(userId: string) {
        return await this.prismaClient.users.findUnique({
            where: {id: userId}
        });
    }


}