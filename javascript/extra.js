const mobile_nav = document.querySelector(".links-mobile");
const ham = document.querySelector(".hamburger");
const body = document.querySelector("body");
ham.addEventListener("click", () => {
  mobile_nav.classList.toggle("show-links");
  if (mobile_nav.classList.contains("show-links")) {
    body.style = `
        overflow:hidden;
    `;
  } else {
    body.style = `
        overflow:scroll;
    `;
  }
});
