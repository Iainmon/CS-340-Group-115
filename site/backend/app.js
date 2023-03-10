/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
const mysql = require('mysql');

PORT        = 2235;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./db-connector');
const { populate, create, update, deletePharmacist } = require('./manipulator');

// Add middleware to parse the POST body of requests and server static files
app.use(express.json());
app.use('/web',express.static('/nfs/stak/users/moncrief/CS-340-Group-115/site/frontend/dist'));

// Default homepage route. Tests database connection and returns results. (THis is just from assignment 1)
app.get('/', function(req, res)
    {
        // Define our queries
        query1 = 'DROP TABLE IF EXISTS diagnostic;';
        query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
        query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
        query4 = 'SELECT * FROM diagnostic;';

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // DROP TABLE...
        db.pool.query(query1, function (err, results, fields){

            // CREATE TABLE...
            db.pool.query(query2, function(err, results, fields){

                // INSERT INTO...
                db.pool.query(query3, function(err, results, fields){

                    // SELECT *...
                    db.pool.query(query4, function(err, results, fields){

                        // Send the results to the browser
                        let base = "<h1>MySQL Results:</h1>"
                        res.send(base + JSON.stringify(results));
                    });
                });
            });
        });
    });



// Route to get all records from a table via specific table name and filters
app.get('/populate/:tableName', async (req, res) => {
    const { tableName } = req.params;

    console.log('[populate]:', { tableName });

    const results = await populate(tableName, db.pool);
    res.send(results);
});


// Route to add a record to a table via specific table name and record.
app.put('/edit/:tableName', async (req, res) => {
    const { tableName } = req.params;
    const { ...record } = req.body;

    console.log('[edit]:', { tableName, record });

    // Identify the primary key
    const pkName = Object.keys(record).find(key => key.endsWith('_id'));
    const pkValue = record[pkName];

    const results = await update(tableName, pkName, pkValue, record, db.pool);

    if (tableName == 'prescriptions') {
        const pharmacistId = record['pharmacist']['pharmacist_id'];
        console.log('pharmacistId:', pharmacistId);
        // const results = await update('pharmacists', 'pharmacist_id', pharmacistId, record, db.pool);
    }
    res.send(results);
});

// Route to create a record to a table via specific table name and record.
app.post('/add/:tableName', async (req, res) => {
    const { tableName } = req.params;
    const { ...record } = req.body;

    console.log('[add]:', { tableName, record });

    const results = await create(tableName, record, db.pool);
    res.send(results);
});

// Route to delete a pharmacist
app.delete('/delete/pharmacists', async (req, res) => {
    const { ...record } = req.body;
    // const pharmacistId = record['pharmacist_id'];
    const results = await deletePharmacist(record, db.pool);

    res.send(results);
});

// Start the server
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
