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

7. GetRecommendations(query) :
  - This function returns the proper recommendations based on rating by users on anilist, makes searching easier

8. getSupplement:
  - This function gets a supplement of shows that are added to existing cards if the recommendation of that show was not up to 10
  - this is particularly useful for old shows in the 1980s and older that have close to 0 recommendations

----- Other Variables --------
get_genre : store "Genre" to be used in callCard(genre) globally [REMOVED!]
get_ID: store "ID" to be used by callBody(id) globally
get_Color: store "Color" to be used to change accents of elements
fallback: data returned by the getSupplement function
final_fall: data returned after combining recommendations and supplements
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
const left_arrow = document.querySelector(".arrow-left");
const right_arrow = document.querySelector(".arrow-right");
const anime_container = document.querySelector(".anime-cards");
const share_info = document.querySelector(".share-info");
const trailer_container = document.querySelector(".trailer-container");
const main_video_container = document.querySelector(".main-video-container");

// Anime Genre
const anime_genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
];

function random_Gen() {
  return anime_genres[Math.floor(Math.random() * anime_genres.length)];
}

// Get Useful Values Here
let get_ID;
let get_Color;
// let find_card;
let here;
let filtered;
let fallback;
let final_fall;
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
  //   Render Episode Count
  episode_count.innerHTML = ` <span class="episode-count">${main_data.episodes} episodes</span>`;
  //   Render Rating
  rating.innerHTML = `<span class="rating">${
    main_data.averageScore / 10
  }/10</span>`;
  get_ID = main_data.id;
  // console.log("main data id", get_ID);
  //   Navigate to Anilist
  more_info.addEventListener("click", function () {
    window.open(`https://anilist.co/anime/${get_ID}`, "_blank");
  });
  //   Dynamic Colors
  //   0 is search
  //   1 is more info
  //   2 to 11 is cards
  //   7 -> 12 is now surprise me color

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
  col_elements[12].style.backgroundColor = get_Color;
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
  col_elements[12].addEventListener("mouseenter", function () {
    col_elements[12].style.setProperty(
      "-webkit-filter",
      `drop-shadow(0 0 0.55rem ${get_Color})`
    );
  });
  col_elements[12].addEventListener("mouseleave", function () {
    col_elements[12].style.setProperty(
      "-webkit-filter",
      `drop-shadow(0 0 0 ${setOpacity(get_Color, 0.7)})`
    );
  });

  // Dynamic Color For Scroll buttons
  left_arrow.style.backgroundColor = setOpacity(get_Color, 0.9);
  right_arrow.style.backgroundColor = setOpacity(get_Color, 0.9);
  left_arrow.style.borderColor = get_Color;
  right_arrow.style.borderColor = get_Color;
  //   Change Drop Shadow Color
  left_arrow.addEventListener("mouseenter", function () {
    left_arrow.style.setProperty(
      "-webkit-filter",
      `drop-shadow(0 0 0.3rem ${get_Color})`
    );
  });
  left_arrow.addEventListener("mouseleave", function () {
    left_arrow.style.setProperty("-webkit-filter", ``);
  });
  // Right Arrow
  //   Change Drop Shadow Color
  right_arrow.addEventListener("mouseenter", function () {
    right_arrow.style.setProperty(
      "-webkit-filter",
      `drop-shadow(0 0 0.3rem ${get_Color})`
    );
  });
  right_arrow.addEventListener("mouseleave", function () {
    right_arrow.style.setProperty("-webkit-filter", ``);
  });

  // Dynamic Color For Share Button!
  share_info.style.color = get_Color;
  //   Change Drop Shadow Color
  share_info.addEventListener("mouseenter", function () {
    share_info.style.setProperty(
      "-webkit-filter",
      `drop-shadow(0 0 0.3rem ${get_Color})`
    );
  });
  share_info.addEventListener("mouseleave", function () {
    share_info.style.setProperty("-webkit-filter", ``);
  });

  // Render Youtube Video
  console.log(main_data.trailer);
  main_data.trailer === null
    ? trailer_container.classList.add("fadeout")
    : trailer_container.classList.remove("fadeout"),
    (trailer_container.style.visibility = "visible"),
    (main_video_container.innerHTML = `
       <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/${
                    main_data.trailer === null
                      ? "dQw4w9WgXcQ" //this will never be true...but if it is...💀
                      : main_data.trailer.id
                  }"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="trailer-content"
                ></iframe>
      
      `);
}

