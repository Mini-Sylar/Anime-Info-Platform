<script setup>
import { RouterLink, RouterView } from "vue-router";
import SearchboxVue from "./componentsNavBar/Searchbox.vue";
</script>

<template>
    <header>
        <nav class="navigation-bar">
            <div class="main-links">
                <a href="http://" target="_blank" rel="noopener noreferrer">Current Season</a>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/about">Contact</RouterLink>
            </div>
            <div class="search-bar"  v-if="$route.path === '/'">
                <SearchboxVue />
            </div>
        </nav>
    </header>
</template>

<style scoped>
.navigation-bar {
    display: flex;
    padding: 1rem;
    width: min(90%, 1200px);
}

.main-links {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: min(5rem, 10rem);
    padding-left: .5rem;
}
</style>
