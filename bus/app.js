require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const knex = require("./services/database");
const populatedb = require("./tools/populatedb");

const app = express();

app.use(bodyParser.json());

knex
  .initDatabase()
  .then(() => {
    console.log("Database: Initialized.");
  })
  .catch(err => {
    console.log("Database: Error initializing.");
  })
  .then(() => {
    if (process.env.OFFLINE_MODE) {
      populatedb
        .loadLocalData()
        .then(() => {
          console.log("Database: Populated.");
        })
        .catch(err => {
          console.log("Database: Error populating.");
        });
    }
  });

app.listen(process.env.PORT, () => {
  console.log("Bus service listening on PORT " + process.env.PORT + ".");
});
