<script setup>
import BodyVue from '../components/Body/Body.vue';
import Recommendations from '../components/Cards/Recommendations/Recommendations.vue';
import SurpriseMe from '../components/Cards/SurpriseMe/SurpriseMe.vue';

</script>

<template>
  <div class="left-side-main">
    <BodyVue />
  </div>
  <div class="right-side-main">
    <Recommendations />
    <SurpriseMe></SurpriseMe>
  </div>

</template>
