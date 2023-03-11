<template >
    <div>
        <div class="actions-container" v-once>
            <div class="share">
                <button type="button" class="action-button share-main" title="Share show" @click="useShareAnime">
                    <font-awesome-icon icon="fa-solid fa-share-nodes" class="share-hover" />
                </button>
                <!-- <button class="action-button" title="Take a screenshot" @click="takeScreenshot">
                    <font-awesome-icon icon="fa-solid fa-camera" class="grow-shrink" />
                </button> -->
                <History />
                <button class="action-button history-show" title="View History" @click="showHistoryMenu">
                    <font-awesome-icon icon="fa-solid fa-clock-rotate-left fa-spin" class="history-icon" />
                </button>
            </div>
            <!-- <div class="settings">
                <button type="button" class="action-button" title="Modify site settings">
                    <font-awesome-icon icon="fa-solid fa-cog fa-spin " class="settings-icon" />
                </button>
            </div> -->
        </div>
    </div>
</template>
<script setup>
import { useAnimeData } from "@/stores/anime_data";
import { onBeforeMount } from "vue";
import History from './History.vue';

const useShareAnime = () => {
    useAnimeData().shareAnimeMain()
}

const showHistoryMenu = () => {
    const historyContainer = document.querySelector('.history-container');
    historyContainer.classList.toggle('show-history');
}



onBeforeMount(() => {
    window.addEventListener('click', (e) => {
        const historyContainer = document.querySelector('.history-container');
        const historyButton = document.querySelector('.history-show');
        // historyButton.addEventListener('click', () => {
        //     historyContainer.classList.toggle('show-history');
        // })
        if (!historyContainer.contains(e.target) && !historyButton.contains(e.target)) {
            historyContainer.classList.remove('show-history');
        }
    })

    // if history container is visible and i click outside of it, hide it
})


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

@keyframes hithere {
    30% {
        transform: scale(1.2);
    }

    40%,
    60% {
        transform: rotate(-20deg) scale(1.2);
    }

    50% {
        transform: rotate(20deg) scale(1.2);
    }

    70% {
        transform: rotate(0deg) scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes elastic-spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(720deg);
    }
}

@keyframes flip {
    0% {
        transform: perspective(700px) rotateY(0);
        animation-timing-function: ease-out;
    }

    40% {
        transform: perspective(700px) translateZ(150px) rotateY(170deg);
        animation-timing-function: ease-out;
    }

    50% {
        transform: perspective(700px) translateZ(150px) rotateY(190deg) scale(1);
        animation-timing-function: ease-in;
    }

    80% {
        transform: perspective(700px) rotateY(360deg) scale(1);
        animation-timing-function: ease-in;
    }

    100% {
        transform: perspective(700px) scale(1);
        animation-timing-function: ease-in;
    }
}
</style>