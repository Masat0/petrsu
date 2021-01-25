import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru.json'
import { required } from 'vee-validate/dist/rules'

// install rules and localization
extend('required', required)

localize('ru', ru)

// Install components globally
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

Vue.config.productionTip = false
