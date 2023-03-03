import { tables } from './data.js';

const port = 2235;
const backendURL = 'http://flip1.engr.oregonstate.edu:' + port;

export async function primeTables() {
    console.log('Fetching tables...');
    const promises = Object.keys(tables).map(async tableName => {
        const response = await fetch(backendURL + '/populate/' + tableName);
        const json = await response.json();
        console.log('Fetched table:', tableName);
        console.log(json);
        tables[tableName] = json;
        return json;
    });
    const results = await Promise.all(promises);
    console.log(results);

    return results;
}
