const express = require('express');
const router = express.Router();

const Category = require('../../model/Category');

router.post('/', async (req, res) => {
    try{
        const newCategory = new Category({
            name: req.body.name
        })
        const result = await newCategory.save();
        res.status(201).json(result)
    }
    catch(err){
        console.log(err);
        res.status(400).json({message: 'Fail!'})
    }
});

module.exports = router;