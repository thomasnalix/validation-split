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
                await goto('/')
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
    <input bind:value={email} id="email" required type="email"/>

    <label for="password">Mot de passe:</label>
    <input bind:value={password} id="password" required type="password"/>

    <div class="radio-container">
        <label for="remember">Mémoriser mes identifiants</label>
        <input bind:checked={remember} id="remember" type="checkbox"/>
    </div>

    <button type="submit">Se connecter</button>
</form>
