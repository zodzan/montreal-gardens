require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const knex = require("./services/database");
const populate = require("./tools/populatedb");

const app = express();

app.use(bodyParser.json());

knex.test();
knex.clearDatabase().then(res => {
  knex.initDatabase().then(res => {
    if (process.env.OFFLINE_MODE) {
      populate
        .loadLocalData()
        .then(res => {
          console.log("Local data insertion successful.");
        })
        .catch(err => {
          console.log("Local data insertion error.");
        });
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log("Bus service listening on PORT " + process.env.PORT + ".");
});