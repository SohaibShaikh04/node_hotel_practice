const express = require('express');
const router = express.Router();
const Person =require('./../models/Person')
const {jwtMiddleware,generateToken} = require('./../jwt');

//get method for using router
router.get('/',jwtMiddleware, async (req, res) => {
   
    try {
     
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data)
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server error' });
    }
  });



//Login Route
router.post('/login' ,async(req,res) => {
  try{
    //Extract username and password from request body
    const {username,password} = req.body;

    // Find by username 
    const user = await Person.findOne({username: username});
   
    //If user does not exist exit or password does not match, return error
    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error:'Invalid username or password'})
    }

    //genereate tokens
    const payload = {
      id : user.id,
      username:user.username
    }
    const token = generateToken(payload);

    //return token as response
    res.json({token})  
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//Person ka post using router
router.post('/signup', async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
      const response = await newPerson.save();
      console.log('Data saved');
      //payload
      const payload = {
        id: response.id,
        username: response.username
      }
      //generating token 
      console.log(JSON.stringify(payload));
      const token = generateToken(payload);
      console.log("Token is : ",token)
      res.status(200).json({response: response,token: token});
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });




//person ka get using router 
router.get('/:workType', jwtMiddleware,async (req, res) => {
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
  