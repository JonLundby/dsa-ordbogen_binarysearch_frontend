"use strict";

import { binarySearch, stringCompareFunction } from "./binarySearch.js";
import { getInterval } from "./rest.js";

window.addEventListener("load", startApp);

function startApp() {
    document.querySelector("#search-form").addEventListener("submit", searchWord);
    document.querySelector("#search-results").classList.add("hidden");
    document.querySelector("#search-results-none").classList.add("hidden");
}

async function searchWord(e) {
    e.preventDefault();

    const form = e.target;
    const word = normalizeWord(form.searchWord.value);

    const interval = await getInterval();
    const min = interval.min;
    const max = interval.max;

    let startTime = performance.now();

    let searchResult = await binarySearch(word, min, max, stringCompareFunction);

    let endTime = performance.now();
    let searchTime = ((endTime - startTime) / 1000).toFixed(3);

    if (searchResult.result === -1 || searchResult.result === undefined) {
        console.log("Could not find word.. ");
        document.querySelector("#search-results").classList.add("hidden");
        document.querySelector("#search-results-none").classList.remove("hidden");
        document.querySelector("#total-time").textContent = searchTime;
    } else {
        document.querySelector("#search-results-none").classList.add("hidden");
        document.querySelector("#search-results").classList.remove("hidden");
        document.querySelector("#total-time").textContent = searchTime;
        document.querySelector("#result-inflected").textContent = searchResult.result.inflected;
        document.querySelector("#result-headword").textContent = searchResult.result.headword;
        document.querySelector("#result-partofspeech").textContent = searchResult.result.partofspeech;
        document.querySelector("#result-homograf").textContent = searchResult.result.homograf;
        document.querySelector("#result-id").textContent = searchResult.result.id;
        console.log("word found:");
        console.log(searchResult);
    }
}

function normalizeWord(word) {
    let wordNormalized = word
        .toLowerCase()
        .replace(/[\u2080-\u2089]/g, (m) => String.fromCharCode(m.charCodeAt(0) - 8272));
    // "/[\u2080-\u2089]/g" - det interval af unicode chars der skal skiftes ud. Regular expression - en måde at definere et string mønster
    // "m" - den matchede værdi sendes som parameter.
    // "m.charCodeAt(0)" - finder den unicode værdi/unicode code point som index 0 af m har. fx hvis m er ₂ så returneres unicode 8322
    // "- 8272" - 8272 trækkes fra fordi det er afstanden fra unicode code point(2) til (₂)
    // "String.fromCharCode(...)" - det fundne unicode code point konverteres til tilsvarende string character

    return wordNormalized;
}

export { normalizeWord };
