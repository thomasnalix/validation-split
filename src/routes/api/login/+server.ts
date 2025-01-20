import {json, type RequestHandler} from '@sveltejs/kit';
import {getCollection} from "$lib/server/db";

interface LoginRequest {
    email: string;
    password: string;
    remember: boolean;
}

export const POST: RequestHandler = async ({request, cookies}) => {
    try {
        const {email, password, remember}: LoginRequest = await request.json();

        const usersCollection = await getCollection('users');

        const user = await usersCollection.findOne({email, password});
        if (!user) {
            return json({error: "Email ou mot de passe incorrect, veuillez réessayer"}, {status: 401});
        }

        cookies.set('email', email, {
            path: '/',
            httpOnly: false,
            secure: false,
            expires: new Date('2026-01-21T00:00:00Z'),
        });

        return json({message: 'Connexion réussie', user: {email}});
    } catch (error) {
        return json({error: 'Une erreur est survenue lors de la connexion'}, {status: 500});
    }
};
