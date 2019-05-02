require('dotenv').config();
module.exports = {
    env: 'production',
    db: process.env.PROD_DB_URI
};