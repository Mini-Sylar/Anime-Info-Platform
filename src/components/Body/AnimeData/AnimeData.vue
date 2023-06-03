<template>
  <div class="is-a-container">
    <p>{{ animeMetaData.year }}</p>
    <p>{{ formatGenre }}</p>
    <p>{{ animeMetaData.episodes }} episodes</p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    animeMetaData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formatGenre: function () {
      // Join elements in array seperated by a backslash
      return this.animeMetaData.genre.join(" / ");
    },
  },
};
</script>
<style scoped>
div p {
  font-size: clamp(0.7rem, 0.9vw, 2rem);
}

@media screen and (max-width: 768px) {
  p {
    color: #f1f1f1;
  }
}
</style>
