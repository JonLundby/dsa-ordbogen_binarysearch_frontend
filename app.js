"use strict";

import { binarySearch, stringCompareFunction } from "./binarySearch.js";
import { getInterval } from "./rest.js";

window.addEventListener("load", startApp);

function startApp() {
    console.log("ordbogen frontend kører!");
    document.querySelector("#search-form").addEventListener("submit", searchWord);
}

async function searchWord(e) {
    e.preventDefault();

    const form = e.target;
    const word = form.searchWord.value.toLowerCase();

    const interval = await getInterval();
    const min = interval.min;
    const max = interval.max;

    let wordFound = await binarySearch(word, min, max, stringCompareFunction);
    console.log(wordFound)
    
    if (indexFound >= 0) {
        console.log("word found: " + wordFound)
    } else {
        console.log("Could not find word.. ")
    }
}
