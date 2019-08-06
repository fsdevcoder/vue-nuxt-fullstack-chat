const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

const m = (name, text, id, date) => ({ name, text, id, date })

io.on('connection', socket => {

  socket.on('userJoined', (data, cb) => {
    if (!data.name || !data.room) {
      return cb('Data invalid')
    }

    socket.join(data.room)

    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    })

    // eslint-disable-next-line standard/no-callback-literal
    cb({ userId: socket.id })
    io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
    socket.emit('newMessage', m('admin', `Welcome to chat, ${data.name}.`))
    socket.broadcast
      .to(data.room)
      .emit('newMessage', m('admin', `${data.name} has joined the chat.`))
  })

  socket.on('createMessage', (data, cb) => {
    if (!data.text) {
      // eslint-disable-next-line standard/no-callback-literal
      return cb('Message cannot empty')
    }

    const datetime = new Date()

    const user = users.get(data.id)
    if (user) {
      io.to(user.room).emit('newMessage', m(user.name, data.text, data.id, datetime.toLocaleTimeString()))
    }
    cb()
  })

  socket.on('isTyping', (data, cb) => {
    const user = users.get(data.id)
    if (user) {
      socket.broadcast.to(user.room).emit('isTyping', data.typing ? `${user.name} is typing ...` : '')
    }
  })

  socket.on('userLeft', (id, cb) => {
    const user = users.remove(id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit('newMessage', m('admin', `User ${user.name} left the chat.`))
    }
    cb()
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit('newMessage', m('admin', `User ${user.name} left the chat.`))
    }
  })
})

module.exports = {
  app, server
}
