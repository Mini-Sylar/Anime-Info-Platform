<template >
    <div class="left-about">
        <h1 class="about-title">About</h1>
        <p>Hey there! <br> Welcome to <span class="uses-dynamic">Anime Info Platform v.2.0.0</span>. A complete rewrite
            using
            Vue
            including all its
            performance benefits. All your favorite features are here including a new history section that shows your
            recently searched anime! The new redesigned site also comes with a redesigned mobile view making it easier to
            use on the go. I hope you enjoy the new site and be sure to follow me on social media to stay up-to-date with my
            latest updates and projects!. <br> This site is made possible with the help of <span
                class="uses-dynamic">AniList's </span>GraphQl
            API. Be
            sure to check it out!
            <br> <br> Thanks for stopping by, and be sure to follow me on social media to stay up-to-date with my latest
            updates and projects! <br><br>
            <span class="uses-dynamic">~ Terence</span>

        </p>
        <img loading="lazy" class="anime-image" src="@/assets/images/anime_hiding.png" alt="Anime girl hiding">
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
    transition: all 0.3s ease-in-out;
    position: relative;
}

.about-title {
    position: sticky;
    top: 0;
    width: 100%;
    margin-bottom: 2rem;
}

p {
    width: 30ch;
    overflow-x: hidden;
}

.anime-image {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;

}

@media screen and (max-width:768px) {
    .left-about {
        position: static;
    }

    .anime-image {
        width: 10%;
        bottom: 1rem;
    }

    p {
        width: 100%;
        height: 65vh;
        overflow-y: scroll;
    }

    .about-title {
        position: static;
    }
}
</style>