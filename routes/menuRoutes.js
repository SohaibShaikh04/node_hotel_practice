const express = require('express');
const router = express.Router();
const Menu =require('./../models/Menu')

//router post a menu
router.post('/', async (req, res) => {
    try {
      const data = req.body;``
      const newMenu = new Menu(data);
      const response = await newMenu.save();
      console.log('Data saved');
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  //router get a menu
  router.get('/', async (req, res) => {
    try {
      const data = await Menu.find();
      console.log('Data fetched');
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //routing for taste 
  router.get('/:tasteType', async (req, res) => {
    const tasteType = req.params.tasteType;
    try {
      if (tasteType==='spicy' ||  tasteType==='spicy'  || tasteType==='spicy')
         {
            const response = await Menu.find({ taste: tasteType });
            console.log('Response fetched');
            res.status(200).json(response);
         }
          else {
                    res.status(404).json({ error: 'Invalid URL daala hai bhai' });
              }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server error' });
    }
  });


  router.put('/:id',async (req,res)=>{
    try{
      const menuId=req.params.id; //Extract the id from the url
      const updatedMenuData = req.body;
      const response = await Menu.findByIdAndUpdate(menuId,updatedMenuData,{
            new : true,
            runValidators:true,
      })
      if(!response){
        return res.status(404).json({error:'Menu not found'});
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
      const menuId = req.params.id;
      const response = await Menu.findByIdAndDelete(menuId);
      
      if(!response){
        return res.status(404).json({error:'Menu not found'});
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
  
