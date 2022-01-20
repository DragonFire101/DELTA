require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

class ApiServer {
    constructor(port) {
        //Need to figure out where to connect from request.
        mongoose.connect(process.env.DATABASE_URI);
        const db = mongoose.connection;

        db.once('open', () => console.log('[EVENT] Connected to MongoDB database.'));

        this.app = express();
        this.app.use(express.json());

        this.initializeRoutes();

        this.app.listen(port, () => console.log(`[EVENT] Api server started on port ${3000}.`));
    }

    initializeRoutes() {
        const apiRouter = require('./routes/api.js');
        this.app.use('/api', apiRouter);
        
        const charactersRouter = require('./routes/characters.js');
        this.app.use('/api/characters', charactersRouter);
    }
}

module.exports.ApiServer = ApiServer;