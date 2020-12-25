require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());

const mongoose = require('mongoose');
const db_uri = process.env.NODE_ENV === "prod" ? process.env.MONGODB_URI : process.env.DATABASE_URL;
mongoose.connect(db_uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

const router = require('./recipes');
server.use('/recipes', router);

server.listen(process.env.PORT || 3000, () => console.log("Server started!"));