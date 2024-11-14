const { response } = require('express');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname + "/files/data.txt");

var services = function(app) {
    //server side post to add data (write-data page)
    app.post('/write-record', function(req, res){
        var id = "rest" + Date.now();

        var reservationData = {
            id: id,
            name: req.body.name, 
            date: req.body.date,
            time: req.body.time,
            guests: req.body.guests,
            requests: req.body.requests,
            phone: req.body.phone,
            email: req.body.email
        }

        var restaurantData = [];

        if(fs.existsSync(DB_FILE)) {
            //Read in current database
            fs.readFile(DB_FILE, "utf-8", function(err, data) {
                if(err) {
                    response.send(JSON.stringify({msg: err}));
                } else {
                    var restaurantData = JSON.parse(data);

                    restaurantData.push(reservationData);

                    fs.writeFile(DB_FILE, JSON.stringify(restaurantData), function(err){
                        if(err) {
                            res.send(JSON.stringify({msg: err}));
                        } else {
                            res.send(JSON.stringify({msg: "SUCCESS"}));
                        }
                    });
                }
            });
        }else {
            restaurantData.push(reservationData);
            console.log(restaurantData);

            fs.writeFile(DB_FILE, JSON.stringify(restaurantData), function(err){
                if(err) {
                    res.send(JSON.stringify({msg: err}));
                } else {
                    res.send(JSON.stringify({msg: "SUCCESS"}));
                }
            });
        }
    });

    //server side get for retrieving data (view-data page)
    app.get('/get-records', function(req, res){
        //1: if statement to check if file exists
        if(fs.existsSync(DB_FILE)) {
            //2.A: Read in current database
            fs.readFile(DB_FILE, "utf-8", function(err, data) {
                //2.B: send back err msg if there is an error
                if(err) {
                    response.send(JSON.stringify({msg: err}));
                } else {
                    //2.C: parse data variable
                    var restaurantData = JSON.parse(data);

                    //send message and data back to client
                    res.send(JSON.stringify({
                        msg: "SUCCESS", 
                        data: restaurantData //array of JSON objects
                    }));
                }
            });
        //if file doesn't exist
        }else {
            //3.A: declare empty array
            var restaurantData = []

            //3.B send back empty array with message
            res.send(JSON.stringify({
                msg: "SUCCESS", 
                data: restaurantData
            }));
        }
    });
};

//server side for deleting data
app.delete('/delete-record', function(req, res){
    reservationId = req.body.id //1. access id to be deleted from request body

    //if statement to check if file exists
    if(fs.existsSync(DB_FILE)) {
        //2. Read in current data from data.txt file
        fs.readFile(DB_FILE, "utf-8", function(err, data) {
            //send back err msg if there is an error
            if(err) {
                response.send(JSON.stringify({msg: err}));
            } else {
                //3. parse data int JSON object
                var restaurantData = JSON.parse(data);

                //send message and data back to client
                res.send(JSON.stringify({
                    msg: "SUCCESS", 
                    data: restaurantData //array of JSON objects
                }));
            }
        });
    //if file doesn't exist
    }else {
        //declare empty array
        restaurantData = []

        //send back empty array with message
        res.send(JSON.stringify({
            msg: "SUCCESS", 
            data: restaurantData
        }));
    }

    //4. Loop through the data array to find index of id to be deleted


    //5. Remove index from array


    //6. Write altered array to file

});

module.exports = services;