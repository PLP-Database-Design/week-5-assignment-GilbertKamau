// declare dependancies

const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

// create connection to database
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});


// check if connection is successful
db.connect((err) => {
    if(err) return console.log(" failed to connect to database");

    // if connection is successful
    console.log("connected to database as id: ", db.threadId)

    // code goes here
    // get method example
    app.set('view engine', 'ejs');
    app.set('views', './views');


    app.get('/data', (req, res) => {
        //retrieve data from database
        db.query('SELECT * FROM patients', (err, results) => {
            if(err) {
            console.log(err);
            res.statusMessage(500).send("Data retrieved successfully");
        }else {
                res.render('data', {results: results});
            }
        });
    });

    app.listen(process.env.PORT, () => {
        console.log(`server is running on port ${process.env.PORT}`);


        // send messahe to frontend
        console.log("Hello from backend");
        app.get('/', (req, res) => {
            res.send("Hello from backend, server started succesfully");
        });

    });
});