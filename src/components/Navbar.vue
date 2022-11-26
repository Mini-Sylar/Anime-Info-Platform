<script setup>
import { RouterLink, RouterView } from "vue-router";
import SearchboxVue from "./componentsNavBar/Searchbox.vue";
</script>

<template>
    <header>
        <nav class="navigation-bar is-a-container">
            <div class="main-links">
                <a href="http://" target="_blank" rel="noopener noreferrer">Current Season</a>
                <!-- <RouterLink to="/">Home</RouterLink> -->
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/about">Contact</RouterLink>
            </div>
            <div class="search-bar">
                <SearchboxVue />
            </div>
        </nav>
    </header>
    <RouterView />
</template>

<style scoped>
.navigation-bar {
    display: flex;
}

.main-links {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: min(14rem, 16rem);
}
</style>
