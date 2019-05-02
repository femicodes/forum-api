require('dotenv').config();
module.exports = {
    env: 'development',
    db: process.env.DB_URI
};