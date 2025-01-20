<script lang="ts">

    import {goto} from "$app/navigation";

    let error: string | null = null;

    async function onDisconnect() {
        const res = await fetch('/api/disconnect', {
            method: 'POST',
        })

        if (res.ok) {
            await goto('/')
        } else {

        }
    }
</script>

{#if !!error}
    <div class="feedback error">
        <p class="subtitle">Erreur</p>
        <p>{error}</p>
    </div>
{/if}

<p>Se deconnecter</p>
<button on:click={() => onDisconnect()}>Se deconnecter</button>