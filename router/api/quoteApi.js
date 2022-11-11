const express = require('express');
const router = express.Router();

const getAuthor = require('../../middleware/getAuthor');
const getCategory = require('../../middleware/getCategory');

const Author = require('../../model/Author');
const Category = require('../../model/Category');
const Quote = require('../../model/Quote');

const ROLE_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/VerifyRole')

// create new quote
router.post('/', verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), getAuthor.getAuthor, getCategory.getCategory,  async (req, res) => {
    try{
        const newQuote = new Quote({
            quote: req.body.quote,
            author_id: res.author_id,
            category_id: res.category_id,
            dayCreate: new Date()
        });
        const result = await newQuote.save();
        res.status(201).json(result)
    }
    catch(err){
        res.status(500).json({message: 'loi server!'})
    }
})

// read all quote
router.get('/', async(req, res) => {
    try{
        const allQuote = [];
        const quotes = await Quote.find();
        for(let quote of quotes){
            const author = await Author.findById(quote.author_id)
            const category= await Category.findById(quote.category_id)
            allQuote.push({quote, author, category})
        }
        res.json(allQuote)
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'loi server!'})
    }
})

// read by id
router.get('/:id', async(req, res) => {
    try{
        const quote = await Quote.findById(req.params.id);
        if(!quote) return res.status(403).json({message: 'not found ID!'})
        const myQuote = [];
        const author = await Author.findById(quote.author_id)
        const category = await Category.findById(quote.category_id)

        myQuote.push({quote, author, category})
        res.status(200).json(myQuote)
    }
    catch{
        res.status(500).json({message: "loi server!"})
    }
});

//update quote
router.put('/:id', verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), getAuthor.getAuthor, getCategory.getCategory, async(req, res) => {
    try{
        const quoteUpdate = await Quote.findById(req.params.id)
        if(!quoteUpdate) return res.status(403).json({message: 'not found ID!'})

        if(req.body.quote) quoteUpdate.quote = req.body.quote;
        quoteUpdate.author_id = res.author_id;
        quoteUpdate.category_id = res.category_id;
        quoteUpdate.dayUpdate = new Date();
        const result = await quoteUpdate.save()
        res.status(200).json(result)
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

router.delete('/:id', verifyRoles(ROLE_LIST.Admin), async(req, res) =>{
    try{
        const quote = await Quote.findById(req.params.id)
        if(!quote) return res.status(403).json({message: 'not found ID!'});

        await quote.remove();
        res.status(200).json({message: 'remove successful!'})
    }
    catch(err){
        res.status(500).json({message: 'loi server!'})
    }
})

module.exports = router;