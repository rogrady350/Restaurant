//Bring in Mongo and Reservations
const { MongoClient, ObjectId } = require('mongodb');

//Define Database URL
const dbUrl = process.env.DB_URI || "mongodb://127.0.0.1";

//Define the database server
const dbClient = new MongoClient(dbUrl);

//CRUD methods
var services = function(app) {
    //server side post to add data (write-data page)
    app.post('/write-record', async function(req, res){
       var reservationData = {
            name: req.body.name, 
            date: req.body.date,
            time: req.body.time,
            guests: req.body.guests,
            requests: req.body.requests,
            phone: req.body.phone,
            email: req.body.email
        }

        try{
            const conn = await dbClient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection("reservations");

            await coll.insertOne(reservationData);
            await conn.close();
           return res.send(JSON.stringify({ msg: "SUCCESS" }));
        } catch (error) {
            await conn.close();
            return res.send(JSON.stringify({ msg: "Error" + error }));
        }
    });

    //server side get for retrieving data (view-data page)
    app.get('/get-records', function(req, res){
        
    });

    //server side for deleting data
    app.delete('/delete-record', function(req, res){
        var reservationId = req.body.id; //1. access id to be deleted from request body
        
    });

    //For refreshing the reservations table
    app.post('/refreshReservations', async function(req, res) {
    // console.log("In refresh spells");
        try {
            const conn = await dbClient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection('reservations');
            await coll.drop();
            console.log("Dropped database");
            await dbClient.close();
            initializeDatabase();
            return res.status(200).send(JSON.stringify({msg:"SUCCESS"}));        
        } catch(err) {
            console.error(err);
            return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
        }
    });
}

module.exports = servicesDb;