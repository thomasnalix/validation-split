<script lang="ts">
    import {goto} from "$app/navigation";

    let email = '';
    let password = '';
    let confirmPassword = '';
    let firstName = '';
    let lastName = '';
    let acceptTerms = false;
    let error: string | null = null;

    const submitRegister = async () => {
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password, confirmPassword, firstName, lastName, acceptTerms})
            });
            const data = await res.json();
            if (!res.ok) {
                error = data.error;
            } else {
                error = ""
                await goto('/')
            }
        } catch (err) {
            error = "Une erreur est survenue lors de l'inscription";
        }
    };
</script>

<h2>Inscription</h2>

{#if !!error}
    <div class="feedback error">
        <p class="subtitle">Erreur</p>
        <p>{error}</p>
    </div>
{/if}

<form on:submit|preventDefault={submitRegister}>
    <label for="firstName">Prénom:</label>
    <input bind:value={firstName} id="firstName" required type="text"/>

    <label for="lastName">Nom:</label>
    <input bind:value={lastName} id="lastName" required type="text"/>

    <label for="email">Email:</label>
    <input bind:value={email} id="email" required type="email"/>

    <label for="password">Mot de passe:</label>
    <input bind:value={password} id="password" required type="password"/>

    <label for="confirmPassword">Confirmer mot de passe:</label>
    <input bind:value={confirmPassword} id="confirmPassword" required type="password"/>

    <div class="radio-container">
        <label for="acceptTerms">J'accepte les conditions d'utilisation</label>
        <input bind:checked={acceptTerms} id="acceptTerms" required type="checkbox"/>
    </div>

    <button type="submit">S'inscrire</button>
</form>
