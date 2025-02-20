const express = require('express');
const db = require('./db');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.json()); 
const PORT = process.env.PORT || 3000


const Person = require('./models/Person');
const Menu = require('./models/Menu');

app.get('/', function (req, res) {
    res.send('Welcome to my server....Its Sohaib ka server, mere paas bohot options hai');
});

// **Corrected: Get all persons**
app.get('/person', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('Data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// **Corrected: Get specific person by work type**
app.get('/person/:workType', async (req, res) => {
  const workType = req.params.workType;
  try {
    if (['chef', 'manager', 'waiter'].includes(workType)) {
      const response = await Person.find({ work: workType });
      console.log('Response fetched');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid URL daala hai bhai' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server error' });
  }
});

// **Corrected: Post a person**
app.post('/person', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('Data saved');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// **Corrected: Get all menu items**
app.get('/menu', async (req, res) => {
  try {
    const data = await Menu.find();
    console.log('Data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// **Corrected: Post a menu**
app.post('/menu', async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new Menu(data);
    const response = await newMenu.save();
    console.log('Data saved');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Import the roy=uter files
const personRoutes=require('./routes/personRoutes')
const menu=require('./routes/menuRoutes')
// use the routers
app.use('/person',personRoutes);
app.use('/menu',menu);

// **Start the server**
app.listen(2000, () => {
  console.log("Listening on port 2000");
});



