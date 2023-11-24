const express = require('express');
const app = express();
require('dotenv').config();
const { initDB } = require("./config/init_db");


//Handle command line args
process.argv.forEach(function (val, index, array) {
    if (val === "--init-db") {
        initDB();
    }
});



// Middlewares
app.use(express.json()); // for parsing application/json



// Import Routes
const userRoutes = require('./routes/userRoutes');



// Use Routes
app.use('/api/auth', userRoutes);




// Export app
module.exports = app;
