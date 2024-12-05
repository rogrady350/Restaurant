//Bring in Mongo and fs to read text file
const fs = require('fs');
const { MongoClient } = require('mongodb');

//Define Database URL
const dbUrl = process.env.DB_URI || "mongodb://127.0.0.1";

//Define the database server
const dbClient = new MongoClient(dbUrl);

//function to load reservations from text file
async function migrateReservations(filePath) {
    try {
        //read and parse file
        var fileData = fs.readFileSync(filePath, 'utf-8');
        var restaurantData = JSON.parse(fileData);

        //connect to mongo
        const conn = await dbClient.connect();

        //get db and collection
        const db = conn.db('restaurant');
        const coll = db.collection('reservations');

        //insert reservations

    } catch {

    }
}