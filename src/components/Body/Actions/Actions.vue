<template >
    <div>
        <div class="actions-container" v-once>
            <div class="share">
                <button type="button" class="action-button share-main" title="Share show" @click="useShareAnime">
                    <font-awesome-icon icon="fa-solid fa-share-nodes" class="share-hover" />
                </button>
                <transition name="show-history">
                    <History v-if="showModal == true" v-on-click-outside="closeModal" />
                </transition>
                <button type="button" class="action-button history-show" title="View History" @click="showHistoryMenu">
                    <font-awesome-icon icon="fa-solid fa-clock-rotate-left fa-spin" class="history-icon" />
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAnimeData } from "@/stores/anime_data";
import { ref } from "vue";
import History from './History.vue';
import { vOnClickOutside } from '@vueuse/components'

const useShareAnime = () => {
    useAnimeData().shareAnimeMain()
}

const showModal = ref(false)

const showHistoryMenu = () => {
    showModal.value = !showModal.value
}

function closeModal() {
    showModal.value = false
}


</script>
<style scoped>
button {
    background-color: transparent;
    border: none;
    cursor: pointer;
}

button:hover * {
    cursor: pointer;
}

button * {
    /* padding: .2rem; */
    font-size: clamp(1rem, 1.5rem, 2rem);
    padding: 5px;
}

.actions-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 15rem;
}

.settings {
    display: flex;
    align-items: center;
    border-left: 2px solid rgba(110, 110, 110, 0.311);
    padding-left: 5px;
    justify-content: flex-end;
    width: 100%;
}

.share {
    display: flex;
    gap: 1rem;
    margin-right: 1.5rem;
}

.settings-icon:hover {
    animation: elastic-spin 3000ms;
}

.history-icon:hover {
    animation: elastic-spin 1500ms reverse;
}

/* CSS animation to grow and shrink while bouncing */
.grow-shrink:hover {
    animation: hithere 1s ease;
}

.share-main:hover .share-hover {
    animation: flip 1s ease-in;
}

.show-history-active,
.show-history-leave-active {
    height: 20em;
    transition: opacity 0.3s ease height 0.2 ease;
}

.show-history-enter-from,
.show-history-leave-to {
    height: 0;
    opacity: 0;
}
</style>