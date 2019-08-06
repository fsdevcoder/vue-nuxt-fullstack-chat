<template>
  <v-flex xs12>
    <v-text-field
      label="Enter message"
      outline
      v-model="text"
      append-icon="send"
      @keydown.enter="send"
      @click:append="send"
      @keyup="isTyping"
    />
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    text: '',
    write: false
  }),
  methods: {
    send() {
      this.$socket.emit('createMessage', {
        text: this.text,
        id: this.$store.state.user.id
      }, data => {
        if (typeof data === 'string') {
          console.error(data)
        } else {
          this.text = ''
          this.write = false
        }
      })
    },
    isTyping() {
      if (this.text) {
        this.write = true
      } else {
        this.write = false
      }
      this.$socket.emit('isTyping', {
        typing: this.write,
        id: this.$store.state.user.id
      })
    }
  }
}
</script>
