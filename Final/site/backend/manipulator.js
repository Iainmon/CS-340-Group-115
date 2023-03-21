const mysql = require('mysql');

// Later we will dispatch to specific functions for each table
const populateCustomers = async (pool) => {
    const results = await pool.asyncQuery('SELECT * FROM ');
}

const populate = async (tableName, pool) => {
    // Later we will dispatch to specific functions for each table

    // switch (tableName) {
    //     case 'customers':
    //         return await populateCustomers(pool); 
    // ...
    // }

    // Compile the query
    const template = 'SELECT * FROM ??';
    const params = [tableName];
    const query = mysql.format(template, params);

    // Execute the query
    const results = await pool.asyncQuery(query);

    // Process the results
    const rows = results.results.map(row => ({...row}));

    console.log('Fetched table:', tableName);
    return rows;

}

// Create a record in a table
const create = async (tableName, record, pool) => {

    // Compile the query
    const template = 'INSERT INTO ?? SET ?';
    const params = [tableName, record];
    const query = mysql.format(template, params);
    console.log('[database][create]: Table: ', tableName);
    console.log('[database][create]:', query);

    // Execute the query
    const results = await pool.asyncQuery(query);
    console.log(results);

    return results;
}

// Update a record in a table
const update = async (tableName, pkName, pkValue, record, pool) => {

    // Compile the query
    const template = 'UPDATE ?? SET ? WHERE ??.?? = ?';
    const params = [tableName, record, tableName, pkName, pkValue];
    const query = mysql.format(template, params);

    // Display information about the update (debug)
    console.log('[database][update]: Table:', tableName);
    console.log('[database][update]: Primary Key:', pkName, '=', pkValue);
    console.log('[database][update]: Record:', record);
    console.log('[database][update]:', query);

    // Execute the query
    const results = await pool.asyncQuery(query);
    console.log(results);

    return results;
};

// Delete a pharmacist
const deletePharmacist = async (record, pool) => {

    // Identify the primary key
    const pharmacistId = record['pharmacist_id'];
    
    // Compile the queries
    const template1 = 'update prescription_status set pharmacist_id = null where pharmacist_id = ?';
    const template2 = 'delete from pharmacists where pharmacist_id = ?';
    const params = [pharmacistId];
    const query1 = mysql.format(template1, params);
    const query2 = mysql.format(template2, params);

    // Display information about the queries (debug)
    console.log(query1);
    console.log(query2);

    // Execute the first query
    const results1 = await pool.asyncQuery(query1);
    console.log(results1);

    // Execute the second query
    const results2 = await pool.asyncQuery(query2);
    console.log(results2);

    return {results1, results2};
};

// Export the functions
module.exports.populate = populate;
module.exports.create = create;
module.exports.update = update;
module.exports.deletePharmacist = deletePharmacist;