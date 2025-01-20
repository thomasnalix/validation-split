<script lang="ts">

    let query = '';
    let quickResults: any = [];
    let error: any = null;

    const fetchQuickResults = async () => {
        const res = await fetch(`/api/search/quick?query=${query}`);
        if (res.ok) {
            quickResults = await res.json();
        } else {
            error = "Aucun résultat n'est lié à votre recherche";
        }
    };
</script>

<div>
    <h2>Recherche rapide</h2>
    <form on:submit|preventDefault={fetchQuickResults}>
        <label for="query">Domaine, Ville, Utilisateur</label>
        <input id="query" type="text" bind:value={query}/>

        <button type="submit">Rechercher</button>
    </form>

    {#if !!error}
        <p>{error}</p>
    {/if}

    <ul>
        {#each quickResults as result}
            <li>{result.name} - {result.domaine} - {result.city}</li>
        {/each}
    </ul>
</div>
