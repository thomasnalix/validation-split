<script lang="ts">
    let currentPassword: string = '';
    let newPassword: string = '';
    let confirmNewPassword: string = '';
    let error: string | null = null;
    let success: boolean;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSubmit = async () => {
        error = null;
        success = false;

        if (newPassword !== confirmNewPassword) {
            error = "Les nouveaux mots de passe ne correspondent pas.";
            return;
        }

        if (!passwordRegex.test(newPassword)) {
            error = "Votre mot de passe doit contenir un chiffre, un caractère minuscule, un caractère majuscule et un caractère spécial.";
            return;
        }

        try {
            const response = await fetch('/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword
                })
            });

            if (response.ok) {
                success = true;
            } else {
                const data = await response.json();
                error = data.error || "Erreur lors de la mise à jour du mot de passe.";
            }
        } catch (err: any) {
            error = "Une erreur est survenue. Veuillez réessayer plus tard.";
        }
    };
</script>

<div>
    <h2>Modifier le mot de passe</h2>
    {#if !!error}
        <div class="feedback error">
            <p class="subtitle">Erreur</p>
            <p>{error}</p>
        </div>
    {/if}
    {#if success && !error}
        <div class="feedback success">
            <p class="subtitle">Succès</p>
            <p>Votre mot de passe a été mis à jour avec succès.</p>
        </div>
    {/if}
    <form on:submit|preventDefault={handleSubmit}>
        <label for="currentPassword">Mot de passe actuel :</label>
        <input bind:value={currentPassword} id="currentPassword" required type="password"/>

        <label for="newPassword">Nouveau mot de passe :</label>
        <input bind:value={newPassword} id="newPassword" required type="password"/>

        <label for="confirmNewPassword">Confirmer le nouveau mot de passe :</label>
        <input bind:value={confirmNewPassword} id="confirmNewPassword" required type="password"/>

        <button type="submit">Mettre à jour le mot de passe</button>
    </form>
</div>
