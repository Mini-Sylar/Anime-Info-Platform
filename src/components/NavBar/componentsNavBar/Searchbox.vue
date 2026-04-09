<template>
  <transition appear mode="out-in">
    <div ref="wrapperRef" class="search-wrapper">
      <div class="search-box">
        <form @submit.prevent="handleSubmit" id="search-form" name="anime-search">
          <button class="btn-search" type="submit" aria-label="Search Button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
              />
            </svg>
          </button>
          <input
            ref="inputRef"
            type="text"
            class="input-search"
            placeholder="Search for anime..."
            autocomplete="off"
            v-model="searchQuery"
            @keydown="handleKeydown"
            aria-autocomplete="list"
            aria-controls="autocomplete-list"
            :aria-activedescendant="activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined"
          />
        </form>
      </div>

      <!-- Autocomplete dropdown -->
      <Transition name="ac-drop">
        <ul
          v-if="showDropdown"
          id="autocomplete-list"
          class="autocomplete-list"
          role="listbox"
          aria-label="Anime suggestions"
        >
          <!-- Loading skeleton rows -->
          <template v-if="isLoading">
            <li v-for="n in 4" :key="n" class="suggestion-skeleton">
              <div class="sk-img"></div>
              <div class="sk-lines">
                <div class="sk-title"></div>
                <div class="sk-year"></div>
              </div>
            </li>
          </template>

          <!-- Results -->
          <template v-else>
            <li
              v-for="(item, index) in suggestions"
              :id="`suggestion-${index}`"
              :key="item.id"
              class="suggestion-item"
              :class="{ 'suggestion-item--active': index === activeIndex }"
              role="option"
              :aria-selected="index === activeIndex"
              @mousedown.prevent="selectSuggestion(item)"
            >
              <img
                :src="item.coverImage.medium"
                :alt="getTitle(item)"
                class="suggestion-img"
                loading="lazy"
              />
              <div class="suggestion-info">
                <span class="suggestion-title">{{ getTitle(item) }}</span>
                <span v-if="item.seasonYear" class="suggestion-year">{{ item.seasonYear }}</span>
              </div>
            </li>
          </template>
        </ul>
      </Transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useDebounceFn, onClickOutside } from '@vueuse/core'
import { useAnimeData } from '@/stores/anime_data.js'
import { searchSuggestions, headersList } from '@/js/AnimeQuery.js'

const mainAnimeData = useAnimeData()
const searchQuery = ref('')
const suggestions = ref([])
const isLoading = ref(false)
const activeIndex = ref(-1)
const wrapperRef = ref(null)
const inputRef = ref(null)

const setColor = computed(() => mainAnimeData.getAccentColor)
const accentAlpha = computed(() => `${setColor.value}28`)
const accentLine = computed(() => `${setColor.value}60`)

// Show the dropdown when there's something to show, or while loading with a query
const showDropdown = computed(
  () => searchQuery.value.trim().length >= 2 && (isLoading.value || suggestions.value.length > 0)
)

const getTitle = (item) => item.title.english || item.title.romaji

// Debounced fetch — fires 350 ms after the user stops typing
const fetchSuggestions = useDebounceFn(async (query) => {
  if (query.trim().length < 2) {
    suggestions.value = []
    isLoading.value = false
    return
  }
  isLoading.value = true
  try {
    const res = await fetch('https://graphql.anilist.co/', {
      method: 'POST',
      body: searchSuggestions(query),
      headers: headersList
    })
    const data = await res.json()
    suggestions.value = data?.data?.Page?.media ?? []
  } catch {
    suggestions.value = []
  } finally {
    isLoading.value = false
  }
}, 350)

watch(searchQuery, (val) => {
  activeIndex.value = -1
  if (val.trim().length >= 2) {
    isLoading.value = true // show skeleton immediately, debounce handles the actual fetch
    fetchSuggestions(val)
  } else {
    suggestions.value = []
    isLoading.value = false
  }
})

// Close on click outside
onClickOutside(wrapperRef, () => {
  suggestions.value = []
})

const selectSuggestion = (item) => {
  mainAnimeData.fetchAnimeData(getTitle(item))
  searchQuery.value = ''
  suggestions.value = []
  activeIndex.value = -1
}

const handleSubmit = () => {
  if (searchQuery.value.trim() === '') return
  // If user has a highlighted suggestion, use it; otherwise use the typed query
  if (activeIndex.value >= 0 && suggestions.value[activeIndex.value]) {
    selectSuggestion(suggestions.value[activeIndex.value])
  } else {
    mainAnimeData.fetchAnimeData(searchQuery.value.trim())
    searchQuery.value = ''
    suggestions.value = []
  }
}

const handleKeydown = (e) => {
  if (!showDropdown.value) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, suggestions.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, -1)
  } else if (e.key === 'Escape') {
    suggestions.value = []
    activeIndex.value = -1
  }
  // Enter is handled by the form submit
}
</script>

<style scoped>
.search-wrapper {
  position: relative;
  width: fit-content;
}

.search-box {
  width: fit-content;
  height: fit-content;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0 0 0.75rem v-bind('setColor'));
}

/* ── Input ── */
.input-search {
  height: 20px;
  width: 0px;
  border-style: none;
  padding: 13px 10px;
  font-size: 16px;
  outline: none;
  border-radius: 25px;
  transition: all 0.5s ease-in-out;
  background-color: v-bind('setColor');
  caret-color: v-bind('setColor');
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

.btn-search:focus ~ .input-search,
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

/* ── Dropdown ── */
.autocomplete-list {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  width: 280px;
  list-style: none;
  padding: 0.4rem;
  margin: 0;
  background: rgba(10, 10, 10, 0.97);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 12px;
  border: 1px solid v-bind('accentLine');
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.65),
    0 0 0 1px rgba(255, 255, 255, 0.04);
  z-index: 1000;
  overflow: hidden;
}

/* ── Suggestion item ── */
.suggestion-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.45rem 0.55rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.12s ease;
}

.suggestion-item:hover,
.suggestion-item--active {
  background: v-bind('accentAlpha');
}

.suggestion-img {
  width: 36px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.06);
}

.suggestion-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow: hidden;
}

.suggestion-title {
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(240, 240, 240, 0.95);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

.suggestion-year {
  font-size: 0.68rem;
  color: rgba(180, 180, 180, 0.6);
  font-weight: 400;
}

/* ── Loading skeleton ── */
.suggestion-skeleton {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.45rem 0.55rem;
  border-radius: 8px;
  pointer-events: none;
}

.sk-img {
  width: 36px;
  height: 50px;
  border-radius: 5px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.08);
  animation: sk-pulse 1.4s ease-in-out infinite;
}

.sk-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.sk-title {
  height: 0.7rem;
  width: 80%;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  animation: sk-pulse 1.4s ease-in-out infinite;
}

.sk-year {
  height: 0.55rem;
  width: 35%;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  animation: sk-pulse 1.4s ease-in-out 0.2s infinite;
}

@keyframes sk-pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.2;
  }
}

/* ── Dropdown animation ── */
.ac-drop-enter-active,
.ac-drop-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.ac-drop-enter-from,
.ac-drop-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
