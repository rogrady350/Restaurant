const { response } = require('express');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname + "/files/data.txt");

var services = function(app) {
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
                    restaurantData = JSON.parse(data);

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
};

module.exports = services;