<template>
    <div class="more-info-container" v-once>
        <button class="btn btn-reverse btn-arrow" type="button" @click="openNewLink" title="Read more on AniList">
            <span>More Info<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 36.1 25.8"
                    enable-background="new 0 0 36.1 25.8" xml:space="preserve">
                    <g>
                        <line fill="none" stroke="#FFFFFF" stroke-width="3" stroke-miterlimit="10" x1="0" y1="12.9"
                            x2="34" y2="12.9"></line>
                        <polyline fill="none" stroke="#FFFFFF" stroke-width="3" stroke-miterlimit="10"
                            points="22.2,1.1 34,12.9 22.2,24.7   "></polyline>
                    </g>
                </svg></span>
        </button>
    </div>
</template>
<script>
export default {
    props: {
        animeID: {
            type: Number,
        }
    },
    methods: {
        openNewLink() {
            return window.open(
                `https://anilist.co/anime/${this.$props.animeID}`,
                '_blank' // <- This is what makes it open in a new window.
            );
        }
    },
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

/* Button CSS GOES HERE */
.btn,
button {
    border: none;
    letter-spacing: 1.5px;
    transition: color 0.1s cubic-bezier(0.16, 0.08, 0.355, 1),
        background 0.1s cubic-bezier(0.16, 0.08, 0.355, 1);
    display: inline-block;
    cursor: pointer;
    min-width: 9rem;
    outline: none;
    vertical-align: middle;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.btn:hover,
button:hover {
    color: #fff;
}

.btn-border {
    background-color: transparent;
    color: #1d1d1d;
}

.btn-arrow {
    position: relative;
    transition: background-color 300ms ease-out;
}

.btn-arrow span {
    display: inline-block;
    position: relative;
    transition: all 300ms ease-out;
    will-change: transform;
}

.btn-arrow:hover span {
    transform: translate3d(-1rem, 0, 0);
}

.btn-arrow svg {
    position: absolute;
    width: 1.1em;
    right: 0px;
    right: 0rem;
    opacity: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: all 300ms ease-out;
    will-change: right, opacity;
}

.btn-arrow svg * {
    stroke-width: 5;
}

.btn-arrow:hover svg {
    opacity: 1;
    right: -2rem;
}
</style>