// User Information App - Web Server

// Create a Node.js application that is the beginning of a user management system. 
//Your users are all saved in a "users.json" file, and you can currently do the following:

// search for users
// add new new users to your users file.


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

app.set('views', './views');
app.set('view engine', 'pug');

// Part 0 Create one route:

// route 1: renders a page that displays all your users.

app.get('/', function(req, res){

  fs.readFile('.././resources/users.json', 'utf-8' (err, data) => {
  	
  	if (err){
		throw err;
	}
		var allUsers = JSON.parse(data);
	});

	res.render("allusers");

});
	
// Part 1 Create two more routes:
// route 2: renders a page that displays a form which is your search bar.

app.get('/search', function(req, res){
	res.render("search");
})

// route 3: takes in the post request from your form, then displays matching users on a 
//new page. Users should be matched based on whether either their first or last name 
//contains the input string.

app.post('/results', function(req, res){
	
	fs.readFile('.././resources/users.json', 'utf-8' (err, data) => {
  	
  	if (err){
		throw err;
	}
		var allUsers = JSON.parse(data);
	});

	var query = request.body.searchfield;

	for (var i = 0; i < query.length; i++) {
		if (query[i] === allUsers.firstname || query[i] === allUsers.lastname){
			res.render("results");
		}
	}

});

// Part 2 Create two more routes:
// route 4: renders a page with three forms on it (first name, last name, and email) that 
//allows you to add new users to the users.json file.

app.get('/addUser', function(req, res){
	res.render("addUser");
});

// route 5: takes in the post request from the 'create user' form, then adds the user to 
//the users.json file. Once that is complete, redirects to the route that displays all 
//your users (from part 0).

app.post('/addUser', function(req, res){

	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;

	var newUser = {
		firstname: firstname,
		lastname: lastname,
		email: email
	}

	fs.readFile('.././resources/users.json', 'utf-8' (err, data) => {
  	
  	if (err){
		throw err;
	}
	var allUsers = JSON.parse(data);
	allUsers.push(newUser);
	});

	fs.writeFile('.././resources/users.json', (JSON.stringify(allUsers)) (err, data) => {

		if (err) throw err;

		console.log('Your new userbase has been written into the JSON file')
	})

	res.send("All done");

})




