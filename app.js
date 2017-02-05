let express = require('express')
let app = express()
let server = require('http').createServer(app)
let expressWs = require('express-ws')(app)
let path = require('path')
let ent = require('ent')
let favicon = require('serve-favicon')
let logger = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let io = require('socket.io').listen(server);

let index = require('./routes/index')
let users = require('./routes/users')
let messages = require('./routes/messages')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)
app.use('/messages', messages)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// Sockets handling
let usersArr = []
let sockets = []

io.on('connection', function(socket) {
  socket.on('new user', function(content) {
    pseudo = content.pseudo
      if (usersArr.indexOf(pseudo) < 0) {
        usersArr.push(pseudo)
        socket.pseudo = pseudo
        sockets.push(socket)
        socket.broadcast.emit('new user', pseudo)
      }
      console.log(usersArr)
  })
  socket.on('disconnect', () => {
    usersArr.splice(usersArr.indexOf(socket.pseudo), 1)
    socket.broadcast.emit('disconnection', {message : socket.pseudo + ' has disconnected.'})
    sockets.splice(sockets.indexOf(socket))
  })
})

server.listen(8080)

module.exports = app
