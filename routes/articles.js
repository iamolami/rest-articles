const express = require('express')
const router = express.Router()
const articles = require('../resources/articles')

//Getting all
router.get('/', async (req, res) => {
    try {
        res.json(articles)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router;