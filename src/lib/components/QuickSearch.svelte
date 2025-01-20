<script lang="ts">
    let searchTitle = '';
    let searchResults: any[] = [];
    let errorMessage = '';

    const handleSearch = async () => {
        errorMessage = '';
        if (!searchTitle) {
            errorMessage = "Veuillez remplir le champ titre";
            searchResults = [];
            return;
        }

        try {
            const res = await fetch(`/api/search/quick?title=${searchTitle}`);
            if (res.ok) {
                searchResults = await res.json();
            } else {
                const data = await res.json();
                errorMessage = data.error || "Erreur inconnue";
                searchResults = [];
            }
        } catch (error) {
            errorMessage = "Erreur de connexion au serveur";
            searchResults = [];
        }
    };
</script>

<main>
    <div class="search-container">
        <h1>Recherche rapide</h1>
        <input
                type="text"
                bind:value={searchTitle}
                placeholder="Entrez un titre (ex: Développeur Python)"
                class="search-input"
                on:input={handleSearch}
        />
        {#if errorMessage}
            <p class="error-message">{errorMessage}</p>
        {/if}

        {#if searchResults.length > 0}
            <ul class="results-list">
                {#each searchResults as result}
                    <li>{result.title} - {result.city}</li>
                {/each}
            </ul>
        {/if}
    </div>
</main>

<style>
    .search-container {
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
    }

    .search-input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        margin-bottom: 10px;
    }

    .error-message {
        color: red;
        font-size: 14px;
    }

    .results-list {
        list-style-type: none;
        padding: 0;
    }

    .results-list li {
        background-color: #f4f4f4;
        padding: 10px;
        margin-bottom: 5px;
        border-radius: 4px;
    }
</style>
