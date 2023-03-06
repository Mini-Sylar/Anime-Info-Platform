<template>
    <div>
        <aside class="nav-mobile">
            <RouterLink to="/" class="is-url" @click="hideMenu">Home</RouterLink>
            <RouterLink to="/about" class="is-url" @click="hideMenu">About</RouterLink>
            <RouterLink to="/contact" class="is-url" @click="hideMenu">Contact</RouterLink>
        </aside>
        <aside class="first"></aside>
    </div>
</template>
<script>

export default {
    data() {
        return {
        }
    },
    methods: {
        hideMenu() {
            document.querySelector(".nav-mobile").classList.remove("show-nav");
            document.querySelector(".first").classList.remove("show-nav");
            document.querySelector(".hamburger").classList.remove("open");
            document.body.style.overflow = 'scroll';
        }
    },

}
</script>
<style scoped>
.nav-mobile {
    width: 0;
    height: 100vmax;
    background-color: #333;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    flex-direction: column;
    gap: 2rem;
    right: 0;
    visibility: hidden;
    transition: all 1s ease;
    overflow: hidden;
    top: 0;
}

.first {
    display: block;
    content: "";
    position: absolute;
    width: 10%;
    height: 100vmax;
    background-color: #0195ff;
    z-index: 1;
    right: 0;
    visibility: hidden;
    transition: all 0.5s ease;
    top: 0;
}

.nav-mobile>a {
    color: #fff;
    font-size: 25px;
    font-weight: 900;
    transition: all 1s ease-in;
    opacity: 1;
}

.show-nav {
    width: 100%;
    visibility: visible;
}
</style>