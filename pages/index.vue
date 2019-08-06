<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex xs12 sm8>
      <v-card min-width="290" hover>
        <v-snackbar
          v-model="snackbar"
          :timeout="6000"
          top
        >
          {{ message }}
          <v-btn
            color="pink"
            flat
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
        <v-card-title>
          <h1>Fullstack Chat with Hope</h1>
        </v-card-title>
        <v-card-text>
          <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            :counter="16"
            :rules="nameRules"
            label="Your name"
            required
          />

          <v-text-field
            v-model="room"
            :rules="roomRules"
            label="Enter room name"
            required
          />

          <v-btn
            :disabled="!valid"
            color="primary"
            type="submit"
            @click.prevent="submit"
          >
            Join to chat
          </v-btn>
        </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  layout: 'empty',
  head: {
    title: 'Welcome to Hope Chat'
  },
  sockets: {
    connect() {
      console.log('Client IO connected')
    }
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 16) || 'Name must be less than 16 characters'
    ],
    room: '',
    roomRules: [
      v => !!v || 'Room name is required'
    ],
    snackbar: false,
    message: ''
  }),
  mounted() {
    const { message } = this.$route.query
    if (message === 'noUser') {
      this.message = 'Enter your name and room'
    } else if (message === 'leftChat') {
      this.message = 'You leave from chat'
    }

    this.snackbar = !!this.message
  },
  methods: {
    ...mapMutations(['setUser']),
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        }

        this.$socket.emit('userJoined', user, data => {
          if (typeof data === 'string') {
            alert(data)
            console.error(data)
          } else {
            user.id = data.userId
            this.setUser(user)
            this.$router.push('/chat')
          }
        })
      }
    }
  }
}
</script>
