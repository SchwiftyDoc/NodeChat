var express = require('express');
var router = express.Router();

var users = [
    {
      id: 1,
      name: 'Corentin',
    },
    {
      id: 2,
        name: 'Marine'
    },
    {
      id: 3,
        name: 'Anne'
    },
    {
      id: 4,
        name: 'Noël'
    }
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(users);
});

module.exports = router;
