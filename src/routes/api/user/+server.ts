import type {RequestHandler} from './$types';
import {getCollection} from "$lib/server/db";

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const PUT: RequestHandler = async ({request, cookies}) => {
    try {
        const {currentPassword, newPassword} = await request.json();

        if (!passwordRegex.test(newPassword)) {
            return new Response(
                JSON.stringify({error: "Votre mot de passe doit contenir un chiffre, un caractère minuscule, un caractère majuscule et un caractère spécial."}),
                {status: 400}
            );
        }

        const email = cookies.get('email');
        if (!email) {
            return new Response("Unauthorized: Email missing", {status: 401});
        }

        const usersCollection = await getCollection('users');
        const user = await usersCollection.findOne({email});
        console.log(user)
        if (!user) {
            return new Response("Profile not found", {status: 404});
        }

        if (currentPassword !== user.password) {
            return new Response("Mot de passe actuel incorrect", {status: 400});
        }

        await usersCollection.updateOne({email}, {$set: {password: newPassword}});

        return new Response(JSON.stringify({message: "Mot de passe mis à jour avec succès"}), {status: 200});

    } catch (err: any) {
        return new Response("Erreur lors de la mise à jour du mot de passe", {status: 500});
    }
};
