import {Hono} from "hono";
import {logger} from "hono/logger";
//@ts-ignore
import {getUserSession} from 'nuxt-oidc-auth/runtime/server/utils/session.js'
import dotenv from 'dotenv';
import {endpoints} from "~/api/endpoints";

let app: Hono = new Hono();
dotenv.config();

app.use('*', logger());
app.use('*', async (ctx, next) => {
    // @ts-ignore
    const user = ctx.req.raw['user'];
    // @ts-ignore
    ctx.set('user', user);
    await next();
});

for(const endpoint of endpoints) {
    endpoint.register(app);
}
export default defineEventHandler(async (event) => {
    event.node.req.originalUrl = '';
    const webReq = toWebRequest(event);
    const session = await getUserSession(event);
    (webReq as any)['user'] = session.userInfo;
    return app.fetch(webReq);
});
