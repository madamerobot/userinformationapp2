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

//------------ROUTES------------------
// Part 0 Create one route:
// route 1: renders a page that displays all your users.

app.get('/', function(req, res){

  fs.readFile('.././resources/users.json', (err, data) => {
  	
  	if (err){
		throw err;
	}
		var allUsers = JSON.parse(data);
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

// Route 3a: takes in the post request from your form, then displays matching users on a 
//new page. Users should be matched based on whether either their first or last name 
//contains the input string.

app.post('/search', function(req,res) {

fs.readFile('.././resources/users.json', 'utf-8', (err, data) => {
  	
	  	if (err){
			throw err;
		}

		var allUsers = JSON.parse(data);
		var matchedUsers = [];
		var query = req.body.searchfield;
		
		console.log("This is your search request: "+query);

		for (var i = 0; i < allUsers.length; i++) {
		if (allUsers[i].firstname === query || allUsers[i].lastname === query){
			
			matchedUsers.push({firstname: allUsers[i].firstname,
								lastname: allUsers[i].lastname,
								email: allUsers[i].email});
		} 
	}//closing for loop

	var userResults = JSON.stringify(matchedUsers);
	console.log("Search result array created"+" "+userResults);

	if(matchedUsers){
		res.render("results", {
			info: matchedUsers
		});
	} else {
		res.send("No matching user found");
	}	
 	});//closing fs.readFile

});//closing app.post

//Route 3b: Autocomplete search results

app.post('/autocomplete', function(req, res){
	
	fs.readFile('.././resources/users.json', 'utf-8', (err, data) => {
  	
	  	if (err){
			throw err;
		}

		var allUsers = JSON.parse(data);
		var matchedUsers = [];

		//Incoming data from JSON request
		//req.body looks like {"input":"Daisy"}

		var query = req.body.input;
		console.log("This is your search request: "+query);

		// var test = 'Valerie Fuchs'.indexOf('Fu');
		// //Result: 8

		for (var i = 0; i < allUsers.length; i++) {
			//Check if input, e.g. "Va" === any two first letters of
			//any object.firstname || object.lastname
			var name = JSON.stringify(allUsers[i].firstname+" "+allUsers[i].lastname);
			console.log('I am searching this string: '+name);

					//"Valerie".indexOf("Va")
			var index = name.indexOf(query);
			console.log('I am finding '+query+' at index: '+index);
				
			if (index !== -1){
				matchedUsers.push({
				firstname: allUsers[i].firstname,
				lastname: allUsers[i].lastname,
				email: allUsers[i].email
				});
			}
		}//closing for loop

		if(matchedUsers){
			res.send(matchedUsers);
		}
	
 	});//closing fs.readFile
});//closing app.post

// Part 2 Create two more routes:
// route 4: renders a page with three forms on it (first name, last name, and email) that 
//allows you to add new users to the users.json file.

app.get('/addUser', function(req, res){
	res.render("addusers");
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

	var data = JSON.stringify(allUsers, null, 2);

		fs.writeFile('.././resources/users.json', data , (err, data) => {

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