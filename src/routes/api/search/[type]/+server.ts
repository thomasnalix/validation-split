import { json, type RequestHandler } from '@sveltejs/kit';

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

    const annonces = [
        { title: "Developpeur Front-end", type: "Design", valueType: "Freelance", domaine: "Web", city: "Paris", categories: ["Design"] },
        { title: "Stage de développement", type: "Développement", valueType: "Stage", domaine: "Informatique", city: "Paris", categories: ["Web"] },
        { title: "UI/UX Designer", type: "Design", valueType: "Freelance", domaine: "Anglais", city: "Lyon", categories: ["Design"] },
        { title: "Developpeur Python", type: "Développement", valueType: "Freelance", domaine: "Anglais", city: "Paris", categories: ["Informatique"] }
    ];

    const filteredAnnonces = annonces.filter((annonce) => {
        return (
            (!params.domain || annonce.domaine.toLowerCase().includes(params.domain.toLowerCase())) &&
            (!params.city || annonce.city.toLowerCase().includes(params.city.toLowerCase())) &&
            (!params.categories || params.categories.every((category) => annonce.categories.includes(category)))
        );
    });

    if (filteredAnnonces.length === 0) {
        return json({ error: "Aucun résultat" }, { status: 404 });
    }
    return json(filteredAnnonces);
};
