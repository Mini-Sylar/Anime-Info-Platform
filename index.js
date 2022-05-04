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

// Store Value Temporarily

//
let get_genre;
let get_ID;
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Replace(data) {
    main_data = data.data.Media;
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
    rating.innerHTML = `<span class="rating">${main_data.averageScore / 10
        }/10</span>`;
    get_ID = main_data.id;
    //   Navigate to Anilist
    more_info.addEventListener("click", function () {
        window.open(`https://anilist.co/anime/${get_ID}`, "_blank");
    });
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
        extraLarge
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
        });
}

//   For Cards
let card_main;
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
        extraLarge
  }
    }
    
  }
}
`,
    variables: {
        search: get_genre ? get_genre.split("/").join(",") : "Action",
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
            currentElement.style = `
        background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0,0.6)), url(${find_card[index].coverImage.extraLarge});
        background-repeat: no-repeat;
        background-size: cover;
      `;
            currentElement.addEventListener("mouseenter", function () {
                currentElement.style = `
        background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0,0.1)), url(${find_card[index].coverImage.extraLarge});
        background-repeat: no-repeat;
        background-size: cover;
        transition: all 1s ease;
        `;
            });
            currentElement.addEventListener("mouseleave", function () {
                currentElement.style = `
        background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0,0.6)), url(${find_card[index].coverImage.extraLarge});
        background-repeat: no-repeat;
        background-size: cover;
        transition: all 1s ease;
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
        .then(function (search_data) {
            let thisID = search_data.data.Page.media[0].id;
            callBody(thisID);
        });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    SearchAnime(search_value.value);
    form.reset();
});

// Start With SPY X FAMILY
document.onload = callBody();
