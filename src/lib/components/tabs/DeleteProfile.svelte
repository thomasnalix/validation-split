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
            <input bind:group={reason} id="reason1" type="checkbox" value="Je n’utilise plus l’application"/>
            <label for="reason1">Je n’utilise plus l’application</label>
        </div>
        <div class="radio-container">
            <input bind:group={reason} id="reason2" type="checkbox" value="Autre"/>
            <label for="reason2">Autre</label>
        </div>
    </div>

    <label>Indiquez vos raisons :</label>
    <textarea bind:value={additionalInfo}></textarea>

    <button disabled={!(additionalInfo && reason)} type="submit">Supprimer</button>
</form>


<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>