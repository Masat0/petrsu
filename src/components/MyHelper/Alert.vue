<template>
  <v-alert
    :color="type"
    :icon="icon"
    :dense="dense"
    text
    outlined
  >
    {{ error.message }}
  </v-alert>
</template>

<script>
import {
  mdiAlertOutline,
  mdiInformationOutline,
  mdiMessageAlertOutline,
  mdiCheckboxMarkedCircleOutline
} from '@mdi/js'
export default {
  name: 'MyHelperAlert',
  props: {
    error: {
      type: Error,
      default: () => {
        return new Error('Неизвестная ошибка')
      }
    },
    dense: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    icon () {
      let icon = mdiAlertOutline
      switch (this.type) {
        case 'info':
          icon = mdiInformationOutline
          break
        case 'warning':
          icon = mdiMessageAlertOutline
          break
        case 'success':
          icon = mdiCheckboxMarkedCircleOutline
          break
      }
      return icon
    },
    type () {
      return this.error.type || 'error'
    }
  }
}
</script>

<style scoped lang="scss">
  .my-helper-alert {
    white-space: pre-line;
    width: inherit !important;
  }
  .my-helper-alert .subheading {
    color: #8b8ea5 !important;
  }
</style>
