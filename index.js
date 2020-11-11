var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());


// Database

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "projetlouvet",
    port: '8889'
})
con.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connection done');
    }
})

app.get('/rank', function (req, res, next) {
    var sql = 'SELECT * FROM ?? ORDER BY idRank DESC';
    var inserts = ['rank'];
    sql = mysql.format(sql, inserts);
    con.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.status(200).json({
                result
            });
        } else {
            res.status(200).json({
            });
        }
    });
});
