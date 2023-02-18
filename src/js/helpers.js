// Shade Color
export function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

// Set Opacity
export const setOpacity = (hex, alpha) =>
  `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, 0)}`;

export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Share Anime
export function shareAnime(title, url) {
  if (navigator.share) {
    navigator
      .share({
        title: title,
        url: url,
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
  }
}
