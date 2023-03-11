<template>
    <div class="surprise-me-container" v-once>
        <form @submit.prevent="handlesubmit">
            <div class="splitbutton">
                <button type="submit">Surprise Me</button>
                <OnClickOutside @trigger="hideWhenClickedOutside">
                    <span class="dropdown-button">
                        <span role="button" @click.prevent="toggleShowGenre" class="carrette_button"><font-awesome-icon
                                icon="fa-solid fa-caret-down"
                                :class="[showGenre == true ? 'carret-toggle rotate' : 'carret-toggle']"
                                title="Select genre" /></span>

                        <transition name="show-genre">
                            <div class="contains-genres" v-if="showGenre">
                                <ul>
                                    <li v-for="(item, index) in             genres" :key="index">
                                        <input type="radio" :id="item" :value="item" name="animeGenre"
                                            v-model="genreQuery" />
                                        <label :for="item">{{ item }}</label>
                                    </li>
                                </ul>
                            </div>
                        </transition>

                    </span>
                </OnClickOutside>
            </div>
        </form>
    </div>
</template>
<script>
import { useAnimeData } from '@/stores/anime_data.js'
import { OnClickOutside } from '@vueuse/components'
import { ref } from 'vue'
export default {
    components: {
        OnClickOutside
    },
    data() {
        return {
            genres: [
                "Action",
                "Adventure",
                "Comedy",
                "Drama",
                "Ecchi",
                "Fantasy",
                "Horror",
                "Mahou Shoujo",
                "Mecha",
                "Music",
                "Mystery",
                "Psychological",
                "Romance",
            ],
            showGenre: false
        }
    },
    setup() {
        const mainAnimeData = useAnimeData()
        const genreQuery = ref('Action')
        const handlesubmit = () => {
            mainAnimeData.fetchSurprise(genreQuery.value)
        }

        return {
            genreQuery,
            handlesubmit,
        }
    },
    methods: {
        toggleShowGenre() {
            this.showGenre = !this.showGenre
        },
        hideWhenClickedOutside() {
            if (this.showGenre == true) { this.showGenre = false }
        }
    },
}
</script>
<style scoped>
.surprise-me-container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem;
    margin-top: .1rem;
    gap: 1rem;
    position: relative;
}

button {
    background-color: #0195ff;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    border: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    z-index: 22;
    color: white;
    font-weight: 900;
}

.dropdown-button {
    border-left: 1px solid transparent;
    cursor: pointer;
}

.carret-toggle {
    transition: transform .2s ease-in-out;
    color: white;
}

.splitbutton {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.contains-genres {
    position: absolute;
    bottom: 3rem;
    right: 0;
    width: 100%;
    background-color: #0195ff2c;
    border-radius: 10px;
    z-index: 1;
    padding: .3rem;
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
    height: 21rem;
    backdrop-filter: blur(10px);
    color: white;
    transition: all .2s ease-in-out;

}

.contains-genres ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.contains-genres li {
    display: flex;
    align-items: center;
    gap: .5rem;
}

.carrette_button {
    padding: 8px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    background-color: #0195ff;
}


.show-genre-active,
.show-genre-leave-active {
    height: 21em;
    transition: opacity 0.2s ease height 0.2 ease;
}

.show-genre-enter-from,
.show-genre-leave-to {
    height: 0;
    opacity: 0;
}

.rotate {
    transform: rotate(180deg);
}
</style>