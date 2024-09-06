import { getMiddleWord } from "./rest.js";

async function binarySearch(search, arrMin, arrMax, compFunc) {
    let min = arrMin;
    let max = arrMax;
    let middle;
    let count = 0;

    while (min <= max) {
        document.querySelector("#serverrequests").textContent = count;
        count++;
        middle = Math.floor((max + min) / 2);

        let middleWord = await getMiddleWord(middle);

        let c = compFunc(search, middleWord.inflected.toLowerCase());
        console.log(
            `-minValue: ${min}\n-maxVal: ${max}\n-middle(${middle}): ${middleWord.inflected}  equal with ${search}?\n-compare: ${c}\n-serverrequests: ${count}`
        );

        if (c === 0) {
            return { result: middleWord, count };
        }
        if (c > 0) {
            min = middle + 1;
        }
        if (c < 0) {
            max = middle - 1;
        }
    }
    return { result: -1, count };
}

// NOT USED IN THIS EXERCISE
// function compare(a, b) {
//     return a - b;
// }

function stringCompareFunction(a, b) {
    console.log("comparing: " + a + " and " + b);
    return a.localeCompare(b, "da-DK");
}

// NOT USED IN THIS EXERCISE
// function nameCompareFunction(a, b) {
//     return a.localeCompare(b.name);
// }

export { binarySearch, stringCompareFunction };
