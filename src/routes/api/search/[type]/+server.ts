import {error, json, type RequestHandler} from '@sveltejs/kit';
import {getCollection} from "$lib/server/db";
import type {AnnonceModel} from "$lib/models/annonceModel";

interface SearchParams {
    domain?: string;
    city?: string;
    categories?: string[];
}

export const GET: RequestHandler = async ({url}) => {
    try {
        const params: SearchParams = {
            domain: url.searchParams.get('domain') || undefined,
            city: url.searchParams.get('city') || undefined,
            categories: url.searchParams.getAll('categories') || undefined
        };

        if (!params.domain) {
            error(401, "Veuillez remplir le champs domaine");
        }

        if (params.city === "") params.city = undefined;
        if (params.categories ? params.categories[0] === '' : true) params.categories = undefined;

        const annoncesCollection = await getCollection('annonces');

        const existingAnnonces = await annoncesCollection.find().toArray();

        const filteredAnnonces = existingAnnonces.filter((annonce: AnnonceModel) => {
            return (
                (!params.domain || annonce.domain.toLowerCase().includes(params.domain.toLowerCase())) &&
                (!params.city || annonce.city.toLowerCase().includes(params.city.toLowerCase())) &&
                (!params.categories || params.categories.every((category) => annonce.categories.includes(category)))
            );
        });

        if (filteredAnnonces.length === 0) {
            return json({error: "Aucun résultat"}, {status: 404});
        }
        return json(filteredAnnonces);
    } catch (err: any) {
        console.log(`Error ${err}`);
        error(500)
    }
};
