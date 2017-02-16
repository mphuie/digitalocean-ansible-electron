<template lang="jade">
  .container
    .panel.panel-default
      .panel-heading Set your Digitalocean API key
      .panel-body
        .input-group
          input.form-control(type="text", name="apiKey",v-model="apiKey")
          span.input-group-btn
            button.btn.btn-primary(v-on:click="setApiKey") Save
        .alert.alert-info Your API key will be saved locally to {{ configPath }}
</template>


<script>
  const fs = require('fs')
  const electron = require('electron')

  export default {
    data () {
      return {
        apiKey: '',
        configPath: ''
      }
    },
    methods: {
      setApiKey () {
        fs.writeFileSync(this.configPath, JSON.stringify({ apiKey: this.apiKey }))
        this.$store.apiKey = this.apiKey
        console.log('success!')
      }
    },
    mounted () {
      let path = electron.remote.app.getPath('appData') + '/digitalocean-electron'
      this.configPath = path + '/config.json'
    }
  }
</script>

<style scoped>


</style>

