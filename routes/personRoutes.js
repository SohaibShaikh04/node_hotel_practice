const express = require('express');
const router = express.Router();
const Person =require('./../models/Person')


//worktype using router
router.get('/:workType', async (req, res) => {
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






//Person ka post using router
router.post('/', async (req, res) => {
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




//person ka get using router 
router.get('/:workType', async (req, res) => {
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



  router.put('/:id',async (req,res)=>{
  try{
    const personId=req.params.id; //Extract the id from the url
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
          new : true,
          runValidators:true,
    })
    if(!response){
      return res.status(404).json({error:'Person not found'});
    }
    console.log('data updated');
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
    
  }
  }
)

router.delete('/:id', async (req,res)=>{
  try{
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    
    if(!response){
      return res.status(404).json({error:'Person not found'});
    }
    console.log('data deleted');
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Sever Error'});
  }
})























  module.exports=router;
  