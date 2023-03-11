<template >
    <div class="left-about">
        <h1 class="about-title">About</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. A ut placeat suscipit! Voluptatibus dolores nihil
            consequuntur tempore rerum, libero provident voluptatem suscipit mollitia commodi et debitis sapiente quod fugit
            saepe? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia molestiae fugiat aliquam ut beatae.
            Explicabo at aperiam alias mollitia quidem fuga nesciunt praesentium quos, amet reiciendis, repudiandae quas
            nihil tempora eos reprehenderit dolores. Iusto, itaque accusamus magnam perferendis corporis quae distinctio
            nostrum quam dolorem. Expedita deleniti iusto voluptatum nisi atque fugit dolore maxime earum ut sit est fugiat
            vel rerum aliquam eveniet magni, quos blanditiis, labore veritatis commodi veniam. Itaque amet eos et cumque
            repudiandae magni neque officiis, totam necessitatibus, minima facere quos? Expedita, quo vitae delectus quia
            sunt suscipit molestiae, itaque autem sequi iste non labore placeat commodi reiciendis.</p>
    </div>
</template>
<script setup>
import { useAnimeData } from '../../../stores/anime_data';
import { computed } from 'vue';
const animeData = useAnimeData();

const aboutWidth = computed(() => {
    return animeData.aboutWidth;
});

</script>
<style scoped>
.left-about {
    width: v-bind(aboutWidth);
    height: min(40em, 80vh);
    padding: 0 2rem;
    overflow-x: hidden;
    background-color: darkblue;
    transition: all 0.3s ease-in-out;
}

.about-title {
    position: sticky;
    top: 0;
    width: 100%;
    background-color: darkblue;
}

p {
    width: 30ch;
    overflow-x: hidden;
}
</style>