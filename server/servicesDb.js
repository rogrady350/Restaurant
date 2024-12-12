//Bring in Mongo
const { MongoClient, ObjectId } = require('mongodb');

//Define Database URL
const dbUrl = process.env.DB_URI || "mongodb://127.0.0.1";

//Define the database server
const dbClient = new MongoClient(dbUrl);

//CRUD methods
var servicesDb = function(app) {
    //POST - server to add data (write-data page)
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

    //GET - server side get for retrieving data (view-data page)
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

    //GET (by date) - server side view reservation by date
    app.get("/get-reservationByDate", async function(req, res) {
        var search = (req.query.date === "") ? {} : { type: req.query.date };

        try {
            const conn = await dbClient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection("reservations");

            const data = await coll.find(search).toArray();

            await conn.close();

            return res.send(JSON.stringify({ msg: "SUCCESS", reservations: data }));
        } catch (error) {
            return res.send(JSON.stringify({ msg: "Error" + error }));
        } finally {
            if (conn) {
                await conn.close();
            }
        }  
    });

    //PUT - server side update reservation
    app.put('/update-record', async function(req, res) {
        var updateData = {
            $set: {
                name: req.body.name,
                date: req.body.date,
                time: req.body.time,
            }
        };

        try {
            const conn = await dbClient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection("reservations");

            const search = {_id: ObjectId.createFromHexString(req.body.id)};

            await coll.updateOne(search, updateData);

            return res.send(JSON.stringify({ msg: "SUCCESS" }));
        } catch(err) {
            console.log(err)
            return res.send(JSON.stringify({ msg: "Error" + error }));
        } finally {
            if (conn) {
                await conn.close();
            }
        }
    });

    //DELETE - server side for deleting data (delete works, table is not reloaded. redraw does not work)
    app.delete('/delete-record', async function(req, res){
        var conn;

        try{
            conn = await dbClient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection("reservations");

            const search = {_id: ObjectId.createFromHexString(req.query.reservationId)};

            await coll.deleteOne(search);

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