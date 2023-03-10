// Get an instance of mysql we can use in the app
const mysql = require('mysql');

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_moncrief',
    password        : '4713',
    database        : 'cs340_moncrief'
});

pool.asyncQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (err, results, fields) => {
            if (err) { return reject(err); }
            resolve({results, fields});
        });
    });
};


// Export it for use in our application
module.exports.pool = pool;
