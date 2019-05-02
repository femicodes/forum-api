require('dotenv').config();
module.exports = {
    env: 'test',
    db: process.env.TEST_DB_URI
};