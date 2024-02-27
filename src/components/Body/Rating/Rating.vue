<template>
  <div class="ratings-container">
    <transition appear
                mode="out-in">
      <vue3starRatings v-model="rateValueUpdate"
                       class="star-rating"
                       :inactiveColor="'#c0c0c0'"
                       :numberOfStars="5"
                       :showControl="false"
                       :starColor="accentColor"
                       :starSize="'14'"
                       :disableClick="true"
                       :key="rate" />
    </transition>
    <span>
      <div class="main-value">
        <p>
          {{ rate }}/10
        </p>
      </div>

    </span>
  </div>
</template>
<script setup>
import vue3starRatings from 'vue3-star-ratings'
import { computed } from 'vue'


const props = defineProps({
  rate: {
    type: Number,
    required: true,
    default: 0
  },
  accentColor: {
    type: String
    // required: true
  }

})



const rateValueUpdate = computed(() => {
  return props.rate / 2
})


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
  margin-left: 1rem;
}

p {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;

}

@media screen and (max-width: 1025px) {
  p {
    color: #f1f1f1;
  }
}
</style>