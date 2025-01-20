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
        <input type="password" id="currentPassword" bind:value={currentPassword} required />

        <label for="newPassword">Nouveau mot de passe :</label>
        <input type="password" id="newPassword" bind:value={newPassword} required />

        <label for="confirmNewPassword">Confirmer le nouveau mot de passe :</label>
        <input type="password" id="confirmNewPassword" bind:value={confirmNewPassword} required />

        <button type="submit">Mettre à jour le mot de passe</button>
    </form>
</div>
