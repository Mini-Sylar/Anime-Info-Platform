<template>
    <div class="main-container-loading">
        <div class="title-section shimmer"></div>
        <div class="body-section shimmer"></div>
        <div class="details-section shimmer"></div>
        <div class="rating-section shimmer"></div>
        <div class="actions-section shimmer"></div>
    </div>
</template>
<script>
export default {

}
</script>
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

.main-container-loading{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
    width: 100%;
}

.shimmer {
    -webkit-mask: linear-gradient(-60deg, #000 30%, #0005, #000 70%) right/350% 100%;
    background-repeat: no-repeat;
    animation: shimmer 2.5s infinite;
    background-color: #ffffffd2;
    opacity: .5;
}

@keyframes shimmer {
    100% {
        -webkit-mask-position: left
    }
}
</style>