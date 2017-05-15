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
app.use(bodyParser.urlencoded({
	extended: false
}))

app.set('views', './views');
app.set('view engine', 'pug');

// Part 0 Create one route:
// route 1: renders a page that displays all your users.

app.get('/', function(req, res){

  fs.readFile('.././resources/users.json', (err, data) => {
  	
  	if (err){
		throw err;
	}
		allUsers = JSON.parse(data);
		console.log("JSON file has been parsed.")
		res.render("allusers",{
  		users: allUsers
  		});
	});
});
	
// Part 1 Create two more routes:
// route 2: renders a page that displays a form which is your search bar.

app.get('/search', function(req, res){
	res.render("search");
})

// route 3: takes in the post request from your form, then displays matching users on a 
//new page. Users should be matched based on whether either their first or last name 
//contains the input string.

app.post('/search', function(req, res){
	
	fs.readFile('.././resources/users.json', 'utf-8', (err, data) => {
  	
  	if (err){
		throw err;
	}

	var allUsers = JSON.parse(data);
	var query = req.body.searchfield;
	console.log("This is your seach request: "+query);

	for (var i = 0; i < allUsers.length; i++) {
		if (allUsers[i].firstname === query || allUsers[i].lastname === query){
			
			console.log("We found a matching user.")

			var firstname = allUsers[i].firstname;
			var lastname = allUsers[i].lastname;
			var email = allUsers[i].email;
			
			res.render("results", {
				user: [firstname, lastname, email]
			})

		} else {
			res.send("No matching user found");
		}	
	}//closing for loop

 	});//closing fs.readFile

});//closing app.post

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

	var allUsers = [];

	fs.readFile('.././resources/users.json', (err, data) => {
  	
  	if (err){
		throw err;
	}
	allUsers = JSON.parse(data);

	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;

	var newUser = {
		firstname: firstname,
		lastname: lastname,
		email: email
	}

	allUsers.push(newUser);

	console.log("This is your new user "+(JSON.stringify(newUser)));

		fs.writeFile('.././resources/users.json', (JSON.stringify(allUsers)) , (err, data) => {

		 if (err){
			throw err;
		}

		console.log('Your new userbase has been written into the JSON file')

		res.redirect('./');

		}); //closing writeFile

	}); //closing readFile
}); //closing app.post

//------------DEFINING PORT 8080 FOR SERVER----------------------
var server = app.listen(8080, () => {
	console.log('http://localhost:' + server.address().port);
});