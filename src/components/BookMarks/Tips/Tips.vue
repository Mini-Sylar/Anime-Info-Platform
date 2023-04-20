<template >
    <div>
        <button id="show-modal" @click="showInfo = true" title="Information on bookmarks">
            Info
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="uses-dynamic">
                <path
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg></button>

        <button @click="showImportExport = true" class="export" title="Import/Export bookmark list">
            Export/Import
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="uses-dynamic">
                <path
                    d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V288H216c-13.3 0-24 10.7-24 24s10.7 24 24 24H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM384 336V288H494.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H384zm0-208H256V0L384 128z" />
            </svg>
        </button>

        <Teleport to="body">
            <!-- use the modal component, pass in the prop -->
            <modal class="tip-bookmark" :show="showInfo" @close="showInfo = false">
                <template #header>
                    <h3 class="bookmark-header">Bookmarks</h3>
                </template>
                <template #body>
                    <div class="inner-body">
                        <p>You can now bookmark shows and track their next release</p>
                        <p>Few things to note:</p>
                        <div class="notes">
                            <ul class="notes-dot">
                                <li>All bookmarked shows are stored locally on your device</li>
                                <li>You can bookmark as many shows as you want. I would recommend you bookmark only the
                                    shows you are currently watching</li>
                                <li>You can always import/export your bookmarked shows anytime</li>
                            </ul>
                        </div>
                    </div>
                </template>
            </modal>
        </Teleport>
        <Teleport to='body'>
            <ImportExport :show="showImportExport" @close="showImportExport = false"></ImportExport>
        </Teleport>

    </div>
</template>
<script setup>
import Modal from "@/components/Modals/Modal.vue"
import ImportExport from "../../Modals/ImportExport.vue";
import { ref } from 'vue'
const showInfo = ref(false)
const showImportExport = ref(false)
</script>
<style scoped>
:global(.modal-body .notes) {
    padding: 1rem 2rem !important;
    color: silver;
}

svg {
    width: 1.5rem;
    height: 1.5rem;
}

button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    top: 8%;
    left: 2%;
    margin: 1rem;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

#show-modal:hover svg {
    animation: hithere 1s ease;
}

.export {
    left: 8%;
}

.export:hover svg {
    animation: gelatine 1s ease-in;
}


@media screen and (max-width:500px) {
    button {
        position: relative;
        left: 0;
    }

    .export {
        left: 0;
    }

}
</style>