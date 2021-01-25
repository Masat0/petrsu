<template>
  <v-container fluid>
    <v-btn color="success" class="ml-4" @click="openFormNewChart">
      Добавить график
    </v-btn>

    <my-chart-new
      v-model="isShowFormNewChart"
      @event-submit="addChart"
    />

    <my-helper-alert
      v-if="result.show"
      :error="result.error"
      class="my-2"
    />

    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="chart in charts"
          :key="`chart-${chart.id}`"
          cols="12"
          lg="6"
          class="px-2"
        >
          <my-chart-item
            :data-chart="chart"
            @remove="removeChart"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>

class Msg extends Error {
  constructor (message, type) {
    super(message)
    this.type = type
    this.message = message
    this.name = 'Message'
  }
}

export default {
  name: 'PageCharts',
  data () {
    return {
      limitCharts: 4,
      isShowFormNewChart: false,
      result: {
        error: {},
        show: false
      }
    }
  },
  computed: {
    charts () {
      return this.$store.getters.getCharts
    }
  },
  mounted () {
    this.$nextTick(function () {

    })
  },
  methods: {
    openFormNewChart () {
      if (this.charts.length < this.limitCharts) {
        this.isShowFormNewChart = true
      } else {
        this.result = {
          error: new Msg(
            'Достигнут лимит графиков на странице',
            'warning'
          ),
          show: true
        }
      }
    },
    addChart (form) {
      this.result = {
        error: {},
        show: false
      }
      try {
        this.$store.commit('SET_CHARTS', this.charts.concat([{ id: new Date().getTime(), ...form }]))
      } catch (error) {
        this.result = { error, show: true }
      }
    },
    removeChart (id) {
      const remainingCharts = this.charts.filter((chart) => {
        console.log(chart.id, '!==', id)
        return chart.id !== id
      })
      console.log(remainingCharts)
      this.$store.commit('SET_CHARTS', remainingCharts)
    },
    cancel () {
      this.result = {
        error: {},
        show: false
      }
    }
  }
}
</script>
