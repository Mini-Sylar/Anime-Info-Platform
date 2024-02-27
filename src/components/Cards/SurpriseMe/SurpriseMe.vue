<template>
  <div class="surprise-me-container"
       v-once>
    <form @submit.prevent="handlesubmit">
      <div class="splitbutton">
        <button type="submit">Surprise Me</button>
        <OnClickOutside @trigger="hideWhenClickedOutside">
          <span class="dropdown-button">
            <span role="button"
                  aria-label="Button to show genres"
                  @click.prevent="toggleShowGenre"
                  class="carrette_button">
              <svg :class="[showGenre == true ? 'carret-toggle rotate' : 'carret-toggle']"
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 320 512">
                <path
                      d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
              </svg>
            </span>

            <transition name="show-genre">
              <div class="contains-genres"
                   v-if="showGenre">
                <ul>
                  <li v-for="(item, index) in genres"
                      :key="index">
                    <input type="radio"
                           :id="item"
                           :value="item"
                           name="animeGenre"
                           v-model="genreQuery" />
                    <label :for="item">{{ item }}</label>
                  </li>
                </ul>
              </div>
            </transition>
          </span>
        </OnClickOutside>
      </div>
    </form>
  </div>
</template>
<script setup>
import { useAnimeData } from '@/stores/anime_data.js'
import { OnClickOutside } from '@vueuse/components'
import { ref } from 'vue'
import mixpanel from 'mixpanel-browser'

const genres = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Ecchi',
  'Fantasy',
  'Horror',
  'Mahou Shoujo',
  'Mecha',
  'Music',
  'Mystery',
  'Psychological',
  'Romance',
  'Current Season'
]

const showGenre = ref(false)



const mainAnimeData = useAnimeData()
const genreQuery = ref('Action')
const handlesubmit = () => {
  if (genreQuery.value == 'Current Season') {
    mainAnimeData.fetchCurrentSeason()
    mixpanel.track('Surprise Me', { genre: genreQuery.value })
    return
  }

  mainAnimeData.fetchSurprise(genreQuery.value)
  mixpanel.track('Surprise Me', { genre: genreQuery.value })
}


function hideWhenClickedOutside() {
  if (showGenre.value == true) {
    showGenre.value = false
  }
}

function toggleShowGenre() {
  showGenre.value = !showGenre.value
}


</script>
<style scoped>
.surprise-me-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: .85rem;
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

.carret-toggle {
  transition: transform 0.2s ease-in-out;
  color: white;
  fill: white;
  width: 10px;
  position: absolute;
  top: 30%;
  right: 32%;
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
  left: -8%;
  width: 120%;
  background-color: #0195ff6c;
  border-radius: 10px;
  z-index: 1;
  padding: 0.3rem;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
  height: 21rem;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  z-index: 9;
  color: white;
  transition: all 0.2s ease-in-out;
}

.contains-genres ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contains-genres li {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.carrette_button {
  padding: 0.469rem 12px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: #0195ff;
  position: relative;
}

.show-genre-active,
.show-genre-leave-active {
  height: 21em;
  transition: opacity 0.2s ease height 0.2 ease;
}

.show-genre-enter-from,
.show-genre-leave-to {
  height: 0;
  opacity: 0;
}

.rotate {
  transform: rotate(180deg);
}

@media screen and (max-width: 500px) {
  .contains-genres {
    right: 0;
    left: -13vw;
    margin: 0 auto;
    width: 65vw;
    height: 36rem;
  }

  .contains-genres ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .surprise-me-container{
    margin-block: 4rem;
  }
}
</style>
