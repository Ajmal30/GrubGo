const mongoose = require("mongoose");
require('dotenv').config();

async function initializeDB() {
    console.log('Connecting...');

    try {
        await mongoose.connect(process.env.ATLAS_URI, {
            useNewUrlParser: true
        })
        console.log('DB Connected...')
    } catch(e) {
        console.log('Error while DB connection');
        throw e;
    }
}

module.exports = {
    initializeDB
};