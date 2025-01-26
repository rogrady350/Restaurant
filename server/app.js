//server - equivalent to Program.cs
const express = require('express');  //pull in express library
const path = require('path');  //path library
const bodyParser = require('body-parser');

const app = express(); //core function places express library in app

const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next(); 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); //takes json object
app.use("/client", express.static(path.resolve(__dirname + "/../client/"))); //may not need last slash?
//app.use in express is equivalent to CreateBuilder()

//Page listeners (router)
var router = require('./router.js'); //bring in router code
router(app);

//Service listeners (data processes)
var services = require('./servicesDb.js');
services(app);


var port = 5000; //port where it is running

//Listener (web server launches and waits to be called)
//app.listen(port, () => {...} is equivalent to Build() and Run()
var server = app.listen(port, function(err){
    if(err) throw err;

    console.log("Listning on port: " + port);
});