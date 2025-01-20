<script lang="ts">
    import {onMount} from "svelte";
    import type {User} from "$lib/models/user";

    let user: User | null;
    let error: string | null = null;

    onMount(async () => {
        const userDataReq = await fetch('/api/profile');
        if (!userDataReq.ok) {
            error = "Impossible de récupérer les informations du profil"
            return;
        }
        user = await userDataReq.json();
    })
</script>

{#if !!error}
    <div class="feedback error">
        <p class="subtitle">Erreur</p>
        <p>{error}</p>
    </div>
{/if}

{#if user}
    <div class="profile-info">
        <h2>Profil</h2>
        <img src={user.photo || '/default-avatar.png'} alt="Photo de profil"/>
        <p><strong>A propos :</strong> {user.about}</p>
        <p><strong>Expérience :</strong> {user.experience}</p>
        <p><strong>Téléphone :</strong> {user.phone}</p>
        <p><strong>Adresse :</strong> {user.address}</p>
        <p><strong>Type d’utilisateur :</strong> {user.userType}</p>
        {#if !!user.trainer && user.userType === "Trainer"}
            <h3>Informations Formateur</h3>
            <p><strong>Horaires :</strong> {user.trainer.horaires}</p>
            <p><strong>Prix/heure :</strong> {user.trainer.pricePerHour}</p>
            <p><strong>Lieu de cours :</strong> {user.trainer.courseLocation}</p>
            <p><strong>IBAN </strong> {user.trainer.iban}</p>
        {/if}
    </div>
{/if}

<style>
    .profile-info img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 1rem;
    }

    .profile-info p {
        margin: 0.5rem 0;
    }
</style>