//================== Cards copied from here
function replaceCards(data) {
  // let chunk = data.data.Media.recommendations.nodes;
  let chunk =
    data.data.Media == undefined
      ? data.data.Page.media
      : data.data.Media.recommendations.nodes;
  let firstPiece = chunk.map((e) => e.mediaRecommendation);
  // console.log("first piece", firstPiece);
  filtered = firstPiece.concat(fallback).filter(Boolean);
  // console.log("filtered", filtered);
  final_fall = chunk.length == 0 ? fallback : filtered;

  anime_cards.forEach((currentElement, index) => {
    let newIndex =
      data.data.Media == undefined
        ? data.data.Page.media[index]
        : data.data.Media.recommendations.nodes.length == 10
        ? data.data.Media.recommendations.nodes[index].mediaRecommendation
        : final_fall[index];
    // For each card
    // Set title
    currentElement.innerHTML = newIndex.title.english
      ? newIndex.title.english
      : newIndex.title.romaji;
    // console.log(newIndex.id);
    // Set Background image here along with some styles
    currentElement.style = `
        background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0,0.6)), url(${newIndex.coverImage.large});
        background-repeat: no-repeat;
        background-size: cover;
        box-shadow: none;
        border: 2px solid rgba(0, 0, 0, 0.301);
        border-radius: 5%;
        overflow: hidden;
      `;
    // Mouse Enter to Mouseleave creates the hover effect when mouses passes on a card
    currentElement.addEventListener("mouseenter", function () {
      currentElement.style = `
        background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0,0.1)), url(${newIndex.coverImage.large});
        background-repeat: no-repeat;
        background-size: cover;
        box-shadow: 1px 1px 2px 2px ${get_Color};
         transition: all 1s ease;
        `;
    });
    currentElement.addEventListener("mouseleave", function () {
      currentElement.style = `
           transform: scale(1);
        background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0,0.6)), url(${newIndex.coverImage.large});
        background-repeat: no-repeat;
        background-size: cover;
        transition: all 1s ease;
          box-shadow: none;
        `;
    });
  });
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
  trailer{
      id
    }
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
      get_Color = data.data.Media.coverImage.color;
      // GetRecommendations(get_ID);
    });
}

// ====================== Proper Recommendations ==============
// recommendations_id = 1 means get me the recommendations based on ID 140960 in this case spy x family
function GetRecommendations(recommendations_id) {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };
  let gqlBody = {
    query: `query ($id: Int,) { # Define which variables will be used in the query (id)
  Media(id:$id type:ANIME) {
    recommendations(page: 1,perPage:10,sort:RATING_DESC) {
      nodes { # Array of character nodes
        mediaRecommendation {
          id
          title{
            english
            romaji
            }
        coverImage
            {
              large
            }
        }
      }
    }
  }
}`,
    variables: { id: recommendations_id, page: 1, perPage: 10 },
  };
  let properRecommendations = JSON.stringify(gqlBody);

  fetch("https://graphql.anilist.co/?id=15125", {
    method: "POST",
    body: properRecommendations,
    headers: headersList,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Cards copied from here
      replaceCards(data);
      // find_card = data.data.Media.recommendations.nodes;
    });
}
// ===================== Get recommendations end ====================

// ======================  Card Section ======================
function callCard(genre) {
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
      search: genre,
      page: randomIntFromInterval(1, 200),
      perPage: 10,
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
      return response.json();
    })
    .then(function (data) {
      // Set fallback so you can update values
      // console.log(data);
      // console.log(fallback);
      fallback = data.data.Page.media;
      replaceCards(data);
      // console.log("orignaldata", data);
      // When you get data, perform some actions here (CARD DATA!)
      // find_card = data.data.Page.media;
    });
}

