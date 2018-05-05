let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let app = express();
let PORT = 3000;

//set up app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DATA
//make sql call and store result into array of objs
var characters = [{
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  }, {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  }, {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Knight",
    age: 60,
    forcePoints: 1350
  }];

// ROUTES
app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname, 'index.html'));
});

// API ROUTE
//get whole database
app.get('/api/characters', function(req, res) {
    return res.json(characters);
});

//get one character at a time
app.get('/api/characters/:character', function(req, res) {
    //connect o db and make a sequalize call to db to get yoda
    let chosen = req.params.character;

    for (var i = 0; i < characters.length; i++) {
        if (chosen === characters[i].routeName) {
            return res.json(characters[i]);
        }
    }

    return res.send('no character found');
});

//create new characters
app.post('/api/characters', function(req, res) {
    let newcharacter = req.body;
    //parse the body, but parsebody does that for me 
    console.log(newcharacter);
    characters.push(newcharacter);

    res.json(newcharacter);
});

//LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});