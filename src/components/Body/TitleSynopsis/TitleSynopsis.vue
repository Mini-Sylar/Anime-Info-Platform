<template lang="">
    <div class="is-a-container">
        <h1 class="anime-title">{{animeTitle}}</h1>
        <p class="anime-synposis">{{synopsis}}</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            animeTitle: `Maou Gakuin no Futekigousha: Shijou Saikyou no Maou no Shiso, Tensei shite Shison-tachi no Gakkou e Kayou
`,
            synopsis: `Everyone has a part of themselves they cannot show to anyone else.

At a time when all nations of the world were involved in a fierce war of information happening behind closed doors, Ostania and Westalis had been in a state of cold war against one another for decades. The Westalis Intelligence Services' Eastern-Focused Division (WISE) sends their most talented spy, "Twilight," on a top-secret mission to investigate the movements of Donovan Desmond, the chairman of Ostania's National Unity Party, who is threatening peace efforts between the two nations.

This mission is known as "Operation Strix." It consists of "putting together a family in one week in order to infiltrate social gatherings organized by the elite school that Desmond's son attends."

"Twilight" takes on the identity of psychiatrist Loid Forger and starts looking for family members. But Anya, the daughter he adopts, turns out to have the ability to read people's minds, while his wife, Yor, is an assassin! With it being in each of their own interests to keep these facts hidden, they start living together while concealing their true identities from one another.
World peace is now in the hands of this brand-new family as they embark on an adventure full of surprises.`,
        };
    },
}
</script>
<style>
.anime-synposis {
    height: 20vh;
    overflow-y: scroll;
    margin-block: 1.5rem;
    font-size: clamp(.5rem, .8rem, 1.1rem);
}

.anime-title {
    font-family: DexaPro-Bold;
    font-size: clamp(1.5rem, 3vw, 3.5rem);
    line-height: 3rem;
}
</style>