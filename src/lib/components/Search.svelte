<script lang="ts">
    import type {AnnonceModel} from "$lib/models/annonceModel";
    import Annonce from "$lib/components/Annonce.svelte";

    let domain = '';
    let city = '';
    let categoriesInput = '';
    let categories: string[];
    let results: AnnonceModel[] = [];
    let error: string | null = null;

    const fetchSearchResults = async () => {
        const queryParams = new URLSearchParams({
            domain, city
        });

        categories = categoriesInput.split(',');
        categories.forEach((category: string) => queryParams.append('categories', category));

        const res = await fetch(`/api/search/advanced?${queryParams.toString()}`);
        if (res.ok) {
            results = await res.json();
        } else {
            results = []
            error = "Aucun résultat";
        }
    };
</script>

<div>
    <h2>Recherche avancée</h2>
    <form on:submit|preventDefault={fetchSearchResults}>
        <label for="domain">Domaine</label>
        <input id="domain" type="text" bind:value={domain} required placeholder="Anglais"/>

        <label for="city">Ville</label>
        <input id="city" type="text" bind:value={city} placeholder="Paris"/>

        <label for="categories">Catégories</label>
        <input id="categories" type="text" bind:value={categoriesInput} placeholder="Design"/>

        <button type="submit">Rechercher</button>
    </form>

    {#if error}
        <p>{error}</p>
    {/if}

    <ul>
        {#each results as annonce}
            <Annonce {annonce}/>
        {/each}
    </ul>
</div>
