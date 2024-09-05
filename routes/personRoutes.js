const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const { error } = require('console');



// POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body // Assuming the request body contains the person data

        // create a new Perso document using the Mongoose model
        const newPerson = new Person(data);

        // Save the newPerson to the Database
        const response = await newPerson.save();
        console.log('data saved', response)
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// GET method to get person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Parameterized Route for person
router.get('/:workType', async (req, res) => {
    try{
        const workType = req.params.workType; // Extract the workType from URL Prameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){

            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);

        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// Update Person
router.put('/:id', async (req, res) => {
    try{
        const personID = req.params.id; // Extract the ID from URL Parameter
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personID, updatedPersonData, {
            new: true, // Return the updated document
            runValidatators: true, // Run Mongoose validation
        })

        if(!response){
            return res.status(404).json({error: 'Person Not Found'});
        }

        console.log('data updated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// Delete Person
router.delete('/:id', async (req, res) => {
    try{
        const personID = req.params.id; // Extract the ID from URL Parameter

        // Asuming you have a Person Model
        const response = await Person.findByIdAndDelete(personID);

        if(!response){
            res.status(404).json({error: 'Person not found'});
        }

        console.log('data deleted');
        res.status(200).json({message: 'Person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;