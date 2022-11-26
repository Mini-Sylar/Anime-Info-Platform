<template>
    <div class="is-a-container">
        <p>{{ year }}</p>
        <p>{{ genre }}</p>
        <p>{{ episodes }} episodes</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            year: 2021,
            genre: "Action / Comedy / Slice of Life / Supernatural",
            episodes: 12,
        };
    },
}
</script>
<style scoped>
div p {
    font-size: clamp(.7rem, .9vw, 2rem);
}
</style>