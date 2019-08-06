<template>
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer" mobile-break-point="768">
      <v-list subheader>
        <v-subheader>Chat members ({{ users.length }})</v-subheader>
        <v-list-tile
          v-for="u in users"
          :key="u.id"
          avatar
          @click.prevent
        >
          <v-list-tile-content>
            <v-list-tile-title v-html="u.name"></v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon :color="u.id === user.id ? 'primary' : 'grey'">chat_bubble</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click="exit">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Chat room {{ user.room }}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <div class="chat-content">
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data: () => ({
    drawer: true
  }),
  computed: mapState(['user', 'users']),
  methods: {
    ...mapMutations(['clearData']),
    exit() {
      this.$socket.emit('userLeft', this.user.id, () => {
        this.$router.push('/?message=leftChat')
        this.clearData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-content {
  height: 100%;
}
</style>
