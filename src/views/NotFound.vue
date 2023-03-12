<template >
    <div>
        <div class="main-not-found">
            <h1>404</h1>
            <h2>You seem to have lost your way!</h2>
            <p>Don't worry, We'll get you right back on track</p>
            <router-link to="/" class="go-back-home">Go Back Home</router-link>
            <div class="girl-crying">
                <img src="@/assets/images/anime-cry.gif" loading="lazy" alt="Lost user">
            </div>
        </div>

    </div>
</template>
<script>
import { useAnimeData } from '@/stores/anime_data.js'
export default {
    mounted() {
        const mainAnimeData = useAnimeData()
        mainAnimeData.fetchAnimeData('Naruto')
    },
}
</script>
<style scoped>
h1 {
    font-size: clamp(4rem, 6rem, 12rem);
}

.main-not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0;
    width: 100vw;
}

img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

* {
    margin-bottom: 0;
}

.go-back-home {
    color: #000;
    padding: 1rem 1rem;
    border-radius: 5px;
    text-decoration: none;
    font-weight: 600;
    transition: all .3s ease-in-out;
}
</style>