<template >
    <transition  appear mode="out-in">
      <div class="trailer-component" v-if="trailer !== null" :key="trailerUrl">
        <iframe width="400" height="200" :src="trailerUrl" title="The Misfit of Demon King Academy | OFFICIAL TRAILER"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
    </div>
    </transition>
  
</template>
<script>
export default {
    data() {
        return {
        }
    },
    props: {
        trailer: {
            type: String,
            default: "",
        },
    },
    computed: {
        trailerUrl() {
            return `https://www.youtube.com/embed/${this.$props.trailer}`
        },
    }
}
</script>
<style scoped>
iframe {
    border-radius: 20px;
    transition: all .2s ease;
}
</style>