<script setup>
import { useAnimeData } from "@/stores/anime_data";
import { useBookmarks } from "../../stores/bookmarks";
import { computed, ref } from "vue";
import { vOnClickOutside } from "@vueuse/components";
import { useToast } from "vue-toastification";

const toast = useToast();

const file = ref(null);
const isButtonDisable = ref(false);
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

const showExport = ref(true);
const showExportView = () => {
  showExport.value = true;
};
const showImport = () => {
  showExport.value = false;
};

const exportShow = async () => {
  isButtonDisable.value = true;
  try {
    await useBookmarks().exportBookmarks();
  } catch (e) {
    toast.error("No bookmarks to export");
  } finally {
    isButtonDisable.value = false;
  }
};

const importShows = async () => {
  isButtonDisable.value = true;
  if (file.value.files.length == 0) {
    toast.error("No file selected");
    return;
  }
  try {
    await useBookmarks().importBookmarks(file.value.files[0]);
    checkIfActive();
  } catch (e) {
    toast.error("Invalid file");
  } finally {
    isButtonDisable.value = false;
  }
};
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container" v-on-click-outside="checkIfActive">
        <div class="modal-header">
          <h3>Export/Import Bookmark List</h3>
        </div>
        <div class="swap-views">
          <button @click="showExportView" :class="[showExport == true ? 'is-active' : 'is-not-active']">
            Export
          </button>
          <button @click="showImport" :class="[showExport == true ? 'is-not-active' : 'is-active']">
            Import
          </button>
        </div>
        <div class="modal-body">
          <div class="export-container" v-if="showExport">
            <p>Export your anime list to a JSON file.</p>
            <button class="modal-default-button" @click="exportShow" :disabled="isButtonDisable">
              <transition name="fade">
                <span v-if="isButtonDisable"><svg class="is-contact-loader" version="1.1" id="L9"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                    <rect x="20" y="50" width="4" height="10" fill="#fff">
                      <animateTransform attributeType="xml" attributeName="transform" type="translate"
                        values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                    <rect x="30" y="50" width="4" height="10" fill="#fff">
                      <animateTransform attributeType="xml" attributeName="transform" type="translate"
                        values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                    <rect x="40" y="50" width="4" height="10" fill="#fff">
                      <animateTransform attributeType="xml" attributeName="transform" type="translate"
                        values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                  </svg></span>
              </transition>
              Export
            </button>
          </div>
          <div class="export-container" v-else>
            <p>Import your anime list from a JSON file.</p>
            <input class="modal-default-button" type="file" accept=".json" ref="file" typeof="JSON" />
            <button class="modal-default-button" @click="importShows" :disabled="isButtonDisable">
              <transition name="fade">
                <span v-if="isButtonDisable"><svg class="is-contact-loader" version="1.1" id="L9"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                    <rect x="20" y="50" width="4" height="10" fill="#fff">
                      <animateTransform attributeType="xml" attributeName="transform" type="translate"
                        values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                    <rect x="30" y="50" width="4" height="10" fill="#fff">
                      <animateTransform attributeType="xml" attributeName="transform" type="translate"
                        values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                    <rect x="40" y="50" width="4" height="10" fill="#fff">
                      <animateTransform attributeType="xml" attributeName="transform" type="translate"
                        values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                  </svg></span>
              </transition>
              Import
            </button>
          </div>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="$emit('close')">
              Cancel
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
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  z-index: 10;
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
  min-height: 12rem;
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
  display: flex;
  gap: 10px;
  justify-content: center;
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

.export-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.export-container button {
  width: 50%;
  margin: 0 auto;
}

.swap-views {
  padding-block: 1rem;
  border-bottom: 1px solid v-bind(setColor + "10");
  display: flex;
  gap: 1rem;
}

.swap-views button {
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 900;
}

.swap-views button:hover {
  text-decoration: underline;
}

.is-active {
  color: v-bind(setColor) !important;
  text-decoration: underline;
}

.is-not-active {
  color: v-bind('setColor + "40"') !important;
}

.modal-header h3 {
  margin-top: 0;
  color: v-bind(setColor) !important;
}

button:disabled {
  background-color: gray !important;
  transition: all 0.2s ease;
  cursor: not-allowed;
}
</style>
