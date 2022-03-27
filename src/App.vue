<script setup lang="ts">
import HomeView from './views/HomeView.vue';
</script>

<template>
    <header>
        <img alt="Last.fm logo" class="logo" src="@/assets/Lastfm_logo.svg" width="200" />
        Artist Search
    </header>

    <HomeView />
</template>

<style>
@import "@/assets/base.css";

#app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;

    font-weight: normal;
}

header {
    line-height: 1.5;
    max-height: 100vh;
    color: var(--vt-c-text-logo);
    font-size: 60px;
    font-weight: 500;
    margin-bottom: 20px;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

a,
.green {
    text-decoration: none;
    color: var(--vt-c-green);
    transition: 0.4s;
}

@media (hover: hover) {
    a:hover {
        background-color: hsla(160, 100%, 37%, 0.2);
    }
}

@media (min-width: 1024px) {
    body {
        display: flex;
        place-items: flex-start;
    }

    #app {
        padding: 0 2rem;
    }

    header {
        display: flex;
        place-items: center;
    }

    .logo {
        margin: 0 2rem 0 0;
    }
}
</style>
