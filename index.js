//dependencias
require('dotenv').config();
var express = require('express');
var mysql = require('mysql');

//conexao com o banco de dados
var connection = mysql.createConnection({
    host:   process.env.DB_HOST,
    user:   process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
connection.connect(function(error) {
    if(!!error){
        console.log('Error');
    } else {
        console.log('Connected');
    }
})

//APP 
const app = express();
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    connection.query("show tables", function(error, rows, fields){
        if(!!error){
            console.log('Error in the query');
            res.render('index', {text: 'Erro'} );
        } else {
            console.log('Successful query\n[Rows]');
            console.log(rows);
            res.render('index', {text: rows} );
        }
    });
})
app.get('/product', function(req, res){
    connection.query("SELECT * FROM product", function(error, rows, fields){
        if(!error) {
            console.log('Successful query\n[Rows]');
            console.log(rows);
            res.render('product', {text: rows} );
        }
    });
})
app.get('/orders', function(req, res){
    connection.query("SELECT * FROM orders", function(error, rows, fields){
        if(!error) {
            console.log('Successful query\n[Rows]');
            console.log(rows);
            res.render('orders', {text: rows} );
        }
    });
})

app.listen(1337);

//Rodar 'node index.js' no terminal e entrar em http://localhost:1337