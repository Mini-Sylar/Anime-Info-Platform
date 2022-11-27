<script setup>
import BodyVue from '../components/Body/Body.vue';
// useAnimeDataHere
import { useAnimeData } from '@/stores/anime_data.js'
const mainData = useAnimeData()
</script>

<template>
  <div class="left-side-main">
    <BodyVue :animeData="mainData" />
  </div>
  <div class="right-side-main"></div>

</template>
