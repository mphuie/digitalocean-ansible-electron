import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
const electron = require('electron')
const fs = require('fs')

import App from './App'
import routes from './routes'
import VueStash from 'vue-stash'

Vue.use(VueStash)
Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.config.debug = true

let path = electron.remote.app.getPath('appData') + '/digitalocean-electron'
let configPath = path + '/config.json'

if (!fs.existsSync(path)) {
  fs.mkdirSync(path)
}

if (!fs.existsSync(configPath)) {
  fs.writeFileSync(configPath, JSON.stringify({}))
}

let config = JSON.parse(fs.readFileSync(configPath))

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App,
  data: {
    store: {
      config: config,
      droplets: []
    }
  }

}).$mount('#app')
