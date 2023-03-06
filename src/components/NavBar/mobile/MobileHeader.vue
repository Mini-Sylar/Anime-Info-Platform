<template lang="">
  <div>
       <ui-sidebar>
        
       </ui-sidebar>
    <nav>
      <div class="logo">
         <a href="https://anilist.co/search/anime/this-season" target="_blank" rel="noopener noreferrer"
                    class="is-url">Current Season</a>
      </div>
      <div id="nav-icon1" class="hamburger" v-on:click="showHam">
        <span></span>
        <span></span>
        <span></span>
      </div>
     
    </nav>
  </div>
</template>
<script>
import MobileSideBar from "./MobileSideBar.vue";
export default {
  data() {
    return {
      showNav: "show-nav",
    }
  },
  methods: {
    showHam() {
      document.querySelector(".nav-mobile").classList.toggle(this.showNav);
      const mobile_nav = document.querySelector(".nav-mobile");
      document.querySelector(".first").classList.toggle(this.showNav);
      if (mobile_nav.classList.contains("show-nav")) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'scroll';
      }

    },
  },
  components: {
    "ui-sidebar": MobileSideBar,
  },
  mounted() {

  },
};
</script>
<style scoped>
.no-scroll {
  overflow: hidden;
}

.logo {
  display: flex;
  width: 100%;
  overflow: hidden;
  z-index: 35;
}

.logo img {
  width: 25%;
  height: 20%;
  object-fit: contain;
  z-index: 5;
}

.hamburger {
  z-index: 99999
}

/* Ham */
#nav-icon1 {
  display: block;
  width: 50px;
  height: 45px;
  position: absolute;
  margin: 0 auto;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  right: 5%;
  top: 20px !important;
}

#nav-icon1 span {
  display: block;
  position: absolute;
  height: 3px;
  width: 90%;
  background: white;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
}

#nav-icon1 span:nth-child(1) {
  top: 0px;
}

#nav-icon1 span:nth-child(2) {
  top: 12px;
}

#nav-icon1 span:nth-child(3) {
  top: 24px;
}

#nav-icon1.open span:nth-child(1) {
  top: 12px;
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  transform: rotate(135deg);
}

#nav-icon1.open span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

#nav-icon1.open span:nth-child(3) {
  top: 12px;
  -webkit-transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  transform: rotate(-135deg);
}

@media screen and (max-width:821px) {
  #nav-icon1 {
    top: 5%;
  }
}

@media screen and (max-width: 426px) {
  .logo img {
    width: 30%;
    height: 20%;
    object-fit: contain;
  }

  #nav-icon1 {
    top: 3%;
  }
}
</style>
