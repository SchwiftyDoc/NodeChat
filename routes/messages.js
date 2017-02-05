let express = require('express')
let router = express.Router();


let messages = [
  {
    id: 1,
    to: 1,
    from: 'Marine',
    text: "Salut!"
  },
  {
    id: 2,
    to: 1,
    from: 'Marine',
    text: "Ca va?"
  },
  {
    id: 3,
    to: 2,
    from: 'Marine',
    text: 'Salut!'
  }
]

/* GET users listing. */

router.get('/', function(req, res, next) {
    res.send(messages)
})


module.exports = router;