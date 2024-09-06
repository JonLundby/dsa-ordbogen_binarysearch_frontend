const endpoint = `http://localhost:8080/ordbogen`;

async function getInterval() {
    const response = await fetch(endpoint);
    const interval = response.json();

    return interval;
}

async function getMiddleWord(middleIndex) {
    const response = await fetch(`${endpoint}/${middleIndex}`);
    const data = await response.json();

    return data;
}

export { getInterval, getMiddleWord };
