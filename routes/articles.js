var _ = require('lodash');
var articles = require('../resources/articles');

var notFound = function(res) {
  res.json(404, {
    message: "Sorry, that page does not exist",
    code: 34
  })
}

exports.index = function(req, res) {
  res.status(200).json(articles)
}