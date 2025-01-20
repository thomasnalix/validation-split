<script lang="ts">
    let reason = '';
    let additionalInfo = '';
    let error: string | null = null;
    let success: boolean;

    const deleteProfile = async () => {
        if (additionalInfo || reason) {
            const res = await fetch('/api/profile', {
                method: 'DELETE',
            })
            if (!res.ok) {
                error = "Erreur lors de la suppression du profil"
            } else {
                success = true;
                error = null
            }
        }
    };
</script>

{#if !!error}
    <div class="feedback error">
        <p class="subtitle">Erreur</p>
        <p>{error}</p>
    </div>
{/if}
{#if success && !error}
    <div class="feedback success">
        <p class="subtitle">Succès</p>
        <p>Le profil a été supprimé avec succès</p>
    </div>
{/if}

<form on:submit|preventDefault={deleteProfile}>
    <h2>Supprimer le Profil</h2>
    <div>
        <p>Pour quelle(s) raison(s) souhaitez-vous supprimer votre profil ?</p>
        <div class="radio-container">
            <input type="checkbox" id="reason1" value="Je n’utilise plus l’application" bind:group={reason}/>
            <label for="reason1">Je n’utilise plus l’application</label>
        </div>
        <div class="radio-container">
            <input type="checkbox" id="reason2" value="Autre" bind:group={reason}/>
            <label for="reason2">Autre</label>
        </div>
    </div>

    <label>Indiquez vos raisons :</label>
    <textarea bind:value={additionalInfo}></textarea>

    <button type="submit" disabled={!(additionalInfo && reason)}>Supprimer</button>
</form>


<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>