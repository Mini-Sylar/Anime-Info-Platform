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
            genre: "Action",
            episodes: 12,
        };
    },
}
</script>
<style scoped>
div p {
    font-size: clamp(.5rem, .8vw, 1rem);
}
</style>