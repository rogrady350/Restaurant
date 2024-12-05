console.log("Migration script started");

//Bring in Mongo and fs to read text file
const fs = require('fs');
const { MongoClient } = require('mongodb');

//Define Database URL
const dbUrl = process.env.DB_URI || "mongodb://127.0.0.1";

//Define the database server
const dbClient = new MongoClient(dbUrl);

//function to initialize reservations table
async function migrateReservations(filePath) {
    var conn;
    try {
        //read and parse file
        var fileData = fs.readFileSync(filePath, 'utf-8');
        var restaurantData = JSON.parse(fileData);

        //connect to mongo
        conn = await dbClient.connect();

        //get db and collection
        const db = conn.db('restaurant');
        const coll = db.collection('reservations');

        //insert reservations
        const data = await coll.find().toArray();
    
        if(data.length === 0) {
            var reservations = restaurantData.all;
            await coll.insertMany(reservations);
            console.log("Added seed records");
        } else {
            console.log("Reservations collection already has data. No new records added.");
        }
    } catch (err) {
        console.error(err);
    } finally {
        if (conn) {
            await conn.close(); // Ensure connection is only closed if it was created
            console.log("Database connection closed.");
        }
    }
};

if (require.main === module) {
    const filePath = './server/files/data.txt';
    (async () => {
        try {
            await migrateReservations(filePath);
            console.log("Migration completed successfully.");
        } catch (err) {
            console.error("Error during migration:", err);
        }
    })();
}