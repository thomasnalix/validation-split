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
    <input type="text" id="firstName" bind:value={firstName} required/>

    <label for="lastName">Nom:</label>
    <input type="text" id="lastName" bind:value={lastName} required/>

    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required/>

    <label for="password">Mot de passe:</label>
    <input type="password" id="password" bind:value={password} required/>

    <label for="confirmPassword">Confirmer mot de passe:</label>
    <input type="password" id="confirmPassword" bind:value={confirmPassword} required/>

    <div class="radio-container">
        <label for="acceptTerms">J'accepte les conditions d'utilisation</label>
        <input type="checkbox" id="acceptTerms" bind:checked={acceptTerms} required/>
    </div>

    <button type="submit">S'inscrire</button>
</form>
