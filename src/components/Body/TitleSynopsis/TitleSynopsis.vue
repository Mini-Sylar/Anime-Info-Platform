<template lang="">
    <div class="is-a-container">
        <h1 class="anime-title">{{animeTitle}}</h1>
        <p class="anime-synposis">{{synopsis}}</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
        };
    },
    props: {
        animeData: {
            type: Object,
            required: true
        },
    },
}
</script>
<style>
.anime-synposis {
    height: 20vh;
    overflow-y: scroll;
    margin-block: 1.5rem;
    font-size: clamp(.5rem, .8rem, 1.1rem);
}

.anime-title {
    font-family: DexaPro-Bold;
    font-size: clamp(1.5rem, 3vw, 3.5rem);
    line-height: 3rem;
}
</style>