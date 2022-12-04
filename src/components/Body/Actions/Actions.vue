<template >
    <div>
        <div class="actions-container">
            <div class="share">
                <button type="button">
                    <font-awesome-icon icon="fa-solid fa-share-nodes" />
                </button>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        accentColor: {
            type: String,
            // required: true
        }
    },
    computed: {
        setColor: function () {
            return this.accentColor
        }
    }
}
</script>
<style scoped>
button {
    color: v-bind('setColor');
    background-color: transparent;
    border: none;
    cursor: pointer;
}

button:hover * {
    color: v-bind('setColor');
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