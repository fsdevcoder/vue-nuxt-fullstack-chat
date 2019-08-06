<template>
  <div class="c-wrap">
    <div class="chat-chat" ref="block">
      <ul>
        <Message
          v-for="message in messages"
          :key="message.text"
          :message="message"
          :owner="message.id === user.id"
        />
      </ul>
      <p class="text-xs-right"><em>{{ typing }}</em></p>
    </div>
    <div class="chat-form" >
      <chat-form :typing="typing" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Message from '@/components/Message'
import ChatForm from '@/components/ChatForm'

export default {
  middleware: ['chat'],
  head() {
    return {
      title: `Room ${this.user.room}`
    }
  },
  components: {
    Message, ChatForm
  },
  computed: mapState(['user', 'messages', 'typing']),
  watch: {
    messages() {
      setTimeout(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.chat {
  &-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  &-form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    height: 100px;
    background: #212121;
  }
  &-chat {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 100px;
    padding: 1rem;
    overflow-y: auto;
  }
}
</style>
