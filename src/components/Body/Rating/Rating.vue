<template>
    <div class="ratings-container">
        <!-- TODO Call manual refresh on vue 3 star ratings -->
        <transition appear mode="out-in">


            <vue3-star-ratings v-model="rateValueUpdate" class="star-rating" :inactiveColor="'#c0c0c0'"
                :numberOfStars='5' :showControl="false" :starColor="setColor()" :starSize="'14'" :disableClick="true"
                :key="triggerRefreshOnComponent" />
        </transition>
        <span>
            <p>
            <div class="main-value"></div>{{ rate }}
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
            color: "#0195ff",
            triggerRefreshOnComponent: 0,
            rateValue: 0
        }
    },
    components: {
        "vue3-star-ratings": vue3starRatings,
    },
    props: {
        rate: {
            type: Number,
            default: 0
        },
        accentColor: {
            type: String,
            // required: true
        }
    },
    computed: {
        rateValueUpdate() {
            this.rateValue = this.rate / 2
            this.forceRender()
            return this.rateValue
        },

    },
    methods: {
        forceRender() {
            this.triggerRefreshOnComponent += 1
        },
        setColor: function () {
            return this.accentColor
        }
    }
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


/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

</style>