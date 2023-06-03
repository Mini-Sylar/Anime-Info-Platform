<template>
  <div>
    <div class="image-container">
      <transition appear mode="out-in">
        <img
          loading="lazy"
          :src="backgroundImage"
          alt="Main body image"
          :key="backgroundImage"
        />
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    backgroundImage: {
      required: false,
    },
  },
};
</script>
<style scoped>
* {
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  object-fit: cover;
}

.image-container {
  height: 100vh;
}

img {
  filter: brightness(10%);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@media screen and (max-width: 821px) {
  * {
    min-height: 100%;
    filter: blur(20px);
  }

  img {
    filter: brightness(30%);
  }
}
</style>
