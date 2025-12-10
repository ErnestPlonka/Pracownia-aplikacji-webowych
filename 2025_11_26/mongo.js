const { MongoClient } = require("mongodb")

let db
async function connectMongo() {
    const url = "mongodb+srv://dbUser:dbUserPassword@data.kz5j6ng.mongodb.net/?appName=data"
    const client = new MongoClient(url)
    await client.connect()
    db = client.db("data")
    console.log("Połączono z MongoDB")
}
function getDb() {
    return db
}
module.exports = { connectMongo, getDb }
