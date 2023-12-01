const express = require('express');
const app = express();
require('dotenv').config();
const { initDB, resetDbTables, fillDbWithTestData } = require("./config/init_db");


//Handle command line args
//Not for production REMOVE
process.argv.forEach((val, index, array) => {
    (async () => {
        if (val === "--init-db") {
            await initDB();
        }

        if (val === "--reset-db") {
            await resetDbTables();
        }

        if (val === "--fill-tables") {
            await fillDbWithTestData();
        }
    })();
});



// Middlewares
app.use(express.json()); // for parsing application/json



// Import Routes
const userRoutes = require('./routes/userRoutes');
const openRoutes = require('./routes/openRoutes');
const secureRoutes = require('./routes/secureRoutes');
const adminRoutes = require('./routes/adminRoutes');



// Use Routes
app.use('/api/auth', userRoutes);
app.use('/api/open', openRoutes);
app.use('/api/secure', secureRoutes);
app.use('/api/admin', adminRoutes);




// Export app
module.exports = app;
