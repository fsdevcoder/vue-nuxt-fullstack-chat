<template>
  <v-app app dark>
    <v-content class="bg">
      <v-container fluid class="vh100">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="scss" scoped>
.bg {
  background-image: url('/bg.jpg');
  background-size: cover;
  background-position: 50% 50%;
}
.vh100 {
  height: 100vh;
  .layout.column.justify-center.align-center {
    height: 100%;
  }
}
</style>
