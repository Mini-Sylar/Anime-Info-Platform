<template>
    <div class="ratings-container">
        <vue3-star-ratings v-model="rating" class="star-rating" :inactiveColor="'#c0c0c0'" :numberOfStars='5'
            :showControl="false" :starColor="'#0195ff'" :starSize="14" :disableClick="true" />
        <span>
            <p>
            <div class="main-value"></div>{{ rating }}
            <div class="over-ten"> /10</div>
            </p>
        </span>
    </div>

</template>
<script>
import vue3starRatings from "vue3-star-ratings";
export default {
    data() {
        return {
            rating: 8.5,
            color: "#0195ff"
        }
    },
    components: {
        "vue3-star-ratings": vue3starRatings,
    },
}
</script>
<style scoped>
.ratings-container {
    margin: 0;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0;
    /* margin-block: -2rem; */
    max-height: 3.5rem;
}

span {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    left: -2rem;
}

p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
}

.vue3-star-ratings__wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: fit-content;
    position: relative;
    left: -25px;
    top: 1px;
    /* background-color: red; */
}
</style>