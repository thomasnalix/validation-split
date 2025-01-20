import type {RequestHandler} from './$types';
import {error} from '@sveltejs/kit';
import * as db from '$lib/server/userData.json';
import type {User} from "$lib/models/user";

let userData = db as any

export const GET: RequestHandler = async () => {
    try {
        const user = userData.default as User;
        if (!user || !user.address || !user.phone || !user.userType) {
            return error(404)
        } else return new Response(JSON.stringify(user), {status: 200});
    } catch (error: any) {
        return new Response("Error when searching user", {status: 500});
    }
};

export const POST: RequestHandler = async ({ request }) => {
    try {
        const user = userData.default as User;
        const formData = await request.json();
        const updatedData = { ...user, ...formData };

        // TODO AFFECT

        return new Response(JSON.stringify(updatedData), { status: 200 });
    } catch (error: any) {
        console.error("Erreur lors de la mise à jour du profil", error);
        return new Response("Error when updating user profile", { status: 500 });
    }
};

export const DELETE: RequestHandler = async ({request}) => {
    return new Response(JSON.stringify(request), { status: 200 });
}