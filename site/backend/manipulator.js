

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
    console.log(results);
    return results;

}

module.exports.populate = populate;