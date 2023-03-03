/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 2235;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./db-connector');
const { populate } = require('./manipulator');

// app.use(express.json());            // This is needed to parse JSON bodies
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


    app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
        console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
    });
