<script lang="ts">
    import {goto} from "$app/navigation";

    let email = '';
    let password = '';
    let remember = false;
    let error: string | null = null;

    const submitLogin = async () => {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password, remember})
            });
            const data = await res.json();
            if (!res.ok) {
                error = data.error;
            } else {
               error = null
            }
        } catch (err) {
            error = "Une erreur est survenue lors de la connexion";
        }
    };
</script>

<h2>Connexion</h2>

{#if !!error}
    <div class="feedback error">
        <p class="subtitle">Erreur</p>
        <p>{error}</p>
    </div>
{/if}

<form on:submit|preventDefault={submitLogin}>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required/>

    <label for="password">Mot de passe:</label>
    <input type="password" id="password" bind:value={password} required/>

    <div class="radio-container">
        <label for="remember">Mémoriser mes identifiants</label>
        <input type="checkbox" id="remember" bind:checked={remember}/>
    </div>

    <button type="submit">Se connecter</button>
</form>
