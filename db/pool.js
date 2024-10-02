require('dotenv').config();
const { Pool } = require('pg');
const { connectionString } = require('pg/lib/defaults');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

module.exports = pool;