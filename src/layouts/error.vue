<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex xs10 class="ma-5">
        <v-layout column>
          <v-flex xs12 class="text-center error-text">
            <h1>{{ code }}</h1>
          </v-flex>

          <v-flex xs12 class="text-center error-text">
            {{ message }}
          </v-flex>

          <v-flex xs12 class="text-center mt-5">
            <v-btn
              to="/"
              nuxt
              tile
              class="white--text"
              color="primary"
            >
              Вернуться на главную
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    return {
      title: 'Ошибка'
    }
  },
  computed: {
    message () {
      console.error(this.error)
      return this.error.message || 'Произошла ошибка'
    },
    code () {
      return this.error.statusCode || 500
    }
  }
}
</script>
