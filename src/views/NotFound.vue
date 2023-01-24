<template >
    <div>
      <div class="main-not-found">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <router-link to="/">Go to Home</router-link>
      </div>

    </div>
</template>
<script>
export default {
    mounted() {
        const mainAnimeData = useAnimeData()
        mainAnimeData.fetchAnimeData('Naruto')
    },
}
</script>
<style scoped>
    h1{
        color: red;
    }
    .main-not-found{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 80vh;
        width: 100vw;
    }
</style>