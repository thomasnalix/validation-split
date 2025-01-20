import { json, type RequestHandler } from '@sveltejs/kit';

interface QuickSearchParams {
    query: string;
}

export const GET: RequestHandler = async ({ url }) => {
    const query: string = url.searchParams.get('query') || '';

    // Exemple de données simulées
    const utilisateurs = [
        { name: "Jean Dupont", type: "User", domaine: "Développement", city: "Paris" },
        { name: "Entreprise XYZ", type: "Entreprise", domaine: "Design", city: "Paris" }
    ];

    const filteredUsers = utilisateurs.filter((user) => {
        return (
            user.domaine.includes(query) ||
            user.city.includes(query) ||
            user.name.includes(query)
        );
    });

    if (filteredUsers.length === 0) {
        return json({ error: "Aucun résultat n'est lié à votre recherche" }, { status: 404 });
    }

    return json(filteredUsers);
};
