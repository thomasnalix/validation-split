import {error, json, type RequestHandler} from '@sveltejs/kit';
import {getCollection} from "$lib/server/db";
import type {AnnonceModel} from "$lib/models/annonceModel";

interface SearchParams {
    title: string;
}

export const GET: RequestHandler = async ({ url }) => {
    try {
        const params: SearchParams = {
            title: url.searchParams.get('title') || '',
        };

        if (!params.title) {
            return json({ error: "Veuillez remplir le champ titre" }, { status: 400 });
        }

        const annoncesCollection = await getCollection('annonces');

        const existingAnnonces = await annoncesCollection.find().toArray();

        const filteredAnnonces = existingAnnonces.filter((annonce: AnnonceModel) => {
            const annonceTitle = (annonce.title + annonce.city).toLowerCase()
            return annonceTitle.includes(params.title.toLowerCase());
        });

        if (filteredAnnonces.length === 0) {
            return json({ error: "Aucun résultat n’est lié à votre recherche" }, { status: 404 });
        }

        return json(filteredAnnonces);
    } catch (err: any) {
        console.log(`Error: ${err}`);
        return error(500, "Erreur serveur");
    }
};
