import { json, type RequestHandler } from '@sveltejs/kit';

interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    acceptTerms: boolean;
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { email, password, confirmPassword, firstName, lastName, acceptTerms }: RegisterRequest = await request.json();

        if (!email || !password || !confirmPassword || !firstName || !lastName) {
            return json({ error: "Veuillez remplir tous les champs requis" }, { status: 400 });
        }

        if (password !== confirmPassword) {
            return json({ error: "Les mots de passe ne correspondent pas" }, { status: 400 });
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return json({ error: "Cette adresse e-mail est non valide. Assurez-vous qu’elle respecte ce format: exemple@email.com" }, { status: 400 });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return json({ error: "Votre mot de passe doit contenir un chiffre, un caractère minuscule, un caractère majuscule et un caractère spécial." }, { status: 400 });
        }

        const existingUser = false;  // STUB
        if (existingUser) {
            return json({ error: "Votre email existe déjà, veuillez vous connecter" }, { status: 400 });
        }

        const newUser = { email, password, firstName, lastName, acceptTerms };
        console.log("Utilisateur enregistré :", newUser);

        return json({ message: "Inscription réussie", user: { email } });
    } catch (error) {
        return json({ error: "Une erreur est survenue lors de l'inscription" }, { status: 500 });
    }
};
