<template>
  <div class="main-container-loading">
    <div class="title-section shimmer"></div>
    <div class="body-section shimmer"></div>
    <div class="details-section shimmer"></div>
    <div class="rating-section shimmer"></div>
    <div class="actions-section shimmer"></div>
  </div>
</template>

<style scoped>
div {
  overflow: hidden;
}

.title-section {
  width: 10rem;
  height: 3rem;
}

.body-section {
  width: 70%;
  height: 10rem;
}

.details-section {
  width: 15rem;
  height: 5rem;
}

.rating-section {
  width: 5rem;
  height: 5rem;
}

.actions-section {
  width: 10rem;
  height: 3rem;
}

.main-container-loading {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 100%;
}
</style>
