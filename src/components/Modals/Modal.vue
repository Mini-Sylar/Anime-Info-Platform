<script setup>
import { useAnimeData } from "@/stores/anime_data";
import { computed } from "vue";
import { vOnClickOutside } from "@vueuse/components";
const props = defineProps({
  show: Boolean,
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
          <slot name="header">default header</slot>
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
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
  -webkit-backdrop-filter: blur(10px);
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

ul {
  list-style: none;
  /* Remove default bullets */
}

ul li::before {
  content: "\2022";
  /* Add content: \2022 is the CSS Code/unicode for a bullet */
  color: v-bind(setColor);
  /* Change the color */
  font-weight: bold;
  /* If you want it to be bold */
  display: inline-block;
  /* Needed to add space between the bullet and the text */
  width: 1em;
  /* Also needed for space (tweak if needed) */
  margin-left: -1em;
  /* Also needed for space (tweak if needed) */
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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

.modal-header h3 {
  margin-top: 0;
  color: v-bind(setColor) !important;
}

:global(.modal-header *) {
  color: v-bind(setColor) !important;
}
</style>
