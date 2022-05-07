/*
-------- Anime Information Platform v.1.0 ----------
--- Some Background Info ---
  Get data from AniList API and do stuff with the data, AniList uses 'GraphQl* syntax
---Sections---
Explanation on functions
1. ShadeColor() : 
  - This returns a darker varient of the accent color on certain elements

2. Replace(data) : 
  - This function contains all the elements that will modified
  - Takes data parameter; this is the JSON object returned by the API, from this data the elements are modified

3. callBody(id) :
  - This function contains the request that provides data for main body
   call Replace(data) to modify the elements
  - id: this represents the id of the anime we are looking for by default it is '140960' for Spy X Family

4. callCard(genre) :
  - This function contains the request that provides data for the suggestion cards
  - genre: default genre to be passed, initially it is "Action"
  - after modifying the cards, which ever card is clicked call callBody(id) to replace page body contents

5. SearchAnime(query) :
  - This function returns data that contains ID and title of anime you searched for so it can pass the ID to callBody(id)
    to change body contains

6. randomIntFromInterval() :
  - choose random index from a given lenght

----- Other Variables --------
get_genre : store "Genre" to be used in callCard(genre) globally
get_ID: store "ID" to be used by callBody(id) globally
get_Color: store "Color" to be used to change accents of elements
*/

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

const setOpacity = (hex, alpha) =>
  `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, 0)}`;
// Get Elements here
const title = document.querySelector(".anime-title");
const description = document.querySelector(".anime-synopsis");
const release_year = document.querySelector(".year");
const genre = document.querySelector(".genre");
const episode_count = document.querySelector(".episode-count");
const rating = document.querySelector(".rating");
const anime_cards = document.querySelectorAll(".cards");
const body = document.querySelector(".showBackroundImages");
const more_info = document.querySelector(".more-info");
const search_button = document.querySelector(".btn-search");
const search_value = document.querySelector(".input-search");
const form = document.querySelector("#search-form");
const col_elements = document.querySelectorAll(".dynamic-color");
const surprise = document.querySelector(".surprise");
const mobile_nav = document.querySelector(".links-mobile");
const ham = document.querySelector(".hamburger");

// Get Useful Values Here
let get_genre;
let get_ID;
let get_Color;
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// ============== Modify all elements ==============
function Replace(data) {
  let main_data = data.data.Media;
  //   Render title Here
  title.innerHTML = data.data.Media.title.english
    ? ` <h1 class="anime-title style-1">${main_data.title.english}</h1>`
    : ` <h1 class="anime-title style-1">${main_data.title.romaji}</h1>`;
  //   Render Description Here
  description.innerHTML = `<p class="anime-synopsis style-1">${data.data.Media.description}</p>`;
  //   Render Release Year
  release_year.innerHTML =
    main_data.seasonYear === null
      ? `<span class="year">TBA</span>`
      : `<span class="year">${main_data.seasonYear}</span>`;
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
  //   0 is search
  //   1 is more info
  //   2 is cards

  // Get color if null replace with darkened default color
  (get_Color =
    main_data.coverImage.color === null
      ? "#0195ff"
      : main_data.coverImage.color),
    (get_Color = shadeColor(get_Color, -30));
  body.style.backgroundColor = shadeColor(get_Color, -60);
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  body.style.backgroundImage =
    main_data.bannerImage === null
      ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(./images/404-no-wallpaper.jpg)`
      : main_data.id === 140960
      ? window.screen.width <= 425
        ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(./images/Spy-mobile.jpeg)`
        : `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(./images/spy-x-family-main.jpg)`
      : `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${main_data.bannerImage})`;

  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center center";
  body.classList.add("addtransition");
  mobile_nav.style.backgroundColor = setOpacity(
    shadeColor(get_Color, -60),
    0.7
  );

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

// =============== Replace page Body contents ================
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
    });
}

// ======================  Card Section ======================
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
  // Fetch data from here
  // First  then get
  fetch("https://graphql.anilist.co/", {
    method: "POST",
    body: cardContent,
    headers: headersList,
  })
    .then(function (response) {
      return (card_main = response.json());
    })
    .then(function (card_data) {
      // When you get data, perform some actions here (CARD DATA!)
      const find_card = card_data.data.Page.media;
      anime_cards.forEach((currentElement, index) => {
        // For each card
        // Set title
        currentElement.innerHTML = find_card[index].title.english
          ? find_card[index].title.english
          : find_card[index].title.romaji;
        // Set Background image here along with some styles
        currentElement.style = `
        background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0,0.6)), url(${find_card[index].coverImage.large});
        background-repeat: no-repeat;
        background-size: cover;
        box-shadow: none;
         border: 2px solid rgba(0, 0, 0, 0.301);
        border-radius: 5%;
        overflow:hidden
      `;
        // Mouse Enter to Mouseleave creates the hover effect when mouses passes on a card
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
        //    Onclick Replace every card based on a random genre
        currentElement.addEventListener("click", function () {
          let getThatID = find_card[index].id;
          // MYQUERY HERE
          callBody(getThatID);
          // temporarily store search query using local storage to reload what you searched previously
          localStorage["searchKey"] = find_card[index].title.english
            ? find_card[index].title.english
            : find_card[index].title.romaji;
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
  // Get the following details in a json from AniList API
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

  fetch("https://graphql.anilist.co/", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Check if there was an initial value... if not pass Spy X Family id and call...this function simulates a fresh load of the page
      let thisID =
        data.data.Page.media.length === 0 ? 140960 : data.data.Page.media[0].id;
      callBody(thisID);
    });
}

// Add event listners here
form.addEventListener("submit", function (e) {
  e.preventDefault()
  ValidateForm()
  form.reset();
});

// Refresh the recommendations list when you click on surprise me
surprise.addEventListener("click", function () {
  let randomGenre = get_genre.split(" / ");
  callCard(randomGenre[Math.floor(Math.random() * randomGenre.length)]);
});

//  Hamburger menu for mobile devices
ham.addEventListener("click", () => {
  mobile_nav.classList.toggle("show-links");
  if (mobile_nav.classList.contains("show-links")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
});

// Form Validation
function ValidateForm() {
  if (search_value.value === "") {
    return false;
  } else {
    // When a search is passed, call searchAnime and pass the query value to search
    SearchAnime(search_value.value);
    localStorage["searchKey"] = search_value.value;
    let randomGenre = get_genre.split(" / ");
    //   Random Genres Here... can be improved to submit entre genre as array
    callCard(randomGenre[Math.floor(Math.random() * randomGenre.length)]);
  }
}

// Call cards on load
callCard();

let myValue = localStorage["searchKey"] || "140960";

// Check if code has been run before on page
window.onload = function () {
  if (!("hasCodeRunBefore" in localStorage)) {
    SearchAnime(myValue);
  } else {
    callBody();
  }
};
