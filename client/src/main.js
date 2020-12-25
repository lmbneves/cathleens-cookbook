import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import { routes } from './router'

import vuetify from './plugins/vuetify'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import "@/assets/css/main.css"

Vue.config.productionTip = false

Vue.use(vuetify)
Vue.use(TiptapVuetifyPlugin, { vuetify, iconsGroup: 'md' })

const router = new VueRouter({ routes: routes, mode: 'history' })
Vue.use(VueRouter)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')