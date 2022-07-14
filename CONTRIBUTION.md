# Contribution
Thanks for finding interest in the [Anime Information Platform](https://anime-info-platform.vercel.app/).
You can contribute to this project in any shape or form! or tackle any of the [issues](https://github.com/Mini-Sylar/Anime-Info-Platform/issues) opened and submit a pull request

<hr>

## Getting started

<hr><hr>

### folder Structure

```
📦Anime info Platform
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

   <hr>

## [Index.html](index.html)

The first page you see when you load the site 

<hr>

## [index.js](https://github.com/Mini-Sylar/Anime-Info-Platform/blob/master/javascript/index.js)

### **functions**
<details>
  <summary><b>ShadeColor()</b></summary>
         <ul>Returns a darker varient of the accent color on certain elements </ul>
</details>

<details>
  <summary><b>Replace(data)</b></summary>
    <ul> Contains all the main elements that will modified </ul>
  <ul>Takes data parameter; this is the JSON object returned by the API, from this data the elements are modified </ul>
</details>

<details>
  <summary><b>callBody(id)</b></summary>
  <ul> Contains the request that provides data for main body. Calls Replace(data) at the end to modify the elements </ul>
   <ul> <b><i>id:</i></b> this represents the id of the anime we are looking for by default it is '140960' for Spy X Family </ul>
</details>

<details>
  <summary><b>callCard(genre)</b></summary>
   <ul> This function contains the request that provides data for the suggestion cards</ul>
   <ul> <b><i>genre:</i></b> default genre to be passed, initially it is "Action"</ul>
   <ul> after modifying the cards, which ever card is clicked call callBody(id) to replace page body contents</ul>
</details>

<details>
  <summary><b>SearchAnime(query)</b></summary>
 <ul> Returns data that contains ID and title of anime you searched for so it can pass the ID to callBody(id) to change body content </ul>
</details>

<details>
  <summary><b>randomIntFromInterval()</b></summary>
<ul> Choose random index from a given lenght</ul>
</details>

<details>
  <summary><b> GetRecommendations(recommendations_id)</b></summary>
 <ul> Returns the proper recommendations based on rating by users on anilist, makes searching easier </ul>
 <ul><b><i>recommendation_id:</i></b> similar to id, refers to the id of the show we want our recommendations to be on</ul>
</details>

<details>
  <summary><b> getSupplement()</b></summary>
 <ul> Gets a supplement of shows that are added to existing cards if the recommendation of that show was not up to 10 </ul>
   <ul> this is particularly useful for old shows in the 1980s and older that have close to 0 recommendations </ul>
</details>

<hr>

## [Images](images)

Contains all the default images used such as the preloader image

<hr>

## [Font](fonts)

Contains all the font used

