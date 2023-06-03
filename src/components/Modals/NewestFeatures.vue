<script setup>
import { useAnimeData } from "@/stores/anime_data";
import { computed, ref, watch } from "vue";
import { vOnClickOutside } from "@vueuse/components";
const props = defineProps({
  show: Boolean,
  newFeatures: Object,
});

const setColor = computed(() => {
  return useAnimeData().getAccentColor;
});

const emit = defineEmits(["close"]);
const checkIfActive = () => {
  emit("close");
};
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container" v-on-click-outside="checkIfActive">
        <div class="modal-header">
          <h3>New Features 🎉</h3>
        </div>

        <div class="modal-body">
          <div
            class="content"
            v-for="(feature, index) in newFeatures"
            :key="index"
          >
            <h4 class="newest-title">{{ feature.title }}</h4>
            <div class="new-features">
              <p class="newest-description" v-html="feature.description"></p>
            </div>
          </div>
          <a
            href="https://github.com/Mini-Sylar/Anime-Info-Platform/releases/latest"
            target="_blank"
            >Full Release Notes 🔗</a
          >
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="$emit('close')">
              OK
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(10px);
}

.modal-container {
  width: min(40em, 100%);
  margin: auto;
  padding: 20px 30px;
  background-color: v-bind(setColor + "20");
  border-radius: 2px;
  border: 1px solid v-bind(setColor + "20");
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-default-button {
  background-color: v-bind(setColor) !important;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 900;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-header h3,
a {
  margin-top: 0;
  color: v-bind(setColor) !important;
}

a:hover {
  text-decoration: underline;
}

.newest-title {
  margin-bottom: 0 !important;
  font-weight: 900;
}

.newest-description {
  margin-top: 0 !important;
  color: #9f9f9f;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
