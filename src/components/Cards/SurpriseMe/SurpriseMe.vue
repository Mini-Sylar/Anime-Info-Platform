<template>
    <div class="surprise-me-container"  v-once>
        <form @submit.prevent="handlesubmit">
            <button type="submit">
                Surprise Me
            </button>
            <select v-model="genreQuery">
                <option v-for="(item, index) in genres" :key="index" :value="item">{{ item }}</option>
            </select>
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
        const mainAnimeData = useAnimeData()
        const genreQuery = ref('Action')
        const handlesubmit = () => {
            // console.log(genreQuery.value);
            mainAnimeData.fetchSurprise(genreQuery.value)
        }
        return {
            genreQuery,
            handlesubmit,
        }
    }
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
    position: absolute;
    z-index: 22;
}

select{
    background-color: #0195ff;
    padding: 9.4px 20px;
    border-radius: 25px;
    cursor: pointer;
    border: none;
    color: white;
    position: absolute;
    z-index: 1;
    outline: none;
    
}
</style>