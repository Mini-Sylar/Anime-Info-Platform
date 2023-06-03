<template>
  <div>
    <div class="top-line dividers"></div>
    <div class="icon arrow-icon-divider" @click="changeWidth">
      <svg
        :class="[
          $route.path == '/contact'
            ? 'rotate-right uses-dynamic arrow-right'
            : 'rotate-left uses-dynamic arrow-right',
        ]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
        />
      </svg>
    </div>
    <div class="bottom-line dividers"></div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const changeWidth = () => {
  if (router.currentRoute.value.path == "/contact") {
    router.push("/about");
    return;
  }
  router.push("/contact");
};
</script>
<style scoped>
* {
  color: #0195ff;
}

.top-line,
.bottom-line {
  width: 5px;
  height: min(30em, 30vh);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: #0195ff;
  border-radius: 3px;
}

.icon {
  width: 100%;
  height: min(10em, 20vh);
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon * {
  padding: 1rem;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
}

.rotate-right {
  transform: rotate(180deg);
  transition: all 0.3s ease-in-out;
}

.rotate-left {
  transform: rotate(0deg);
  transition: all 0.3s ease-in-out;
}

.arrow-right {
  width: 60px;
  height: 60px;
}
</style>
