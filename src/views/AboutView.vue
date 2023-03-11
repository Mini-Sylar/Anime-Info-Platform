<template>
  <main>
    <div class="is-a-container about-container">
      <About />
      <Divider />
      <Contact />
    </div>
    <div class="socials">
      <a class="social-link" href="#"><font-awesome-icon icon="fa-brands fa-github" /></a>
      <a class="social-link" href="#"><font-awesome-icon icon="fa-brands fa-linkedin-in" /></a>
      <a class="social-link" href="#"><font-awesome-icon icon="fa-brands fa-twitter" /></a>
    </div>
  </main>
</template>

<style scoped>
.about-container {
  display: flex;
  max-height: 80vh;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.socials {
  display: flex;
  justify-content: space-evenly;
  width: min(30em, 80vw);
  margin-top: 2rem;
}

.social-link {
  color: #0195ff;
  font-size: 2rem;
  transition: all 0.3s ease-in-out;
}
</style>

<script setup>
import About from '../components/AboutContact/About/About.vue';
import Contact from '../components/AboutContact/Contact/Contact.vue';
import Divider from '../components/AboutContact/Divider/Divider.vue';

</script>
