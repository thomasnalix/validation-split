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

    {#if !!error}
        <div class="feedback error">
            <p class="subtitle">Erreur</p>
            <p>{error}</p>
        </div>
    {/if}

    <form on:submit|preventDefault={fetchSearchResults}>
        <label for="domain">Domaine</label>
        <input bind:value={domain} id="domain" placeholder="Anglais" required type="text"/>

        <label for="city">Ville</label>
        <input bind:value={city} id="city" placeholder="Paris" type="text"/>

        <label for="categories">Catégories</label>
        <input bind:value={categoriesInput} id="categories" placeholder="Design" type="text"/>

        <button type="submit">Rechercher</button>
    </form>

    <ul>
        {#each results as annonce}
            <Annonce {annonce}/>
        {/each}
    </ul>
</div>
