const express = require('express');
const { MongoClient } = require('mongodb');
const cors= require('cors');

const bodyParser = require('body-parser');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passManager';
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3000;

client.connect();
const db = client.db(dbName);

// For getting passwords
app.get('/', async (req, res) => {
  try {
    const collection = db.collection('documents');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// For inserting a new password
app.post('/', async (req, res) => {
  try {
    const password = req.body;
    const collection = db.collection('documents');
    const insertResult = await collection.insertOne(password);
    res.json({ success: true, result: insertResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// For deleting a password
app.delete('/', async (req, res) => {
  try {
    const password = req.body;
    const collection = db.collection('documents');
    const deleteResult = await collection.deleteOne(password);
    res.json({ success: true, result: deleteResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
