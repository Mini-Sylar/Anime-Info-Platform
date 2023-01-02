<template>
    <div class="more-info-container"  v-once>
        <button>
            More Info
        </button>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
button {
    /* background-color: v-bind("setColor"); */
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    position: relative;
    left: -10px;
}

.more-info-container {
    display: flex;
    margin-block: .8rem;
    position: relative;
}
</style>