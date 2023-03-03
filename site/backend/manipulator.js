

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

const create = async (tableName, record, pool) => {
    const template = 'INSERT INTO ?? SET ?';
    const params = [tableName, record];
    const query = mysql.format(template, params);
    console.log(query);
    const results = await pool.asyncQuery(query);
    console.log(results);
    return results;
}

const update = async (tableName, pkName, pkValue, record, pool) => {

    const template = 'UPDATE ?? SET ? WHERE ??.?? = ?';
    const params = [tableName, record, tableName, pkName, pkValue];
    const query = mysql.format(template, params);

    console.log('Table:', tableName);
    console.log('Primary Key:', pkName, '=', pkValue);
    console.log('Record:', record);
    console.log(query);


    const results = await pool.asyncQuery(query);
    console.log(results);
    return results;
};

const deletePharmacist = async (record, pool) => {

    const pharmacistId = record['pharmacist_id'];
    
    const template1 = 'update prescription_status set pharmacist_id = null where pharmacist_id = ?';
    const template2 = 'delete from pharmacists where pharmacist_id = ?';
    const params = [pharmacistId];
    const query1 = mysql.format(template1, params);
    const query2 = mysql.format(template2, params);

    console.log(query1);
    console.log(query2);

    const results1 = await pool.asyncQuery(query1);
    console.log(results1);

    const results2 = await pool.asyncQuery(query2);
    console.log(results2);

    return {results1, results2};
};

module.exports.populate = populate;
module.exports.create = create;
module.exports.update = update;
module.exports.deletePharmacist = deletePharmacist;