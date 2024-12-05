//Bring in Mongo
const { MongoClient, ObjectId } = require('mongodb');

//Define Database URL
const dbUrl = process.env.DB_URI || "mongodb://127.0.0.1";

//Define the database server
const dbClient = new MongoClient(dbUrl);

//CRUD methods
var servicesDb = function(app) {
    //server side post to add data (write-data page)
    var conn;
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
            conn = await dbClient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection("reservations");

            await coll.insertOne(reservationData);

            return res.send(JSON.stringify({ msg: "SUCCESS" }));
        } catch (error) {
            return res.send(JSON.stringify({ msg: "Error" + error }));
        } finally {
            if (conn) {
                await conn.close();
            }
        }

    });

    //server side get for retrieving data (view-data page)
    app.get('/get-records', async function(req, res){
        var conn;
        try{
            conn = await dbClient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection("reservations");

            const data = await coll.find().toArray();

            return res.send(JSON.stringify({ msg: "SUCCESS", reservations: data }));
        } catch (error) {
            return res.send(JSON.stringify({ msg: "Error" + error }));
        } finally {
            if (conn) {
                await conn.close();
            }
        }
    });

    //server side for deleting data
    app.delete('/delete-record', async function(req, res){
        var conn;
        var reservationId = req.query._id ;

        try{
            conn = await dbClient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection("reservations");

            await coll.deleteOne({ _id: reservationId });

            return res.send(JSON.stringify({ msg: "SUCCESS" }));
        } catch (error) {
            return res.send(JSON.stringify({ msg: "Error" + error }));
        } finally {
            if (conn) {
                await conn.close();
            }
        }
    });
}

module.exports = servicesDb;