<template>
  <div class="is-a-container">
    <transition appear mode="out-in">
      <h1 class="anime-title" :key="title">{{ title }}</h1>
    </transition>
    <transition appear mode="out-in">
      <div class="synopsis-wrapper" :key="title">
        <p
          ref="synopsisRef"
          class="anime-synopsis"
          v-html="safeDescription"
          :class="{ expanded: isExpanded }"
        ></p>
        <button
          v-if="hasLongDescription"
          class="read-more-btn"
          type="button"
          @click="toggleDescription"
        >
          {{ isExpanded ? 'Show less ↑' : 'Show more ↓' }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import { sanitizeHtml } from '@/js/helpers.js'
import { useAnimeData } from '@/stores/anime_data.js'
import { setOpacity } from '@/js/helpers.js'

const props = defineProps({
  titleDescription: {
    type: Object
  }
})

const isExpanded = ref(false)
const synopsisRef = ref(null)
const accentColor = computed(() => useAnimeData().getAccentColor)
const readMoreColor = computed(() => setOpacity(accentColor.value, 0.85))
const readMoreBackground = computed(() => setOpacity(accentColor.value, 0.16))
const readMoreBorder = computed(() => setOpacity(accentColor.value, 0.55))

const title = computed(() => props.titleDescription.animeTitle)
const safeDescription = computed(() => sanitizeHtml(props.titleDescription.description))

// Reset when anime changes
watch(title, () => {
  isExpanded.value = false
})

// Descriptions over ~300 plain-text chars get a "Read more" toggle
const hasLongDescription = computed(() => {
  const raw = props.titleDescription.description || ''
  return raw.replace(/<[^>]*>/g, '').length > 300
})

const toggleDescription = async () => {
  const expanding = !isExpanded.value
  isExpanded.value = expanding

  if (expanding) {
    await nextTick()
    synopsisRef.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
}
</script>

<style scoped>
.synopsis-wrapper {
  display: flex;
  flex-direction: column;
}

.anime-synopsis {
  max-height: 7.5rem;
  overflow: hidden;
  margin-block: 0.8rem 0.2rem;
  font-size: clamp(0.8rem, 0.95vw, 1rem);
  line-height: 1.65;
  transition: max-height 0.4s ease;
  -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
  color: rgba(210, 210, 210, 0.9);
}

.anime-synopsis.expanded {
  max-height: 18rem;
  overflow-y: auto;
  -webkit-mask-image: none;
  mask-image: none;
  padding-right: 0.5rem;
  scroll-behavior: smooth;
}

.read-more-btn {
  background: v-bind('readMoreBackground') !important;
  border: 1px solid v-bind('readMoreBorder') !important;
  /* Use accent color: v-bind creates a scoped CSS var that wins due to higher specificity */
  color: v-bind('readMoreColor') !important;
  font-size: 0.82rem !important;
  font-weight: 800;
  cursor: pointer;
  padding: 0.38rem 0.72rem;
  margin-bottom: 0.4rem;
  letter-spacing: 0.03em;
  border-radius: 999px;
  transition:
    transform 0.15s ease,
    filter 0.15s ease,
    opacity 0.15s ease;
  text-align: left;
  min-width: unset !important;
  align-self: flex-start;
}

.read-more-btn:hover {
  opacity: 0.95;
  filter: brightness(1.08);
  transform: translateY(-1px);
}
</style>

<style>
/* These global styles are intentional — they apply to the elements rendered
   by v-html in the synopsis, which live outside the scoped boundary */
.anime-title {
  font-family: DexaPro-Bold;
  font-size: clamp(1.5rem, 3vw, 3.5rem);
  line-height: 1.15;
  transition: all 0.3s ease;
  text-wrap: balance;
}

@media screen and (max-width: 1025px) {
  .anime-title {
    text-align: center;
  }
}

@media screen and (max-width: 768px) {
  .anime-title {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    margin-top: 3rem;
    color: white;
  }
}
</style>
