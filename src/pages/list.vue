<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="6" sm="4" md="3" lg="2">
        <v-card
          elevation="2"
          outlined
          tile
          height="100%"
        >
          <template v-if="items.length">
            <v-container>
              <v-row>
                <v-col
                  v-for="item in items"
                  :key="`item-${item.id}`"
                  cols="12"
                  class="pa-2"
                  @click="clickItem(item)"
                >
                  {{ item.title.substring(0,20) + '...' }}
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template v-else>
            <div>
              Данных нет
            </div>
          </template>
        </v-card>
      </v-col>
      <v-col cols="6" sm="8" md="9" lg="10">
        <v-card
          elevation="2"
          outlined
          tile
          height="100%"
        >
          <v-card-text v-if="selectedItem.url">
            <v-container>
              <v-row>
                <v-col cols="6" sm="7">
                  <v-img
                    :src="selectedItem.url"
                    aspect-ratio="1"
                  />
                </v-col>
                <v-col cols="6" sm="5">
                  {{ selectedItem.title }}
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'PageList',
  async asyncData ({ app, store, error, query }) {
    try {
      await store.dispatch('fetchDataFromJSON')
    } catch (e) {
      error({ statusCode: e.code, message: e.message })
    }
  },
  data () {
    return {
      selectedItem: {
        url: null,
        title: null
      }
    }
  },
  computed: {
    items () {
      return this.$store.getters.getList
    }
  },
  methods: {
    clickItem (item) {
      this.selectedItem = item
    }
  }
}
</script>
