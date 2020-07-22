const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
// const dbUri = 'mongodb+srv://dondrzzy:IwsyBI4SnfkPKwGd@cluster0.pldus.mongodb.net/test'
let dbUri = ''
if (process.env.NODE_ENV === 'production') {
  console.log('environment:production');
  dbUri = 'mongodb+srv://dondrzzy:IwsyBI4SnfkPKwGd@cluster0.pldus.mongodb.net/test'
  console.log('dbUri', dbUri);
} else {
  console.log('environment:local');
  dbUri = 'mongodb://mongo:27017/docker-node-mongo'
}
mongoose
  .connect(
    dbUri,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/Item');



app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Server running... on port ', port));
