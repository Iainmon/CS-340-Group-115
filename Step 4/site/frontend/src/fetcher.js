import { tables,format } from './data.js';

const port = 2235;
export const backendURL = 'http://flip1.engr.oregonstate.edu:' + port;

export async function primeTables() {
    console.log('Fetching tables...');
    const promises = Object.keys(tables).map(async tableName => {
        try {
            const response = await fetch(backendURL + '/populate/' + tableName);
            const json = await response.json();
            console.log('Fetched table:', tableName);
            console.log(json);
            tables[tableName] = json;
            return json;
        } catch (e) {
            console.error('Error fetching table:', tableName);
            console.error(e);
        }
    });
    const results = await Promise.all(promises);
    console.log(results);


    console.log('Formatting tables...');
    format();
    console.log('Done formatting tables.');


    return results;
}
