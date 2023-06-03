<template>
  <transition appear mode="out-in">
    <div>
      <div class="search-box">
        <form
          @submit.prevent="handlesubmit"
          id="search-form"
          name="anime-search"
        >
          <button class="btn-search" type="submit" aria-label="Search Button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
              />
            </svg>
          </button>
          <input
            type="text"
            class="input-search dynamic-color"
            placeholder="Search for anime..."
            autocomplete="off"
            v-model="searchQuery"
          />
        </form>
      </div>
    </div>
  </transition>
</template>
<script>
// useAnimeStore Here
import { useAnimeData } from "@/stores/anime_data.js";
import { ref } from "vue";

export default {
  setup() {
    const mainAnimeData = useAnimeData();
    const searchQuery = ref("");
    const handlesubmit = () => {
      if (searchQuery.value === "") return;
      mainAnimeData.fetchAnimeData(searchQuery.value);
      searchQuery.value = "";
    };
    return {
      searchQuery,
      handlesubmit,
    };
  },
  computed: {
    setColor() {
      const mainAnimeData = useAnimeData();
      return mainAnimeData.getAccentColor;
    },
  },
};
</script>
<style scoped>
/* Search Bar From Hall Management */
.search-box {
  width: fit-content;
  height: fit-content;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0 0 0.75rem v-bind("setColor"));
}

.input-search {
  height: 10px;
  width: 0px;
  border-style: none;
  padding: 10px 10px;
  font-size: 16px;
  outline: none;
  border-radius: 25px;
  transition: all 0.5s ease-in-out;
  background-color: v-bind("setColor");
  caret-color: v-bind("setColor");
  padding-right: 40px;
  color: #fff;
}

.input-search::placeholder {
  color: #ffffff80;
  font-size: 16px;
  font-weight: 100;
}

.btn-search {
  padding-right: 1rem;
  border-style: none;
  font-size: 15px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 2px;
  top: 12%;
  color: #ffffff;
  background-color: transparent !important;
  pointer-events: painted;
}

.btn-search:focus ~ .input-search {
  width: 250px;
  border-radius: 0px;
  background-color: transparent !important;
  border-bottom: 1px solid #ffffff80;
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
}

.input-search:focus {
  width: 250px;
  border-radius: 0px;
  background-color: transparent !important;
  border-bottom: 1px solid #ffffff80;
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
}

svg {
  fill: white;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 2px;
  right: 100%;
}
</style>
