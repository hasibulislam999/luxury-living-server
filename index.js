/**
 * Title: Server for Luxury Living app
 * Description: A comprehensive back-end to maintain Luxury Living app
 * Author: Hasibul Islam
 * Date: 12/08/2022
 */

// required middleware
const express = require("express");
var cors = require("cors")
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// connect middleware
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

// mongodb connectivity
const uri = process.env.DB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log("MongoDB connected");
        const collection = client.db("test").collection("devices");
    } catch {
        // await client.close();
    }
} run().catch(console.dir);

// enable requests
app.get('/', (req, res) => {
    // res.status(200).json({ message: "Luxury Living app connected" });
    res.status(201).render("index", {
        name: process.env.APP_NAME,
    });
})

app.listen(port, () => {
    console.log(`Luxury Living app listening on port ${port}`);
})