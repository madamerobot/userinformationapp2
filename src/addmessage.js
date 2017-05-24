//---------CONFIG AND LIBRARIES-----------------

//Requiring express library
const express = require('express')
//Initialising express library
const app = express()

//Requiring file system library
const fs = require('fs');

//Requiring body parser library
//This adds a body property to the request parameter of every app.get and app.post
const bodyParser = require('body-parser');
//Initialising body-parser library
app.use('/', bodyParser())
app.use(bodyParser.urlencoded({
	extended: false
}))

app.set('views', './views');
app.set('view engine', 'pug');

//Requiring postgres library
const pg = require('pg')

//----------GLOBAL VARIABLES---------------------

var titletext = "";
var bodytext = "";

//---------DISPLAY ADD MESSAGE PAGE AND ALL MESSAGES PAGE--------------

//Rendering message page and 'see all messages'

app.get('/addmessage', function(req, res){
	res.render("addmsg");
})

app.post('/addmessage', function(req, res){
	titletext = req.body.title;
	bodytext = req.body.body;
})

app.get('/allmessages', function(req, res){
	res.render("allmsg");
})

//----------POSTGRES--------------------------------------
var connectionString = "postgres://process.env.jan:mypassword@localhost/bulletinboard";
var messagecontent = "";

pg.connect(connectionString, function (err, client, done){
    client.query('insert into messages (title, body) values (titletext, bodytext);', function (err, result){
    console.log("Message was written in database");
    done();
    });

    client.query('select * from messages;', function (err, result) {
    messagecontent = result.rows;
    done();
    });
    pg.end();
});

