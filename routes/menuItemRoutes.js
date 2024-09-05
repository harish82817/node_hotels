const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');


// POST method to add menu item
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('data saevd', response);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
})

// GET method to get the Menue Items
router.get('/', async (req, res) => {
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
})

// Parameterized Route for MenuItem
router.get('/:taste', async (req, res) => {
    try{
        const taste = req.params.taste;
        if(taste == 'spicy' || taste == 'sweet' || taste == 'sour'){
            
            const response = await MenuItem.find({taste: taste});
            console.log('response fetched');
            res.status(200).json(response);

        }else{
            res.status(404).json({error: 'Invalid taste type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// PUT API for Menu
router.put('/:id', async (req, res) => {
    try{
        const menuItemID = req.params.id; // Extract the from URL Parameter
        const updatedMenuItemdata = req.body; // Value of Updatation

        const response = await MenuItem.findByIdAndUpdate(menuItemID, updatedMenuItemdata, {
            new: true, // Return the Updated document
            runValidattators: true, // Run Mongoose Validators
        })

        if(!response){
            return res.status(404).json({error: 'ManuItem not found'});
        }

        console.log('data updated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// Delete API for menu
router.delete('/:id', async (req, res) => {
    try{
        const menuItemID = req.params.id;
        
        const response = await MenuItem.findByIdAndDelete(menuItemID);

        if(!response){
            res.status(404).json({error: 'MenuItem not found'});
        }

        console.log('data deleted');
        res.status(200).json({messege: 'MenItem Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;