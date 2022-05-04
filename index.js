// Color Darkner
function shadeColor(color, percent) {
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
// Get Elements here
const title = document.querySelector(".anime-title");
const description = document.querySelector(".anime-synopsis");
const release_year = document.querySelector(".year");
const genre = document.querySelector(".genre");
const episode_count = document.querySelector(".episode-count");
const rating = document.querySelector(".rating");
const anime_cards = document.querySelectorAll(".cards");
const body = document.querySelector("body");
const more_info = document.querySelector(".more-info");
const search_button = document.querySelector(".btn-search");
const search_value = document.querySelector(".input-search");
const form = document.querySelector("#search-form");
const col_elements = document.querySelectorAll(".dynamic-color");
const surprise = document.querySelector(".surprise");

// Get Useful Values Here
let get_genre;
let get_ID;
let get_Color;
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Replace(data) {
  let main_data = data.data.Media;
  //   Render title Here
  title.innerHTML = data.data.Media.title.english
    ? ` <h1 class="anime-title style-1">${main_data.title.english}</h1>`
    : ` <h1 class="anime-title style-1">${main_data.title.romaji}</h1>`;
  //   Render Description Here
  description.innerHTML = `<p class="anime-synopsis style-1">${data.data.Media.description}</p>`;
  //   Render Release Year
  release_year.innerHTML = ` <span class="year">${main_data.seasonYear}</span>`;
  //   Render Genre
  genre.innerHTML = `<span class="genre">${main_data.genres.join(
    " / "
  )}</span>`;
  get_genre = genre.textContent;
  //   Render Episode Count
  episode_count.innerHTML = ` <span class="episode-count">${main_data.episodes} episodes</span>`;
  //   Render Rating
  rating.innerHTML = `<span class="rating">${
    main_data.averageScore / 10
  }/10</span>`;
  get_ID = main_data.id;
  //   Navigate to Anilist
  more_info.addEventListener("click", function () {
    window.open(`https://anilist.co/anime/${get_ID}`, "_blank");
  });

  //   Dynamic Colors
  console.log(col_elements[2]);
  //   0 is search
  //   1 is more info
  //   2 is cards
  get_Color = shadeColor(main_data.coverImage.color, -30);
  body.style.backgroundColor = get_Color;
  col_elements[0].style.backgroundColor = get_Color;
  col_elements[1].style.backgroundColor = get_Color;
  col_elements[7].style.backgroundColor = get_Color;
  col_elements[1].addEventListener("mouseenter", function () {
    col_elements[1].style.setProperty(
      "-webkit-filter",
      `drop-shadow(0 0 0.55rem ${get_Color})`
    );
  });
  col_elements[1].addEventListener("mouseleave", function () {
    col_elements[1].style.setProperty(
      "-webkit-filter",
      `drop-shadow(0 0 0 ${get_Color})`
    );
  });
  //   Change Surprise me Color
  col_elements[7].addEventListener("mouseenter", function () {
    col_elements[7].style.setProperty(
      "-webkit-filter",
      `drop-shadow(0 0 0.55rem ${get_Color})`
    );
  });
  col_elements[7].addEventListener("mouseleave", function () {
    col_elements[7].style.setProperty(
      "-webkit-filter",
      `drop-shadow(0 0 0 ${get_Color})`
    );
  });
  //   col_elements[2].style.backgroundColor = get_Color; "drop-shadow(0 0 0.55rem ${get_Color})
}

let headersList = {
  Accept: "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  "Content-Type": "application/json",
};

function callBody(setID = 140960) {
  let gqlBody = {
    query: `query ($id: Int) {
  Media (id: $id, type: ANIME) { 
    id
    title {
      english
      romaji
    }
    coverImage {
        large
        color
  }
  bannerImage
  description
  seasonYear
  genres
  episodes
  averageScore
  }
}`,
    variables: { id: setID },
  };

  let bodyContent = JSON.stringify(gqlBody);

  fetch("https://graphql.anilist.co/?id=15125", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      Replace(data);
      get_genre ? get_genre.split("/").join(",") : "Action";
      get_Color = data.data.Media.coverImage.color;
      console.log(get_Color);
    });
}

//   For Cards
let card_main;
function callCard(genre = "Action") {
  let gqlBody_Cards = {
    query: `query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      perPage
    }
    media (id: $id, genre: $search  type: ANIME) {
      id
      title {
        english
        romaji
      }
      
       coverImage {
        large
  }
    }
    
  }
}
`,
    variables: {
      search: get_genre ? genre : "Action",
      page: randomIntFromInterval(1, 200),
      perPage: 5,
    },
  };

  let cardContent = JSON.stringify(gqlBody_Cards);

  fetch("https://graphql.anilist.co/", {
    method: "POST",
    body: cardContent,
    headers: headersList,
  })
    .then(function (response) {
      return (card_main = response.json());
    })
    .then(function (card_data) {
      const find_card = card_data.data.Page.media;
      anime_cards.forEach((currentElement, index) => {
        currentElement.innerHTML = find_card[index].title.english
          ? find_card[index].title.english
          : find_card[index].title.romaji;
        // currentElement.innerHTML = find_card[index].title.english
        //   ? ` <div class="cards   dynamic-color">${find_card[index].title.english}</div>`
        //   : `  <div class="cards  dynamic-color">${find_card[index].title.romaji}</div>`;
        //   Set Styles Here
        currentElement.style = `
        background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0,0.6)), url(${find_card[index].coverImage.large});
        background-repeat: no-repeat;
        background-size: cover;
        box-shadow: none;
         border: 2px solid rgba(0, 0, 0, 0.301);
        border-radius: 5%;
        overflow:hidden
      `;
        currentElement.addEventListener("mouseenter", function () {
          currentElement.style = `
        background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0,0.1)), url(${find_card[index].coverImage.large});
        background-repeat: no-repeat;
        background-size: cover;
        box-shadow: 2px 25px 21px 1px ${get_Color};
         transition: all 1s ease;
        `;
        });
        currentElement.addEventListener("mouseleave", function () {
          currentElement.style = `
           transform: scale(1);
        background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0,0.6)), url(${find_card[index].coverImage.large});
        background-repeat: no-repeat;
        background-size: cover;
        transition: all 1s ease;
          box-shadow: none;
        `;
        });
        //    Onclick Replace Everything
        currentElement.addEventListener("click", function () {
          let getThatID = find_card[index].id;
          // MYQUERY HERE
          callBody(getThatID);
        });
      });
    });
}
// ============== Search Section =====================
function SearchAnime(searchQuery) {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let gqlBody = {
    query: `query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search type: ANIME) {
      id
      title {
        english
        romaji
      }
      genres
    }
  }
}`,
    variables: { search: searchQuery, page: 1, perPage: 1 },
  };

  let bodyContent = JSON.stringify(gqlBody);

  fetch("https://graphql.anilist.co/?id=15125", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let thisID = data.data.Page.media[0].id;
      callBody(thisID);
    });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // Broken For now
  SearchAnime(search_value.value);
  let randomGenre = get_genre.split(" / ");
  //   Random Genres Here... can be improved to submit entre genre as array
  callCard(randomGenre[Math.floor(Math.random() * randomGenre.length)]);
  form.reset();
});

surprise.addEventListener("click", function () {
  let randomGenre = get_genre.split(" / ");
  callCard(randomGenre[Math.floor(Math.random() * randomGenre.length)]);
  console.log("clicked");
});

// Start With SPY X FAMILY
document.onload = callBody();
callCard();
