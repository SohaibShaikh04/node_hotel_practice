const express = require('express');
const db = require('./db');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const passport = require('./auth')
const Menu = require('./models/Menu');

app.use(bodyParser.json()); 
app.use(passport.initialize());
const PORT = process.env.PORT || 3000;

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
};

app.use(logRequest);

app.get('/', function (req, res) {
  res.send('Welcome to my server....Its Sohaib ka server, mere paas bohot options hai');
});

const localAuthMiddleware = passport.authenticate('local',{session: false})
app.get('/person',async (req, res) => {
  try {
    const data = await Person.find();
    console.log('Data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/person/:workType', localAuthMiddleware,async (req, res) => {
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

app.post('/menu',localAuthMiddleware, async (req, res) => {
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

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');
app.use('/person',personRoutes);
app.use('/menu',localAuthMiddleware, menuRoutes);

app.listen(2000, () => {
  console.log("Listening on port 2000");
});
