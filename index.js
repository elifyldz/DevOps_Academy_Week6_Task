const express = require('express');
const redis = require('redis');
const app = express();
const redisClient = redis.createClient({
    host: "localhost",
    port: 6379
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();
app.get('/id/1', async (req, res) => {
    blogData = await redisClient.get ("blog:id:1");

    if (blogData) {
        console.log("Data from Redis");
        res.send(blogData);

        console.log("Data from Database")
        redisClient.set("blog:id:1", "Data from Database");

    };
    try {
        const data = await redisClient.get("Buse");
        console.log(data);
        res.send('Hello world!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
app.listen(5000, () =>{
    console.log('listening on port 5000');
});