

const mysql = require('mysql');

const populateCustomers = async (pool) => {
    const results = await pool.asyncQuery('SELECT * FROM ');
}

const populate = async (tableName, pool) => {
    // switch (tableName) {
    //     case 'customers':
    //         return await populateCustomers(pool);
        
    // }
    const template = 'SELECT * FROM ??';
    const params = [tableName];

    const query = mysql.format(template, params);

    const results = await pool.asyncQuery(query);
    // console.log(results);
    const rows = results.results.map(row => ({...row}));
    // console.log(rows);
    console.log('Fetched table:', tableName);
    return rows;

}

module.exports.populate = populate;