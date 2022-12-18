<template  >
    <div class="is-a-container">
        <transition appear mode="out-in">
            <h1 class="anime-title" :key="title">{{ title }}</h1>
        </transition>
        <!-- Add transtion to description -->
        <transition  appear mode="out-in">
            <p class="anime-synposis" v-html="titleDescription.description" :key="title" >
            </p>
        </transition>

    </div>
</template>
<script>
export default {
    data() {
        return {
        };
    },
    props: {
        titleDescription: {
            type: Object,
        },
    },
    computed: {
        title() {
            return this.$props.titleDescription.animeTitle
        }

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
    transition: all 1s ease-in;
    content: "hello world";
}


</style>