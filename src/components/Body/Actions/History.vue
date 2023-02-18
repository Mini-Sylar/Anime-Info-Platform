<template >
    <div class="history-container">
        <ul>
            <li>Naruto</li>
            <li>?/Rhythmic Triangle Fighting Cards</li>
            <li>History 1</li>
            <li>History 1</li>
            <li>History 1</li>
        </ul>
    </div>
</template>
<script setup>

</script>
<style scoped>
.history-container {
    position: absolute;
    bottom: 7rem;
    background-color: #0195ff2c;
    padding: 2rem;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    height: 0;
    overflow: hidden;
    visibility: hidden;
    transition: height .2s ease-in-out, visibility .2s ease-in-out;
}

.show-history {
    height: 20rem;
    visibility: visible;
}
</style>