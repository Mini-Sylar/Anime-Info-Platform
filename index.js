// Get Elements here
const title = document.querySelector(".anime-title");
const description = document.querySelector(".anime-synopsis");
const release_year = document.querySelector(".year");
const genre = document.querySelector(".genre");
const episode_count = document.querySelector(".episode-count");
const rating = document.querySelector(".rating");
const anime_cards = document.querySelectorAll(".cards");

let headersList = {
  Accept: "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  "Content-Type": "application/json",
};

let gqlBody = {
  query: `query ($id: Int) {
  Media (id: $id, type: ANIME) { 
    id
    title {
      english
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
  variables: { id: 140960 },
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
    // console.log(data);
    main_data = data.data.Media;
    title.innerHTML = data.data.Media.title.english;
    description.innerHTML = data.data.Media.description;
    // description.querySelectorAll("br").forEach((element) => {
    //   element.remove()
    // });
    release_year.innerHTML = main_data.seasonYear;
    genre.innerHTML = main_data.genres.join(" / ");
    episode_count.innerHTML = `${main_data.episodes} episodes`;
    rating.innerHTML = `${main_data.averageScore / 10}/10`;
  });

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
      }
      
       coverImage {
        extraLarge
  }
    }
    
  }
}
`,
  variables: { search: "Action", page: 1, perPage: 5 },
};

let cardContent = JSON.stringify(gqlBody_Cards);

fetch("https://graphql.anilist.co/?id=15125", {
  method: "POST",
  body: cardContent,
  headers: headersList,
})
  .then(function (response) {
    return (card_main = response.json());
  })
  .then(function (card_data) {
    console.log(card_data);
    console.log(card_data.data.Page.media[2].title.english);
    const find_card = card_data.data.Page.media;
    anime_cards.forEach((currentElement, index) => {
      currentElement.innerHTML = find_card[index].title.english;
      currentElement.style = `
        background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0,0.6)), url(${find_card[index].coverImage.extraLarge});
        background-repeat: no-repeat;
        background-size: cover;
      `;
      currentElement.addEventListener("mouseover", function () {
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
    });
  });
