export const state = () => ({
  user: {},
  messages: [],
  users: [],
  typing: ''
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  clearData(state) {
    state.user = {}
    state.messages = []
    state.users = []
    state.typing = ''
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message)
    const audio = new Audio()
    audio.preload = 'auto'
    if (message.name === 'admin') {
      audio.src = '/audio/admin.mp3'
    } else {
      audio.src = message.id === state.user.id ? '/audio/send.mp3' : '/audio/message.mp3'
    }
    audio.play()
  },
  SOCKET_updateUsers(state, users) {
    state.users = users
  },
  SOCKET_isTyping(state, payload) {
    state.typing = payload
  }
}
