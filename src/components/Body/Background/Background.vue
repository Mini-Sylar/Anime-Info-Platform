<template >
    <div>
        <div class="image-container"><img :src="backgroundImage" alt="Main body image"></div>
    </div>
</template>
<script>
export default {
    props: {
        backgroundImage: {
            required: false,
        }
    }
}
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
    background-color: springgreen;
    height: 100vh;
}

img{
    filter: brightness(10%);
}
</style>