<template>
  <OnClickOutside @trigger="emit('close')">
    <div class="genre-wrapper">
      <button
        type="button"
        class="genre-toggle-btn"
        @click.stop="emit('toggle')"
        :title="isOpen ? 'Close genre picker' : 'Pick a genre'"
        aria-haspopup="listbox"
        :aria-expanded="isOpen"
      >
        <span class="current-genre-label">{{ modelValue }}</span>
        <svg
          :class="['chevron', { rotated: isOpen }]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
          />
        </svg>
      </button>

      <Transition name="genre-dropdown">
        <div v-if="isOpen" class="genre-grid" role="listbox">
          <button
            v-for="genre in genres"
            :key="genre"
            type="button"
            :class="[
              'genre-chip',
              {
                'genre-chip--active': modelValue === genre,
                'genre-chip--full-row': genre === 'Current Season'
              }
            ]"
            role="option"
            :aria-selected="modelValue === genre"
            @click.stop="selectGenre(genre)"
          >
            {{ genre }}
          </button>
        </div>
      </Transition>
    </div>
  </OnClickOutside>
</template>

<script setup>
import { computed } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import { useAnimeData } from '@/stores/anime_data.js'
import { setOpacity } from '@/js/helpers.js'

defineProps({
  modelValue: { type: String, required: true },
  isOpen: { type: Boolean, default: false },
  genres: { type: Array, required: true }
})

const emit = defineEmits(['update:modelValue', 'toggle', 'close'])

const accentColor = computed(() => useAnimeData().getAccentColor)
const chipActiveBg = computed(() => setOpacity(accentColor.value, 0.22))
const chipActiveBorder = computed(() => setOpacity(accentColor.value, 0.6))
const chipActiveHoverBg = computed(() => setOpacity(accentColor.value, 0.32))
const toggleBtnBg = computed(() => setOpacity(accentColor.value, 0.85))
const toggleBtnHoverBg = computed(() => setOpacity(accentColor.value, 0.46))
const menuBg = computed(() => setOpacity(accentColor.value, 0.12))
const menuBorder = computed(() => setOpacity(accentColor.value, 0.36))
const chipBg = computed(() => 'rgba(14, 14, 14, 0.2)')
const chipHoverBg = computed(() => setOpacity(accentColor.value, 0.26))

const selectGenre = (genre) => {
  emit('update:modelValue', genre)
  emit('close')
}
</script>

<style scoped>
.genre-wrapper {
  position: relative;
  z-index: 130;
}

.genre-toggle-btn {
  display: flex !important;
  align-items: center !important;
  gap: 0.45rem;
  padding: 0.7rem 1rem !important;
  border-radius: 0 999px 999px 0 !important;
  border: 1px solid v-bind('toggleBtnHoverBg') !important;
  border-left: none !important;
  cursor: pointer;
  font-weight: 800;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  min-width: unset !important;
  white-space: nowrap;
  color: #fff !important;
  background: v-bind('toggleBtnBg') !important;
  min-height: 2.7rem;
  box-shadow: none !important;
}

.genre-toggle-btn:hover {
  background: v-bind('toggleBtnHoverBg') !important;
}

.current-genre-label {
  font-size: 0.8rem;
  color: rgba(248, 248, 248, 0.95);
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chevron {
  width: 9px;
  height: 9px;
  fill: white;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.chevron.rotated {
  transform: rotate(180deg);
}

/* Genre grid popup */
.genre-grid {
  position: absolute;
  bottom: calc(100% + 10px);
  right: 0;
  width: 320px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding: 0.95rem;
  background-color: v-bind('menuBg');
  backdrop-filter: blur(16px) saturate(125%);
  -webkit-backdrop-filter: blur(16px) saturate(125%);
  border-radius: 10px;
  border: 1px solid v-bind('menuBorder');
  box-shadow: none;
  z-index: 99999;
}

.genre-chip {
  position: relative;
  z-index: 1;
  min-height: 2.55rem;
  padding: 0.65rem 0.5rem !important;
  border-radius: 8px !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  background: v-bind('chipBg') !important;
  color: rgba(236, 236, 236, 0.94) !important;
  font-size: 0.8rem !important;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
  line-height: 1.15;
  min-width: unset !important;
  font-weight: 600;
  letter-spacing: 0.008em;
}

.genre-chip:hover {
  background: v-bind('chipHoverBg') !important;
  border-color: rgba(255, 255, 255, 0.38) !important;
  color: white !important;
  transform: none;
}

/* Active chip uses dynamic accent color */
.genre-chip--active {
  background: v-bind('chipActiveBg') !important;
  border-color: v-bind('chipActiveBorder') !important;
  color: white !important;
  font-weight: 700 !important;
}

.genre-chip--active:hover {
  background: v-bind('chipActiveHoverBg') !important;
}

.genre-chip--full-row {
  grid-column: 1 / -1;
}

/* Dropdown animation */
.genre-dropdown-enter-active,
.genre-dropdown-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.genre-dropdown-enter-from,
.genre-dropdown-leave-to {
  opacity: 0;
  transform: translateY(6px) scale(0.97);
}

@media screen and (max-width: 500px) {
  .genre-grid {
    right: 0;
    width: min(92vw, 320px);
    max-width: calc(100vw - 1rem);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.45rem;
    padding: 0.85rem;
  }

  .genre-chip {
    min-height: 2.8rem;
    padding: 0.6rem 0.5rem !important;
    font-size: 0.74rem !important;
  }

  .genre-chip--full-row {
    grid-column: 1 / -1;
  }

  .current-genre-label {
    max-width: 105px;
  }
}
</style>
