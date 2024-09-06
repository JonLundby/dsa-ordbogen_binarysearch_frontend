import { getMiddleWord } from "./rest.js";

async function binarySearch(search, arrMin, arrMax, compFunc) {
    let min = arrMin;
    let max = arrMax; // skal være -1 fordi ellers mødes min og max aldrig (min & max bliver fx 10 & 11 og det resultere i et endless loop)
    let middle;
    let count = 0;

    while (min <= max) {
        count++;
        middle = Math.floor((max + min) / 2);

        let middleWord = await getMiddleWord(middle);

        let c = compFunc(search, middleWord.inflected.toLowerCase());
        console.log(`minValue: ${min} 
                    maxVal: ${max} 
                    middle(${middle}): ${middleWord.inflected}  equal with ${search}?
                    compare: ${c}
                    serverrequests: ${count}`);

        if (c === 0) {
            // Hvis search value er lig med middle så returneres middle hvor middle er det index hvor search value er fundet
            return { result: middleWord, count };
        }
        if (c > 0) {
            // hvis search value er højere end middle så skal middle være ny minimum value
            min = middle + 1;
        }
        if (c < 0) {
            // hvis search value er lavere end middle så skal middle være ny maximum value
            max = middle - 1;
        }
    }
    return { result: -1, count }; // returner negativ tal når search value ikke findes i arrayet
}

function compare(a, b) {
    return a - b;
}

function stringCompareFunction(a, b) {
    console.log("compared: " + a + " and " + b);
    return a.localeCompare(b, "da-DK");
}

function nameCompareFunction(a, b) {
    console.log("compared: " + a + " and " + b.name);
    return a.localeCompare(b.name); // a er en string og b er index
}

export { binarySearch, compare, stringCompareFunction, nameCompareFunction };
