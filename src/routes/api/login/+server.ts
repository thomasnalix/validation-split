import { json, type RequestHandler } from '@sveltejs/kit';

interface LoginRequest {
    email: string;
    password: string;
    remember: boolean;
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { email, password, remember }: LoginRequest = await request.json();

        const users = [
            { email: 'ahoumeau@yahoo.fr', password: 'mOtDePaSse1234' }
        ];

        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return json({ error: "Email ou mot de passe incorrect, veuillez réessayer" }, { status: 401 });
        }

        return json({ message: 'Connexion réussie', user: { email } });
    } catch (error) {
        return json({ error: 'Une erreur est survenue lors de la connexion' }, { status: 500 });
    }
};
