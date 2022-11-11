const Category = require('../model/Category')

const getCategory = async (req, res, next) => {
    let category;
    try {
        category = await Category.findById(req.body.category_id);
        if (!category) return res.status(403).json({ message: "cannot find author" })
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }

    res.category_id = req.body.category_id;
    next();
}
module.exports = {
    getCategory
}