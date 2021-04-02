import names from './names.js';

const count = names.length - 1;
const dir = 'img';

addEventListener('fetch', async (event: FetchEvent) => {
    event.respondWith(await handleRequest());
});

async function handleRequest() {
    const random = count * Math.random();
    const number = Math.round(random);
    const name = names[number];
    const path = `${dir}/${name}`;

    const file = new URL(path, import.meta.url);
    return await fetch(file);
}

