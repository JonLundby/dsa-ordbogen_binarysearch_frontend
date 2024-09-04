"use strict";

window.addEventListener("load", startApp);

const endpoint = `http://localhost:8080/ordbogen`;

function startApp() {
    console.log("ordbogen frontend kører!");
    document.querySelector("#search-form").addEventListener("submit", searchWord);
}

async function searchWord(e) {
    e.preventDefault();

    const form = e.target;
    const word = form.searchWord.value.toLowerCase();
    console.log(word);

}

