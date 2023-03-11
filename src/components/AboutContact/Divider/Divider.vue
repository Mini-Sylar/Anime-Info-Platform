<template>
    <div>
        <div class="top-line dividers"></div>
        <div class="icon arrow-icon-divider" @click=changeWidth>
            <font-awesome-icon icon="fa-solid fa-arrow-right"
                :class="[initiaChangeWidth == true ? 'rotate-right uses-dynamic' : 'rotate-left uses-dynamic']" />
        </div>
        <div class="bottom-line dividers"></div>
    </div>
</template>
<script setup>
import { useAnimeData } from '../../../stores/anime_data';
import { ref } from 'vue';
const animeData = useAnimeData();

const initiaChangeWidth = ref(animeData.toggleAbout);

const changeWidth = () => {
    initiaChangeWidth.value = !initiaChangeWidth.value;
    animeData.reduceWidth(initiaChangeWidth.value);

}
</script>
<style scoped>
* {
    color: #0195ff;
}

.top-line,
.bottom-line {
    width: 5px;
    height: min(30em, 30vh);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background-color: #0195ff;
    border-radius: 3px;
}

.icon {
    width: 100%;
    height: min(10em, 20vh);
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon * {
    padding: 1rem;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
}

.rotate-right {
    transform: rotate(180deg);
    transition: all 0.3s ease-in-out;
}

.rotate-left {
    transform: rotate(0deg);
    transition: all 0.3s ease-in-out;
}
</style>