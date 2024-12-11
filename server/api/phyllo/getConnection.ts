import {defineEventHandler} from "h3";
import {PrismaClient} from "@prisma/client";
import {errorResponse} from "../../utils/APIResponse";

const prisma = new PrismaClient();

// @ts-ignore
const phyllokey = useRuntimeConfig().PHYLLO_KEY as string
export default defineEventHandler(async event => {
    //@ts-ignore
    const {brandId, creatorId} = getQuery(event);

    let type = creatorId ? 'CREATOR' : 'BRAND';

    let id = creatorId ? creatorId : brandId;

    id = type + id;

    let connection = await prisma.phyllo_connections.findUnique({
        where: {id: id}
    });

    if(!connection) {
        const json = await createPhylloConnection(id);
        if(!json) return errorResponse('could not setup a new connection');
        connection = await prisma.phyllo_connections.create({
            data: {
                id: id,
                user_id: json.id,
                token: '',
                expires_on: new Date(json.created_at).toISOString()
            }
        });
    }

    if(!connection) errorResponse('could not get or create a connection');

    const currentDate = new Date();

    if (!connection.expires_on || currentDate > connection.expires_on) {
        const newTokenRequest = await getNewAccessToken(id, connection);

        console.log(newTokenRequest);

        if(!newTokenRequest) return errorResponse('could not create a new token');

        connection = await prisma.phyllo_connections.update({
            where: {id: id},
            data: {
                token: newTokenRequest.sdk_token,
                expires_on: new Date(newTokenRequest.expires_at).toISOString()
            }
        });
    }

    return {
        ...connection
    }
});

async function createPhylloConnection(id: string): Promise<null|{name: string, external_id: string, id: string, created_at: string}> {
    const response = await fetch('https://api.staging.getphyllo.com/v1/users', {
        method: 'POST',
        body: JSON.stringify({
            name: id,
            external_id: id
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${phyllokey}`
        }
    });

    if(!response.ok) return null;
    const json: {
        name: string,
        external_id: string,
        id: string,
        created_at: string
    } = await response.json();

    return json;
}

//@todo remove type any
async function getNewAccessToken(id: string, connection: any) : Promise<null|{sdk_token: string, expires_at: string}> {
    const response = await fetch('https://api.staging.getphyllo.com/v1/sdk-tokens', {
        method: 'POST',
        body: JSON.stringify({
            name: id,
            user_id: connection.user_id,
            products: [
                "IDENTITY", "IDENTITY.AUDIENCE", "ENGAGEMENT", "ENGAGEMENT.AUDIENCE", "INCOME", "ACTIVITY"
            ]
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${phyllokey}`
        }
    });

    if(!response.ok) return null;

    return await response.json();
}