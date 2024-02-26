<template>
  <div class="ratings-container">
    <!-- TODO Call manual refresh on vue 3 star ratings -->
    <transition appear mode="out-in">
      <vue3starRatings
        v-model="rateValueUpdate"
        class="star-rating"
        :inactiveColor="'#c0c0c0'"
        :numberOfStars="5"
        :showControl="false"
        :starColor="setColor"
        :starSize="'14'"
        :disableClick="true"
        :key="triggerRefreshOnComponent"
      />
    </transition>
    <span>
      <div>
        <div class="main-value"></div>
        {{ rate }}
        <div class="over-ten">/10</div>
      </div>
    </span>
  </div>
</template>
<script setup>
import vue3starRatings from 'vue3-star-ratings'
import {computed} from 'vue'


const props = defineProps({
  rate: {
    type: Number,
    default: 0
  },
  accentColor: {
    type: String
    // required: true
  }

})

// const color = ref('#0195ff')


const rateValueUpdate = computed(() => {
  return props.rate / 2
  
})

const setColor = computed()

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

@media screen and (max-width: 768px) {
  p {
    color: #f1f1f1;
  }
}
</style>
