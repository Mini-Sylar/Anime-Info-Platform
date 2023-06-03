<template>
  <transition appear mode="out-in">
    <div class="trailer-component" v-if="trailer !== null" :key="trailerUrl">
      <iframe
        width="400"
        height="200"
        :src="trailerUrl"
        title="The Misfit of Demon King Academy | OFFICIAL TRAILER"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    trailer: {
      type: String,
      default: "",
    },
  },
  computed: {
    trailerUrl() {
      return `https://www.youtube.com/embed/${this.$props.trailer}`;
    },
  },
};
</script>
<style scoped>
iframe {
  border-radius: 20px;
  transition: all 0.2s ease;
}

@media screen and (max-width: 821px) {
  .trailer-component {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  iframe {
    width: 80%;
    height: min(15rem, 30rem);
    margin: 0 auto;
  }
}

@media screen and (max-width: 500px) {
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
