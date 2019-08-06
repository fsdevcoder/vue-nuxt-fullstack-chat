<template>
  <div>
    <div v-if="message.name === 'admin'" class="system">
      <p class="text-xs-center">
        {{ message.text }}
      </p>
      <hr>
    </div>
    <div v-else class="wrap">
      <div class="message" :class="{ owner }">
        <small><strong>{{ message.name }}</strong></small>
        <div><p>{{ message.text }}</p></div>
        <p class="text-xs-right"><small>{{ message.date }}</small></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    owner: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.system {
  margin-bottom: 1rem;
  p {
    margin-bottom: 1rem;
  }
}

.wrap {
  display: flex;
  flex-direction: column;
}

.message {
  padding: 1rem;
  width: 60%;
  margin: 0 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, .3);
  border-radius: 4px;
  background: #1976d2;
  position: relative;
  margin-bottom: 1rem;
  p {
    margin-bottom: 0;
  }
  &-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.owner {
  background: white;
  color: black;
  align-self: flex-end;
}
</style>
