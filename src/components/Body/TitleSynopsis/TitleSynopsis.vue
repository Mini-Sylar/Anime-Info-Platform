<template>
  <div class="is-a-container">
    <transition appear mode="out-in">
      <h1 class="anime-title" :key="title">{{ title }}</h1>
    </transition>
    <!-- Add transtion to description -->
    <transition appear mode="out-in">
      <p class="anime-synposis" v-html="titleDescription.description" :key="title"></p>
    </transition>
  </div>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  titleDescription: {
    type: Object
  }
})

const title = computed(() => {
  return props.titleDescription.animeTitle
})
</script>
<style>
.anime-synposis {
  height: 20vh;
  overflow-y: scroll;
  margin-block: 1.5rem;
  font-size: clamp(0.8rem, 0.95vw, 2rem);
}

.anime-title {
  font-family: DexaPro-Bold;
  font-size: clamp(1.5rem, 3vw, 3.5rem);
  line-height: 3rem;
  transition: all 1s ease-in;
  content: 'hello world';
}

@media screen and (max-width: 1025px) {
  .anime-title {
    text-align: center;
    justify-content: center;
  }
}

@media screen and (max-width: 768px) {
  .anime-title {
    font-size: clamp(1.5rem, 3vw, 3.5rem);
    height: 100%;
    margin-top: 3rem;
    line-height: 1.5rem;
    display: flex;
    align-items: flex-end;
    color: white;
  }

  .anime-synposis {
    color: #f1f1f1;
  }
}
</style>
