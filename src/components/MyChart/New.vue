<template>
  <my-helper-dialog
    v-model="show"
    title="Добавление нового графика"
    :result="result"
    max-width="600px"
    @event-submit="submit()"
    @event-close="close()"
  >
    <validation-observer
      ref="observer"
    >
      <v-form
        id="formAddChart"
      >
        <v-container fluid>
          <v-row dense>
            <v-col cols="12" class="pb-0 mb-0">
              <validation-provider
                v-slot="{ errors }"
                name="Имя графика"
                rules="required"
              >
                <v-text-field
                  v-model="form.name"
                  :error-messages="errors"
                  outlined
                  clearable
                  class="required"
                  label="Имя графика"
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors }"
                name="Старт изменений"
                rules="required"
                style="width: 50%;"
              >
                <my-helper-date-picker
                  v-model="form.start"
                  label="Старт измерений"
                  :clearable="false"
                  :prepend-inner-icon="icons.mdiCalendar"
                  :error-messages="errors"
                  class="required"
                  color="primary"
                  hide-details
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors }"
                name="Окончание изменений"
                rules="required"
                style="width: 50%;"
              >
                <my-helper-date-picker
                  v-model="form.end"
                  label="Окончание измерений"
                  :clearable="false"
                  :prepend-inner-icon="icons.mdiCalendar"
                  :error-messages="errors"
                  class="required"
                  color="primary"
                  hide-details
                />
              </validation-provider>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </validation-observer>
  </my-helper-dialog>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import { mdiCalendar } from '@mdi/js'
import moment from 'moment'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
const event = {
  submit: 'event-submit'
}
const init = {
  id: null,
  name: '',
  start: '',
  end: ''
}

class Msg extends Error {
  constructor (message, type) {
    super(message)
    this.type = type
    this.message = message
    this.name = 'Message'
  }
}

export default {
  name: 'MyChartNew',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: cloneDeep(init),
      icons: {
        mdiCalendar
      },
      result: {
        error: {},
        show: false
      }
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (newVal) {
        this.$emit('input', newVal)
      }
    },
    charts () {
      return this.$store.getters.getCharts
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.result = { error: {}, show: false }
    })
  },
  methods: {
    getRandomData (length, max) {
      return [...new Array(length + 1)].map(() => Math.round(Math.random() * max))
    },
    getDaysArray (start, end) {
      const arr = []
      let currentDate = moment(start)
      const stopDate = moment(end)
      while (currentDate <= stopDate) {
        arr.push(moment(currentDate).format('DD.MM.YYYY'))
        currentDate = moment(currentDate).add(1, 'days')
      }
      return arr
    },
    async submit () {
      const valid = await this.$refs.observer.validate()

      if (valid) {
        if (this.form.start > this.form.end) {
          this.result = {
            error: new Msg(
              'Дата старта измерений не может быть позже даты окончания измерений',
              'warning'
            ),
            show: true
          }
          return false
        }
        const title = this.form.name
        const isTitleExists = this.charts.filter((obj) => {
          return obj.title === title
        })
        if (isTitleExists.length) {
          this.result = {
            error: new Msg(
              'График с таким наименованием уже существует',
              'warning'
            ),
            show: true
          }
          return false
        }

        const a = moment(this.form.start)
        const b = moment(this.form.end)
        const amountDays = b.diff(a, 'days')
        const data = this.getRandomData(amountDays, 100)
        const labels = this.getDaysArray(this.form.start, this.form.end)

        const isDataExists = this.charts.filter((obj) => {
          return JSON.stringify(obj.labels) === JSON.stringify(labels) && JSON.stringify(obj.data) === JSON.stringify(data)
        })

        if (isDataExists.length) {
          this.result = {
            error: new Msg(
              'График с таким данными уже существует',
              'warning'
            ),
            show: true
          }
          return false
        }

        try {
          this.$emit(event.submit, {
            title,
            start: this.form.start,
            end: this.form.end,
            data,
            labels
          })
          await this.close()
        } catch (error) {
          this.result = { error, show: true }
        }
      }
    },

    close () {
      this.show = false
      return new Promise(resolve => setTimeout(() => {
        // this.$validator.reset()
        this.form = cloneDeep(init)
        this.result = { error: {}, show: false }
        resolve()
      }, 300))
    }
  }
}
</script>
