<script lang="ts">
    export let currentPage: string;
</script>

<nav class="header">
    <div class="logo">
        <a href="/">SPLIT</a>
    </div>
    <ul class="nav-links">
        <li class:active={currentPage === 'login'}>
            <a href="/login">Connexion</a>
        </li>
        <li class:active={currentPage === 'register'}>
            <a href="/register">Register</a>
        </li>
        <li class:active={currentPage === 'search'}>
            <a href="/search">Recherche</a>
        </li>
<!--        <li class:active={currentPage === 'calendar'}>-->
<!--            <a href="/calendar">Réserver un cours</a>-->
<!--        </li>-->
        <li class:active={currentPage === 'profile'}>
            <a href="/profile">Profil</a>
        </li>
<!--        <li class:active={currentPage === 'news'}>-->
<!--            <a href="/news">Actualités</a>-->
<!--        </li>-->
    </ul>
</nav>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: #f8f8f8;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .logo a {
        font-size: 1.5rem;
        font-weight: bold;
        text-decoration: none;
        color: #333;
    }

    .nav-links {
        display: flex;
        gap: 1rem;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .nav-links a {
        text-decoration: none;
        color: #666;
        font-weight: 500;
    }

    .nav-links a:hover {
        color: #000;
    }

    .nav-links .active a {
        color: #007BFF;
        font-weight: bold;
    }
</style>
