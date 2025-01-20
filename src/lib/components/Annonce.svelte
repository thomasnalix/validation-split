<script lang="ts">
    import type {AnnonceModel} from "$lib/models/annonceModel";

    export let annonce: AnnonceModel;
</script>

<div class="annonce">
    <div class="header">
        <h3>{annonce.title}</h3>
        <span class="type">{annonce.type} - {annonce.valueType}</span>
    </div>
    <div class="details">
        <p><strong>Domaine:</strong> {annonce.domain}</p>
        <p><strong>Ville:</strong> {annonce.city}</p>
        <div class="categories">
            <strong>Catégories:</strong>
            {#each annonce.categories as category}
                <span class="category">{category}</span>
            {/each}
        </div>
    </div>
</div>

<style>
    .annonce {
        background-color: #f9f9f9;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        width: 100%;
        max-width: 500px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .header h3 {
        font-size: 1.25rem;
        color: #333;
        margin: 0;
    }

    .header .type {
        font-size: 0.875rem;
        color: #555;
        background-color: #f0f0f0;
        padding: 4px 8px;
        border-radius: 4px;
    }

    .details p {
        font-size: 1rem;
        color: #666;
        margin: 5px 0;
    }

    .categories {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .category {
        background-color: #e3f7e3;
        color: #4caf50;
        padding: 5px 10px;
        border-radius: 12px;
        font-size: 0.875rem;
        text-transform: capitalize;
    }

    .category:hover {
        background-color: #c8f1c8;
        cursor: pointer;
    }
</style>
