<template>
  <v-card elevation="5">
    <v-container fluid>
      <v-row dense>
        <v-col cols="12" md="7" lg="8" xl="9">
          <highcharts ref="chart" :options="chartOptions" />
        </v-col>
        <v-col cols="12" md="5" lg="4" xl="3">
          <v-card class="pa-1">
            <div class="d-flex flex-nowrap">
              <div class="d-flex align-center ml-2">
                Тип графика:
                <v-tooltip
                  top
                  content-class="top"
                >
                  <template #activator="{ on }">
                    <v-btn
                      icon
                      v-on="on"
                      @click="setTypeChart('line')"
                    >
                      <v-icon :color="typeChart == 'line' ? 'green' : 'grey'" medium>
                        {{ icons.mdiChartLine }}
                      </v-icon>
                    </v-btn>
                  </template>

                  <span>Линия</span>
                </v-tooltip>
                <v-tooltip
                  top
                  content-class="top"
                >
                  <template #activator="{ on }">
                    <v-btn
                      icon
                      v-on="on"
                      @click="setTypeChart('bar')"
                    >
                      <v-icon :color="typeChart == 'bar' ? 'green' : 'grey'" medium>
                        {{ icons.mdiChartBar }}
                      </v-icon>
                    </v-btn>
                  </template>

                  <span>Столбцы</span>
                </v-tooltip>
              </div>
              <div class="ml-auto">
                <v-tooltip
                  top
                  content-class="top"
                >
                  <template #activator="{ on }">
                    <v-btn
                      icon
                      v-on="on"
                      @click="removeChart(dataChart.id)"
                    >
                      <v-icon :color="'red'">
                        {{ icons.mdiCloseBox }}
                      </v-icon>
                    </v-btn>
                  </template>

                  <span>Удалить график</span>
                </v-tooltip>
              </div>
            </div>
            <div class="d-flex align-center ml-2">
              Фильтр по датам

              <v-tooltip
                top
                content-class="top"
              >
                <template #activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                    @click="clearFilter()"
                  >
                    <v-icon color="blue">
                      {{ icons.mdiBackspace }}
                    </v-icon>
                  </v-btn>
                </template>

                <span>Очистить фильтр</span>
              </v-tooltip>
            </div>
            <v-container fluid>
              <v-row dense>
                <v-col cols="auto">
                  <my-helper-date-picker
                    v-model="start"
                    label="Старт измерений"
                    :clearable="false"
                    :prepend-inner-icon="icons.mdiCalendar"
                    :min-date="minDate"
                    :max-date="end"
                  />
                </v-col>
                <v-col cols="auto">
                  <my-helper-date-picker
                    v-model="end"
                    label="Окончание измерений"
                    :clearable="false"
                    :prepend-inner-icon="icons.mdiCalendar"
                    :min-date="start"
                    :max-date="maxDate"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { Chart } from 'highcharts-vue'
import { mdiChartLine, mdiChartBar, mdiCloseBox, mdiCalendar, mdiBackspace } from '@mdi/js'
import moment from 'moment'
// import cloneDeep from 'lodash.clonedeep'

export default {
  name: 'MyChartItem',
  components: {
    highcharts: Chart
  },
  props: {
    dataChart: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        title: null,
        labels: [],
        data: []
      })
    }
  },
  data () {
    return {
      icons: {
        mdiChartLine,
        mdiChartBar,
        mdiCloseBox,
        mdiCalendar,
        mdiBackspace
      },
      start: moment(this.dataChart.labels[0], 'DD.MM.YYYY').toISOString(true),
      minDate: moment(this.dataChart.labels[0], 'DD.MM.YYYY').toISOString(true),
      end: moment(this.dataChart.labels[this.dataChart.labels.length - 1], 'DD.MM.YYYY').toISOString(true),
      maxDate: moment(this.dataChart.labels[this.dataChart.labels.length - 1], 'DD.MM.YYYY').toISOString(true),
      typeChart: 'line',
      chartOptions: {
        chart: {
          type: this.typeChart
        },
        title: {
          text: this.dataChart.title
        },
        xAxis: {
          categories: this.dataChart.labels
        },
        series: [{
          data: this.dataChart.data
        }]
      },
      result: {
        error: {},
        show: false
      }
    }
  },
  watch: {
    start (value) {
      this.filterByDate(moment(value).toISOString(true), this.end)
    },
    end (value) {
      this.filterByDate(this.start, moment(value).toISOString(true))
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.result = { error: {}, show: false }
    })
  },
  methods: {
    setTypeChart (type) {
      if (this.typeChart !== type) {
        this.typeChart = type
        this.$refs.chart.chart.series.forEach(function (el, inx) {
          el.update({
            type
          })
        })
      }
    },
    removeChart (id) {
      this.$emit('remove', id)
    },
    filterByDate (minDate, maxDate) {
      const dataChart = this.dataChart

      this.$refs.chart.chart.series[0].update({
        data: dataChart.data.filter(function (el, i) {
          const dt = moment(dataChart.labels[i], 'DD.MM.YYYY').toISOString(true)
          return dt >= minDate && dt <= maxDate
        })
      })

      this.$refs.chart.chart.xAxis[0].update({
        categories: dataChart.labels.filter(function (el, i) {
          const dt = moment(el, 'DD.MM.YYYY').toISOString(true)
          return dt >= minDate && dt <= maxDate
        })
      })
    },
    clearFilter () {
      this.start = moment(this.dataChart.labels[0], 'DD.MM.YYYY').toISOString(true)
      this.end = moment(this.dataChart.labels[this.dataChart.labels.length - 1], 'DD.MM.YYYY').toISOString(true)
    }
  }
}
</script>
