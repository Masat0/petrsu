<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col
        cols="12"
      >
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              :value="computedDateFormatted"
              :label="label"
              :prepend-inner-icon="prependInnerIcon"
              :clearable="clearable"
              :error-messages="errorMessages"
              readonly
              outlined
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="field"
            :first-day-of-week="1"
            locale="ru"
            :min="minDate"
            :max="maxDate"
            no-title
            scrollable
            @change="menu = false"
          />
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MyHelperDatePicker',
  $_veeValidate: {
    name () {
      return this.label
    },
    value () {
      return this.field
    }
  },
  props: {
    value: {
      type: String,
      required: true,
      default: ''
    },
    errorMessages: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    dense: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    prependInnerIcon: {
      type: String,
      default: ''
    },
    minDate: {
      type: String,
      default: undefined
    },
    maxDate: {
      type: String,
      default: undefined
    },
    cls: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    // https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments
    menu: false
  }),

  computed: {
    field: {
      get () {
        return this.value
      },
      set (newVal) {
        this.$emit('input', newVal)
      }
    },
    computedDateFormatted () {
      return this.field ? moment(this.field, 'YYYY-MM-DD').format('DD.MM.YYYY') : ''
    }
  }
}
</script>
