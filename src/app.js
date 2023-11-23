const express = require('express');
const app = express();


// Middlewares
app.use(express.json()); // for parsing application/json



// Import Routes
const sampleRoutes = require('./routes/sampleRoutes');



// Routes Middleware
app.use('/api/sample', sampleRoutes);



// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
