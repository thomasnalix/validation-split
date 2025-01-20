import {error, json, type RequestHandler} from '@sveltejs/kit';

interface SearchParams {
    domain?: string;
    city?: string;
    categories?: string[];
}

export const GET: RequestHandler = async ({ url }) => {
    const params: SearchParams = {
        domain: url.searchParams.get('domain') || undefined,
        city: url.searchParams.get('city') || undefined,
        categories: url.searchParams.getAll('categories') || undefined
    };

    if (!params.domain) {
        error(401, "Veuillez remplir le champs domaine")
    }

    if (params.city === "") params.city = undefined
    if (params.categories ? params.categories[0] === '' : true) params.categories = undefined

    const annonces = [
        { title: "Developpeur Front-end", type: "Design", valueType: "Freelance", domain: "Web", city: "Paris", categories: ["Design"] },
        { title: "Stage de développement", type: "Développement", valueType: "Stage", domain: "Informatique", city: "Paris", categories: ["Web"] },
        { title: "UI/UX Designer", type: "Design", valueType: "Freelance", domain: "Anglais", city: "Lyon", categories: ["Design"] },
        { title: "Developpeur Python", type: "Développement", valueType: "Freelance", domain: "Anglais", city: "Paris", categories: ["Informatique"] }
    ];

    const filteredAnnonces = annonces.filter((annonce) => {
        return (
            (!params.domain || annonce.domain.toLowerCase().includes(params.domain.toLowerCase())) &&
            (!params.city || annonce.city.toLowerCase().includes(params.city.toLowerCase())) &&
            (!params.categories || params.categories.every((category) => annonce.categories.includes(category)))
        );
    });

    if (filteredAnnonces.length === 0) {
        return json({ error: "Aucun résultat" }, { status: 404 });
    }
    return json(filteredAnnonces);
};
