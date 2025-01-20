<script lang="ts">
    import { onMount } from 'svelte';
    import ProfileInfo from "$lib/components/tabs/ProfileInfo.svelte";
    import EditProfile from "$lib/components/tabs/EditProfile.svelte";
    import Calendar from "$lib/components/tabs/Calendar.svelte";
    import DeleteProfile from "$lib/components/tabs/DeleteProfile.svelte";

    let activeTab = 'profile';

    const tabs = [
        { id: 'profile', label: 'Afficher le Profil', component: ProfileInfo },
        { id: 'edit', label: 'Modifier le Profil', component: EditProfile },
        { id: 'calendar', label: 'Calendrier', component: Calendar },
        { id: 'delete', label: 'Supprimer le Profil', component: DeleteProfile }
    ];
</script>

<div class="profile-page">
    <h1>Mon Profil</h1>

    <div class="tabs">
        {#each tabs as tab}
            <button
                    class:active={activeTab === tab.id}
                    on:click={() => (activeTab = tab.id)}
            >
                {tab.label}
            </button>
        {/each}
    </div>

    <div class="tab-content">
        {#each tabs as tab}
            {#if activeTab === tab.id}
                <svelte:component this={tab.component} />
            {/if}
        {/each}
    </div>
</div>

<style>
    .profile-page {
        padding: 1rem;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .tabs {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    button {
        padding: 0.5rem 1rem;
        border: none;
        background: #ddd;
        cursor: pointer;
        border-radius: 4px;
    }

    button.active {
        background: #007bff;
        color: white;
    }

    .tab-content {
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        background: #f9f9f9;
    }
</style>
