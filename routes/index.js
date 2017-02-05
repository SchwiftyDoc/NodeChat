let express = require('express')
let router = express.Router()
let version = '0.0.1'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { version: version })
});

router.get('/demo', function(req, res, next) {
  res.render('demo', {version: version})
})

module.exports = router
