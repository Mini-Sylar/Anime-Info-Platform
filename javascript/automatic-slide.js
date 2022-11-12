// Select anime-container
const animeContainer = document.querySelector(".anime-container");

// After every 5 seconds scroll in anime-container if at the end scroll to beginning

const checkState = false;

if (checkState == false) {
  setInterval(() => {
    animeContainer.scrollBy({
      left: 300,
      top: 0,
      behavior: "smooth",
    });
    if (
      animeContainer.scrollLeft + animeContainer.clientWidth >=
      animeContainer.scrollWidth
    ) {
      animeContainer.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
      });
    }
  }, 5000);
}
