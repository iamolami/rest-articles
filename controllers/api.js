const _ = require('lodash');
const validator = require('validator');

const articles = require('../resources/articlesV1');

const notFound = (res) => {
    res.status(404).json({
        message: 'Sorry, that page does not exist',
        code: 34
    })
}

/* ====================== Exporting routes ====================== */
exports.index = (req, res) => {
    res.send(articles);
}

exports.getAll = (req, res) => {
    res.status(200).json(articles)
}

exports.name = (req, res) => {
    const name = req.params.name;

    const article = _.find(articles, (co) => {
        return validator.isIn(name, co.name)
    });

    //Return 'noFound' if not found
    if(!article) {
        notFound(res)
    }

    res.status(200).json(article)
}

exports.content = (req, res) => {
    const content = req.params.content;

    const article = _.find(articles, (co) => {
        return validator.isIn(content, co.content)
    });

    if(!article) {
        notFound(res)
    }

    res.status(200).json(article)
}