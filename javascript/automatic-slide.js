// Select anime-container
const animeContainer = document.querySelector(".anime-container");

// After every 5 seconds scroll in anime-container if at the end scroll to beginning
setInterval(() => {
  anime_container.scrollBy({
    left: 300,
    top: 0,
    behavior: "smooth",
  });
  if (
    anime_container.scrollLeft + anime_container.clientWidth >=
    anime_container.scrollWidth
  ) {
    anime_container.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }
}, 5000);
