require("dotenv").config();

const knex = require("knex");
const knexPostgis = require("knex-postgis");

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

const st = knexPostgis(db);

const testDatabaseConnection = async () => {
  return await db.raw("SELECT 1+1 AS result");
};

const createStopsTable = async () => {
  return await db.schema.createTable("stops", table => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.specificType("geometry", "geography(POINT, 4326)").notNullable();
  });
};

const dropDatabase = async () => {
  return await db.schema.dropTableIfExists("stops");
};

const deleteStops = async () => {
  return await db("stops").del();
};

const initDatabase = async () => {
  return await db.schema.hasTable("stops").then(exists => {
    if (!exists) {
      return createStopsTable();
    } else {
      return deleteStops();
    }
  });
};

module.exports = { db, st, initDatabase };
