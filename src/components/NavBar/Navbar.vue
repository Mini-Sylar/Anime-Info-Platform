<script setup>
import { RouterLink, RouterView } from "vue-router";
import SearchboxVue from "./componentsNavBar/Searchbox.vue";
</script>

<template v-once>
    <header>
        <nav class="navigation-bar">
            <div class="main-links">
                <a href="https://anilist.co/search/anime/this-season" target="_blank" rel="noopener noreferrer"
                    class="is-url">Current Season</a>
                <RouterLink to="/" class="is-url">Home</RouterLink>
                <RouterLink to="/about" class="is-url">About</RouterLink>
                <RouterLink to="/contact" class="is-url">Contact</RouterLink>
            </div>
            <div class="search-bar" v-if="$route.path === '/'">
                <SearchboxVue />
            </div>
        </nav>
    </header>
</template>

<style scoped>
.navigation-bar {
    display: flex;
    padding: 1rem;
    width: min(90%, 1400px);
}

.main-links {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: min(5rem, 10rem);
    padding-left: .5rem;
}

header {
    backdrop-filter: blur(10px);

}
</style>
