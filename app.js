const Redis = require("ioredis");
const mongodb = require("mongodb");
const express = require("express");

const mongo = new mongodb.MongoClient(process.env.MONGODB_URL);

const redis = new Redis.default({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

const app = express();
app.get("/redis-counter", async function (req, res) {
    const count = await redis.incr("counter");
    return res.send(`Count: ${count}`);
});

app.get("/mongo-counter", async function (req, res) {
    const count = await mongo.db("test").collection("test").countDocuments();
    return res.send(`Count: ${count}`);
});

app.listen(3000, async function () {
    console.log("Listening on port 3000");
    await mongo.connect();

    mongo.db("test").collection("test").insertOne({
        timestamp: new Date()
    });
}); 
