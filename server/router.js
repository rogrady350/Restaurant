const path = require('path');

//Page listeners(router)
var router = function(app) {
    //landing page
    app.get('/', function(req, res){                       
        res.status(200).sendFile(path.join(__dirname + "/../client/restaurant.html"))  //OK status
    });

    app.get('/home', function(req, res){                       
        res.status(200).sendFile(path.join(__dirname + "/../client/restaurant.html"))
    });

    app.get('/write-data', function(req, res){                       
        res.status(200).sendFile(path.join(__dirname + "/../client/write-data.html"))
    });

    app.get('/view-data', function(req, res){                       
        res.status(200).sendFile(path.join(__dirname + "/../client/view-data.html"))
    });
}

module.exports = router;