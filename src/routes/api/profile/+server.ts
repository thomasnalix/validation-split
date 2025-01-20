import type {RequestHandler} from './$types';
import {getCollection} from "$lib/server/db";

export const GET: RequestHandler = async ({ cookies }) => {
    try {
        const email = cookies.get('email');
        if (!email) {
            return new Response("Unauthorized: Email missing", { status: 401 });
        }

        const profileCollection = await getCollection('profile');
        const profile = await profileCollection.findOne({ email });

        if (!profile || !profile.address || !profile.phone || !profile.userType) {
            return new Response("Profile incomplete or not found", { status: 404 });
        }

        return new Response(JSON.stringify(profile), { status: 200 });
    } catch (err: any) {
        return new Response(`Error when searching user ${err}`, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const formData = await request.json();

        const email = cookies.get('email');
        if (!email) {
            return new Response("Unauthorized: Email missing", { status: 401 });
        }

        const profileCollection = await getCollection('profile');
        const profile = await profileCollection.findOne({ email });

        if (!profile) {
            await profileCollection.insertOne({ email });
        }

        const updatedData = { ...profile, ...formData };
        await profileCollection.updateOne({ email }, { $set: updatedData });

        return new Response(JSON.stringify(updatedData), { status: 200 });
    } catch (err: any) {
        return new Response(`Error when updating user profile ${err}`, { status: 500 });
    }
};

export const DELETE: RequestHandler = async ({cookies }) => {
    try {
        const email = cookies.get('email');
        if (!email) {
            return new Response("Unauthorized: Email missing", { status: 401 });
        }

        const profileCollection = await getCollection('profile');
        const userCollection = await getCollection('users');
        const profile = await profileCollection.findOne({ email });
        const user = await userCollection.findOne({ email });
        if (!profile || !user) {
            return new Response("Profile or user not found", { status: 404 });
        }

        await profileCollection.deleteOne({ email });
        await userCollection.deleteOne({ email });

        return new Response("Profile deleted successfully", { status: 200 });
    } catch (err: any) {
        return new Response(`Error when deleting user profile ${err}`, { status: 500 });
    }
};
