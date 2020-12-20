require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

const Recipe = require('./recipe');
async function mySeeder() {
  const data = await Recipe.find({}).exec();
  if (data.length !== 0) {
      // Data exists, no need to seed.
      return;
  }
  const seed = new Recipe({
    "title": "A pizza recipe",
    "prep_time": "20 minutes",
    "cook_time": "5 minutes",
    "servings": "2",
    "description": "This is a recipe for a yummy pizza",
    "ingredients": "ingredients",
    "directions": "directions"
  });

  // some other seed logic
  // ...

  await seed.save()
}

mySeeder();

const router = require('./recipes');
server.use('/recipes', router);

server.listen(3000, () => console.log("Server started!"));