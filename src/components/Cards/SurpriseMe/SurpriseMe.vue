<template>
    <div class="surprise-me-container" v-once>
        <form @submit.prevent="handlesubmit">
            <div class="splitbutton">
                <button type="submit">Surprise Me</button>
                <span class="dropdown-button">
                    <input type="checkbox" name="dropdown" id="dropdown">
                    <label for="dropdown" class="carrette_button"><font-awesome-icon icon="fa-solid fa-caret-down"
                            class="carret-toggle" title="Select genre" /></label>
                    <div class="contains-genres">
                        <ul>
                            <li v-for="(item, index) in genres" :key="index">
                                <input type="radio" :id="item" :value="item" name="animeGenre" v-model="genreQuery" />
                                <label :for="item">{{ item }}</label>
                            </li>
                        </ul>
                    </div>
                </span>
            </div>
        </form>
    </div>
</template>
<script>
import { useAnimeData } from '@/stores/anime_data.js'
import { ref } from 'vue'
export default {
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
            ]
        }
    },
    setup() {
        // if my pointer is not close to contain-genre and I click, close the dropdown
        window.addEventListener('click', (e) => {
            const containsGenres = document.querySelector('.contains-genres')
            const dropdownButton = document.querySelector('.dropdown-button')
            if (!containsGenres.contains(e.target) && !dropdownButton.contains(e.target)) {
                document.querySelector('input[name="dropdown"]').checked = false
            }
        })

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

input:checked+label>.carret-toggle {
    transform: rotate(180deg);

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
    max-height: 0;
    border-color: red;
    backdrop-filter: blur(10px);
    color: white;

    transition: max-height .2s ease-in-out;

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

input:checked~.contains-genres {
    max-height: 21rem;
}

input[type="checkbox"] {
    display: none;
}

label {
    cursor: pointer;
}

.carrette_button {
    padding: 8px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    background-color: #0195ff;
}
</style>