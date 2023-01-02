<template >
    <div>
        <div class="actions-container"  v-once>
            <div class="share">
                <button type="button" class="action-button">
                    <font-awesome-icon icon="fa-solid fa-share-nodes" />
                </button>

            </div>
        </div>
    </div>
</template>
<script>
export default {
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
}
</style>