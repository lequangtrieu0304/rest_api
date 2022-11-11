const express = require('express');
const router = express.Router();

const Author = require('../../model/Author');

router.post('/', async (req, res) => {
    try{
        const newAuthor = new Author({
            name: req.body.name
        })
        const result = await newAuthor.save();
        res.status(201).json(result)
    }
    catch(err){
        console.log(err);
        res.status(400).json({message: 'Fail!'})
    }
});

module.exports = router;