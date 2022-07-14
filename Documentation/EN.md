## Continously Updated Documentation for the Anime-Info-Platform [English]
<hr>

This section gives information to get started working on the project, or using it files.<br />
These documentation touches on:
- Project File Structure  :>  [**here**](#project-file-structure)
- How certain functions within the body of the code works  :>  [**here**](#code-functions)
- ANILIST GraphQL API  :>  [**here**](#anilist-graphql-api)
- How the Frontend ties it together   :>  [**here**](#the-frontend-ties)

It also gets revised when major updates are made.

<br />

### Project File Structure
<hr>

```
📦Anime Info Platform
 ┣ 📂Documentation
 ┃ ┗ 📜EN.md
 ┣ 📂fonts
 ┣ 📂images
 ┣ 📂javascript
 ┃ ┗ 📜index.js
 ┣ 📂styles
 ┃ ┗ 📜style-contact.css
 ┣ 📜about.html
 ┣ 📜contact.html
 ┣ 📜index.html
 ┣ 📜README.md
 ┗ 📜style.css
```

> The **Documentation** folder holds an EN . md documentation file(this file you're viewing), with the posibility that documentations in other languages could later be added. 


> The **fonts** folder contains Dexapro ttf font file as part of the styling.


> The **images** folder contains images(yeah). There is a 404 image used when the call to the API doesn't return the anime's banner image. A doodle image for the about and contact page. The webpage's icon. The preloading images before a show is selected (for mobile devices and desktop).

>The **javascript** folder contains an index.js file, concerned with logic and the fetch from Anilist's API.

>The **styles** folder contains a style-contact.css file used in the about and contact pages.

> The **about.html** page gives a gist on the aim of the project and its features.

> The **contact.html** page, lets user reach back to the DEV.

> The **index.html** page is the root/main page of the application.

> The **README . md** file gives a quick overview of the project.

> The **style.css** is the stylesheet used in the index . html file.


<br />

### CODE Functions
<hr>

This section gives an insight to how certain functions are implemented in the code.

<details>
  <summary><b>shadeColor()</b></summary>
    
    function shadeColor(color, percent) {
      return "#" + RR + GG + BB;
    }
    
   Returns a darker varient of the accent color on certain elements
</details>


<details>
  <summary><b>replace(data)</b></summary>
    
    function Replace(data) {
      //returns nothing |=| resolves data argument to modify the DOM;
    }
    
   Contains all the main elements that will be modified.<br />
   Takes data parameter; this is the JSON object returned by the API, from this data the elements are modified
</details>


<details>
  <summary><b>callBody(id)</b></summary>
    
    function callBody(setID = 140960) {
      //returns nothing;
    }
    
   Contains the request that provides data for main body. Calls Replace(data) at the end to modify the elements<br />
   <b><i>id:</i></b> This represents the id of the anime being looking up, by default it is '140960' for Spy X Family.
</details>


<details>
  <summary><b>callCard(genre)</b></summary>
    
    function callCard(genre) {
      //returns nothing;
    }
    
   This function contains the request that provides data for the suggestion cards<br />
   <b><i>genre:</i></b> Default genre to be passed, initially it is "Action"
  after modifying the cards, which ever card is clicked, calls callBody(id) to replace page body contents.
</details>


<details>
  <summary><b>searchAnime(query)</b></summary>
    
    function SearchAnime(searchQuery) {
      //returns nothing;
    }
    
   Fetches ID and title of anime searched and passes the ID to callBody(id) to change body content.
</details>


<details>
  <summary><b>randomIntFromInterval()</b></summary>
    
    function randomIntFromInterval(min, max) {
       return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
   Returns a chosen random index from a given length
</details>


<details>
  <summary><b>getRecommendations(recommendations_id)</b></summary>
    
    function GetRecommendations(recommendations_id) {
       //returns nothing;
    }
    
   Returns the proper recommendations based on rating by users on anilist, makes searching easier<br />
  <b><i>recommendation_id:</i></b> similar to id, refers to the id of the show we want our recommendations to be on
</details>


<details>
  <summary><b>getSupplement()</b></summary>
    
    function GetRecommendations(recommendations_id) {
       //returns nothing;
    }
    
   Gets a supplement of shows that are added to existing cards if the recommendation of that show was not up to 10.<br />
   This is particularly useful for old shows in the 1980s and older that have close to 0 recommendations
</details>

<br />

### ANILIST GraphQL API
<hr>

In the index . js file a http get request with JS native fetch API is used to pull data from ANILIST.<br />
This is a look into how to get started using AniList's GraphQL API.<br />

| ANILIST | Backlinks |
| ------ | ------ |
| API Use Case & Overview | [ https://anilist.gitbook.io/anilist-apiv2-docs/overview/overview ] |
| GitHub | [ https://github.com/AniList/ApiV2-GraphQL-Docs ] |
| Documentation Explorer | [ https://anilist.github.io/ApiV2-GraphQL-Docs ] |
| Interactive Editor | [ https://anilist.co/graphiql ] |

<br />

### The FrontEnd Ties
<hr>

The Frontend is a simple combination of markup(html), styling(css) and data kicked in from the anilist API. There is a search section at the top section. There is a contact hyperlink and also an about hyperlink. The surprise me button gets random set of shows into the the cards of shows, the page's color theme also tries to match the overall color from the show.
<br />
<br />
Finally, for analytics, the page inject splitbee's analysis javascript source file into the html body.
