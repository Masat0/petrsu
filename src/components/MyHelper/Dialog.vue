<template>
  <v-dialog
    v-bind="$attrs"
    :transition="false"
    persistent
    v-on="$listeners"
  >
    <v-card>
      <v-toolbar
        :color="titleColor"
        light
        flat
        class="white--text"
      >
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>

        <v-spacer />

        <slot name="toolbar-btn" />

        <v-btn
          text
          icon
          color="white"
          @click="close()"
        >
          <v-icon color="white">
            {{ icons.mdiClose }}
          </v-icon>
        </v-btn>
      </v-toolbar>

      <v-divider />

      <template v-if="result.show">
        <my-helper-alert
          :error="result.error"
          class="mx-5 my-2"
        />

        <v-divider />
      </template>

      <v-card-text :class="cardTextCls">
        <slot />
      </v-card-text>

      <v-divider />

      <v-card-actions v-if="showActions">
        <v-container fluid>
          <v-row dense>
            <v-col cols="12" sm="7">
              <div
                v-if="showRequiredText"
                class="px-3 secondary--text required"
              >
                <small><label /> Поля отмеченные звездочкой обязательны для заполнения</small>
              </div>
            </v-col>
            <v-col cols="12" sm="5">
              <v-btn
                :form="formId"
                tile
                color="success"
                class="mr-3"
                style="text-transform: none !important;"
                @click="submit()"
              >
                Добавить
              </v-btn>

              <v-btn
                color="secondary"
                outlined
                tile
                style="text-transform: none !important;"
                @click="close()"
              >
                Отмена
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiClose } from '@mdi/js'
const event = {
  submit: 'event-submit',
  close: 'event-close'
}

export default {
  name: 'MyHelperDialog',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    },
    titleColor: {
      type: String,
      default: 'primary'
    },
    formId: {
      type: String,
      default: ''
    },
    showRequiredText: {
      type: Boolean,
      default: true
    },
    showActions: {
      type: Boolean,
      default: true
    },
    cardTextCls: {
      type: String,
      default: 'px-1 pt-1'
    },
    result: {
      type: Object,
      default () {
        return {
          error: {},
          show: false
        }
      }
    }
  },
  data () {
    return {
      icons: {
        mdiClose
      }
    }
  },
  methods: {
    submit () {
      this.$emit(event.submit)
    },
    close () {
      this.$emit(event.close)
    }
  }
}
</script>

<style scoped lang="scss">
 .v-toolbar {
   flex: none !important;

   .v-toolbar__title {
     font-weight: 500 !important;
     font-size: 18px;
     letter-spacing: normal;
     line-height: 2rem;
   }
 }
 .my-helper-dialog__content {
   flex: 1 1 auto;
 }
</style>
