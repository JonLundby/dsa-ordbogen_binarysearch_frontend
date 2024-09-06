"use strict";

import { binarySearch, stringCompareFunction } from "./binarySearch.js";
import { getInterval } from "./rest.js";

window.addEventListener("load", startApp);

function startApp() {
    console.log("ordbogen frontend kører!");
    document.querySelector("#search-form").addEventListener("submit", searchWord);
    document.querySelector("#search-results").classList.add("hidden")
}

async function searchWord(e) {
    e.preventDefault();
    
    const form = e.target;
    const word = form.searchWord.value.toLowerCase();
    
    const interval = await getInterval();
    const min = interval.min;
    const max = interval.max;
    
    let searchResult = await binarySearch(word, min, max, stringCompareFunction);
    // console.log(searchResult);
    
    if (searchResult.result === -1 || searchResult.result === undefined) {
        console.log("Could not find word.. ")
    } else {
        document.querySelector("#search-results").classList.remove("hidden")
        document.querySelector("#result-inflected").textContent = searchResult.result.inflected;
        document.querySelector("#result-headword").textContent = searchResult.result.headword;
        document.querySelector("#result-partofspeech").textContent = searchResult.result.partofspeech;
        document.querySelector("#result-homograf").textContent = searchResult.result.homograf;
        document.querySelector("#result-id").textContent = searchResult.result.id;
        console.log("word found:");
        console.log(searchResult);
    }
}
