<template>
    <div class="surprise-me-container">
        <select>
            <option v-for="(item, index) in genres" :key="index">{{ item }}</option>
        </select>
        <button type="button">
            Surprise Me
        </button>
    </div>
</template>
<script>
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
}
</script>
<style scoped>
.surprise-me-container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem;
    margin-top: .5rem;
}

button {
    background-color: #0195ff;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    border: none;
}
</style>