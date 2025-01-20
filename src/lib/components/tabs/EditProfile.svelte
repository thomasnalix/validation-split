<script lang="ts">
    import {onMount} from "svelte";
    import type {User} from "$lib/models/user";

    let user: User = {
        about: "",
        experience: "",
        photo: "",
        address: "",
        phone: "",
        userType: "Learner",
        trainer: {
            horaires: "",
            pricePerHour: 0,
            courseLocation: "Remote",
            iban: ""
        }
    };
    let error: string | null = null;
    let success: boolean = false;

    onMount(async () => {
        const userDataReq = await fetch('/api/profile');
        if (!userDataReq.ok) {
            error = "Impossible de récupérer les informations du profil";
            return;
        }
        const userData = await userDataReq.json();
        user = {
            about: userData.about ?? "",
            experience: userData.experience ?? "",
            photo: userData.photo ?? "",
            address: userData.address ?? "",
            phone: userData.phone ?? "",
            userType: userData.userType ?? "Learner",
            trainer: userData.trainer ?? {
                horaires: "",
                pricePerHour: 0,
                courseLocation: "Remote",
                iban: ""
            }
        };
    });

    const submitForm = async () => {
        success = false;
        try {
            const res = await fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
            if (!res.ok) {
                error = "Erreur lors de la modification du profil";
            } else {
                success = true;
                error = null;
            }
        } catch (err: any) {
            error = err.message;
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
        <p>Le profil a été sauvegardé avec succès</p>
    </div>
{/if}
<form on:submit|preventDefault={submitForm}>

    <h2>Modifier le Profil</h2>
    <label>A propos :</label>
    <textarea bind:value={user.about}></textarea>

    <label>Expérience :</label>
    <input type="text" bind:value={user.experience}/>

    <label>Photo (URL) :</label>
    <input type="url" bind:value={user.photo}/>

    <label>Téléphone :</label>
    <input type="tel" bind:value={user.phone}/>

    <label>Adresse :</label>
    <input type="text" bind:value={user.address}/>

    <label>Type d’utilisateur :</label>
    <div>
        <div class="radio-container">
            <input type="radio" id="trainer" value="Trainer" bind:group={user.userType}/>
            <label for="trainer">Formateur</label>
        </div>
        <div class="radio-container">
            <input type="radio" id="learner" value="Learner" bind:group={user.userType}/>
            <label for="learner">Apprenant</label>
        </div>
    </div>

    {#if user.userType === "Trainer"}
        <h3>Informations Formateur</h3>

        <label>Horaires :</label>
        <input type="text" bind:value={user.trainer.horaires}/>

        <label>Prix/heure :</label>
        <input type="number" bind:value={user.trainer.pricePerHour}/>

        <label>Lieu de cours :</label>
        <div class="radio-container">
            <input type="radio" id="remote" value="Remote" bind:group={user.trainer.courseLocation}/>
            <label for="remote">A distance</label>
        </div>
        <div class="radio-container">
            <input type="radio" id="home" value="Home" bind:group={user.trainer.courseLocation}/>
            <label for="home">Chez lui</label>
        </div>
        <div class="radio-container">
            <input type="radio" id="learner" value="Learner" bind:group={user.trainer.courseLocation}/>
            <label for="learner">Chez l’apprenant</label>
        </div>

        <label>IBAN :</label>
        <input type="text" bind:value={user.trainer.iban}/>
    {/if}

    <button type="submit">Mettre à jour</button>
</form>
