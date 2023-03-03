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

app.use(express.json());            // This is needed to parse JSON bodies
// app.use(express.urlencoded());      // This is needed to parse URL-encoded bodies
app.use('/web',express.static('/nfs/stak/users/moncrief/CS-340-Group-115/site/frontend/dist'));  // This is needed to serve static files

// hell0 
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     next();
// });

/*
    ROUTES
*/
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


app.get('/populate/:tableName', async (req, res) => {
    const { tableName } = req.params;
    const results = await populate(tableName, db.pool);
    res.send(results);
});


app.put('/edit/:tableName', async (req, res) => {
    const { tableName } = req.params;
    const { ...record } = req.body;

    const pkName = Object.keys(record).find(key => key.endsWith('_id'));
    const pkValue = record[pkName];

    const results = await update(tableName, pkName, pkValue, record, db.pool);
    res.send(results);


    // const template = 'UPDATE ?? SET ? WHERE ??.?? = ?';
    // const params = [tableName, record, tableName, pkName, pkValue];
    // const query = mysql.format(template, params);



    // console.log('Table:', tableName);
    // console.log('Primary Key:', pkName, '=', pkValue);
    // console.log('Record:', record);
    // console.log(query);
    // const results = await db.pool.asyncQuery(query);
    // console.log(results);
    // res.send('Okay');
});

app.post('/add/:tableName', async (req, res) => {
    // const { tableName } = req.params;
    // const { ...record } = req.body;
    // const template = 'INSERT INTO ?? SET ?';
    // const params = [tableName, record];
    // const query = mysql.format(template, params);
    // console.log(query);
    // const results = await db.pool.asyncQuery(query);
    // console.log(results);
    // res.send(results);
    const { tableName } = req.params;
    const { ...record } = req.body;

    const results = await create(tableName, record, db.pool);
    res.send(results);
});

app.delete('/delete/pharmacists', async (req, res) => {
    const { ...record } = req.body;
    // const pharmacistId = record['pharmacist_id'];
    const results = await deletePharmacist(record, db.pool);

    res.send(results);

    // const template1 = 'update prescription_status set pharmacist_id = null where pharmacist_id = ?';
    // const template2 = 'delete from pharmacists where pharmacist_id = ?';
    // const params = [pharmacistId];
    // const query1 = mysql.format(template1, params);
    // const query2 = mysql.format(template2, params);

    // console.log(query1);
    // console.log(query2);

    // const results1 = await db.pool.asyncQuery(query1);
    // console.log(results1);
    // const results2 = await db.pool.asyncQuery(query2);
    // console.log(results2);
 
});

    app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
        console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
    });
