const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "https://zlack.me",
    transports: ['websocket', 'polling']
  },
  allowEIO3: true
})
const { v4: uuidV4 } = require('uuid')

const PORT = 8080;
const HOST = '0.0.0.0'

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/create-room', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    console.log('room ', roomId, 'being joined by ', userId)
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      console.log('user ', userId, 'leaving ', roomId)
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(PORT, HOST, () => {
  console.log(`Running on ${HOST}:${PORT}`)
})