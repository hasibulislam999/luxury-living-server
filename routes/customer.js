/* eslint-disable no-undef */

/**
 * Title: Customer routes credentials
 * Description: All customer literals and credentials convey here
 * Author: Hasibul Islam
 * Date: 14/08/2022
 */

// external imports
const express = require("express");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// internal imports
const customer = express.Router();

// mongodb connectivity
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@luxuryliving.38sh1rq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        await client.connect();
        console.log("MongoDB connected on customer route");

        // databases for customer
        const database = client.db("customer");
        const booking = database.collection("booking");
        const review = database.collection("review");

        /**
         * ----------------
         * CUSTOMER BOOKING
         * ----------------
         */
        customer.route("/booking")
            .post(async (req, res) => {
                res.status(201).send(await booking.insertOne(req.body));
            })
            .get(async (req, res) => {
                res.status(200).send(await booking.find({}).toArray());
            })
            .put(async (req, res) => {
                const { id, status } = req.body;
                const filter = { _id: ObjectId(id) };
                const options = { upsert: true };
                const updateDoc = {
                    $set: {
                        status: status,
                    }
                };
                const result = await booking.updateOne(filter, updateDoc, options);
                res.status(201).send(result);
            });

        /**
         * ---------------
         * CUSTOMER REVIEW
         * ---------------
         */
        customer.route("/review")
            .post(async (req, res) => {
                res.status(201).send(await review.insertOne(req.body));
            })
            .get(async (req, res) => {
                res.status(200).send(await review.find({}).toArray());
            });
    } catch {
        // await client.close();
    }
}
run().catch(console.dir);

// customer route credentials started
customer.get("/", async (req, res) => {
    res.status(200).json({
        message: "welcome to Customer route."
    });
});

// export customer route as default
module.exports = customer;
