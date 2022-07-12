const Redis = require("ioredis");
const express = require("express");

const redis = new Redis.default({
    host: "localhost",
    port: 6379,
    password: "testing"
});

const app = express();
app.get("/counter", async function (req, res) {
    const count = await redis.incr("counter");
    return res.send(`Count: ${count}`);
});

app.listen(3000, function () {
    console.log("Listening on port 3000");
}); 
