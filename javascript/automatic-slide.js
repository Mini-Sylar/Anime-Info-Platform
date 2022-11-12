let scroller = setInterval(() => {
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

anime_container.addEventListener("mouseover", () => {
  clearInterval(scroller);
});

["ontouchstart", "ontouchmove"].forEach((event) => {
  anime_container.addEventListener(event, () => {
    clearInterval(scroller);
  });

  ["touchend", "mouseleave"].forEach((event) => {
    anime_container.addEventListener(event, () => {
      scroller = setInterval(() => {
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
    });
  });
});
