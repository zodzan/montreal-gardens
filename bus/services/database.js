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

const test = async () => {
  await db
    .raw("SELECT 1+1 AS result")
    .then(res => {
      console.log("Database connection successful.");
    })
    .catch(err => {
      console.log("Database connection error.");
    });
};

const initDatabase = async () => {
  let stopsExists = await db.schema.hasTable("stops");

  if (!stopsExists) {
    await db.schema.createTable("stops", table => {
      table.string("id").primary();
      table.string("name").notNullable();
      table.specificType("geometry", "geography(POINT, 4326)").notNullable();
    });
  }
};

const clearDatabase = async () => {
  await db.schema.dropTableIfExists("stops");
};

module.exports = { db, st, test, initDatabase, clearDatabase };
