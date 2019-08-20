require('dotenv').config();

const db = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
});

const test = () => {
    db.raw('SELECT 1+1 AS result')
    .then(res => {
        console.log('Database connection successful.');
    })
    .catch(err => {
        console.log('ERROR: Database connection error');
    });
};

module.exports = { db, test };