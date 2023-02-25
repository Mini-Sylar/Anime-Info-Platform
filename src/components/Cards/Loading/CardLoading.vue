<template>
    <div class="main-loading-cards">
        <div class="all-cards shimmer"></div>
        <div class="surprise-me-loading shimmer"></div>
    </div>
</template>

<style scoped >
.main-loading-cards {
    width: 43.2rem;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.all-cards {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 10rem;
    width: 100%;
}

.surprise-me-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 10rem;
    margin: 0 auto;
}
</style>