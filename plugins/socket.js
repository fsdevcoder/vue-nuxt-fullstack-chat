import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function ({ store }) {
  Vue.use(new VueSocketIO({
    debug: false,
    connection: process.env.NODE_ENV === 'production' ? 'https://fullstack-hope-chat.herokuapp.com/' : 'http://localhost:3000',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  }))
}
