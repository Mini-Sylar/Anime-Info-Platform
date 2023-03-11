<template >
    <div>
        <div class="actions-container" v-once>
            <div class="share">
                <button type="button" class="action-button share-main" title="Share show" @click="useShareAnime">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="share-hover">
                        <path
                            d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" />
                    </svg>
                </button>
                <transition name="show-history">
                    <History v-if="showModal == true" v-on-click-outside="closeModal" />
                </transition>
                <button type="button" class="action-button history-show" title="View History" @click="showHistoryMenu">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="history-icon">
                        <path
                            d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z" />
                    </svg>
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

.action-button svg {
    width: 40px;
    height: 40px;
}
</style>