// ======================= Call Supplement ====================
function getSupplement(genre = "Action") {
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
      search: genre,
      page: randomIntFromInterval(1, 200),
      perPage: 10,
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
      return response.json();
    })
    .then(function (data) {
      // When you get data, perform some actions here (CARD DATA!)
      fallback = data.data.Page.media;
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
      getSupplement();
      GetRecommendations(thisID);
      anime_container.scrollTo(0, 0);
    });
}

// Add event listners here
form.addEventListener("submit", function (e) {
  e.preventDefault();
  ValidateForm();
  form.reset();
});

// Refresh the recommendations list when you click on surprise me
//    Onclick Replace every card based on a random genre
surprise.addEventListener("click", function () {
  // !!!!!!Found bug source (calling random genre keeps bugging)
  // console.log(random_Gen());
  callCard("Action");
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

left_arrow.addEventListener("click", function () {
  anime_container.scrollBy(-400, 0);
});

right_arrow.addEventListener("click", function () {
  anime_container.scrollBy(400, 0);
});

//    Onclick Replace main body of selected card
anime_cards.forEach((currentElement, index) => {
  currentElement.addEventListener("click", function () {
    let getThatID =
      final_fall[index].id === undefined
        ? final_fall[index].mediaRecommendation.id
        : final_fall[index].id;
    // console.log(getThatID);
    // MYQUERY HERE
    let temp_query =
      final_fall[index].id === undefined
        ? final_fall[index].mediaRecommendation.title.english
          ? final_fall[index].mediaRecommendation.title.english
          : final_fall[index].mediaRecommendation.title.romaji
        : final_fall[index].title.english
        ? final_fall[index].title.english
        : final_fall[index].title.romaji;
    callBody(getThatID);
    // anime_container.scrollTo(0, 0);
    // temporarily store search query using local storage to reload what you searched previously
    localStorage["searchKey"] = temp_query;
  });
});

// Form Validation
function ValidateForm() {
  if (search_value.value === "") {
    return false;
  } else {
    // When a search is passed, call searchAnime and pass the query value to search
    // ----Share Link Feature Starts here---    //  Get the search value and append it to the link when sending to someone
    here = new URL(window.location.href);
    here.searchParams.set("show", search_value.value);
    let mySearchValue = here.searchParams.get("show");
    SearchAnime(mySearchValue);
    localStorage["searchKey"] = mySearchValue;
    // Add query text to URL in address bar if you want to copy and paste
    window.history.pushState(null, "", `?show=${search_value.value}`);
  }
}

// Call cards on load [reversed]
// callCard();

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let valueFromLink = params.show;
// console.log(valueFromLink);

let myValue =
  valueFromLink !== null
    ? valueFromLink
    : localStorage["searchKey"] !== undefined
    ? localStorage["searchKey"]
    : "140960";
// Check if code has been run before on page
window.onload = function () {
  if (!("hasCodeRunBefore" in localStorage)) {
    SearchAnime(myValue);
  } else {
    callBody();
    anime_container.scrollTo(0, 0);
  }
};

// console.log("This is local storage:", localStorage["searchKey"]);

// Call Share API
share_info.addEventListener("click", (event) => {
  // Fallback, Tries to use API only
  // if navigator.share function is
  // available
  if (navigator.share) {
    navigator
      .share({
        // Title that occurs over
        // web share dialog
        title: `${title.textContent} | Anime Info Platform`,

        // URL to share
        url: `${location.origin}/?show=${title.textContent}`,
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch((err) => {
        // Handle errors, if occured
        console.log("Error while using Web share API:");
        console.log(err);
      });
  } else {
    // Alerts user if API not available
    navigator.clipboard.writeText(
      `${location.origin}/?show=${title.textContent}`
    );
    alert("Link Copied To Clipboard!");
  }
});
