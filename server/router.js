//

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

    //currently set to use angular versions of html and js files
    app.get('/write-data', function(req, res){                       
        res.status(200).sendFile(path.join(__dirname + "/../client/write-dataAng.html"))
    });

    app.get('/view-data', function(req, res){                       
        res.status(200).sendFile(path.join(__dirname + "/../client/view-data.html"))
    });

    app.get('/browse-data', function(req, res){                       
        res.status(200).sendFile(path.join(__dirname + "/../client/browse-data.html"))
    });
}

module.exports = router;