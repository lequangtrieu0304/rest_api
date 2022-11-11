const Author = require('../model/Author')

const getAuthor = async (req, res, next) => {
    let author;
    try{
        author = await Author.findById(req.body.author_id);
        if(!author) return res.status(403).json({message: "cannot find author"})
    }
    catch(err){
        res.status(400).json({error: err.message})
    }

    res.author_id = req.body.author_id;
    next();
} 

module.exports = {
    getAuthor
}