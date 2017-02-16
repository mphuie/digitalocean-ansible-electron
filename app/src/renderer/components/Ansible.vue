<template lang="jade">
  .container
    h3 Ansible
    button.btn.btn-primary(v-on:click.prevent="generateInventoryFile") Generate inventory file from DO
    button.btn.btn-success(v-on:click.prevent="runTest") Run test on inventory
    pre {{ commandOutput }}

    h3 Playbooks

    table.table
      tbody
        tr(v-for="file in playbooks")
          td {{ file }}
          td
            button.btn.btn-default.btn-xs Run playbook against all hosts

</template>

<script>
  const fs = require('fs')
  const _ = require('lodash')
  const electron = require('electron')
  const exec = require('child_process').exec

  export default {
    data () {
      return {
        inventoryPath: electron.remote.app.getPath('appData') + '/digitalocean-electron/inventory',
        appDataPath: electron.remote.app.getPath('appData') + '/digitalocean-electron/',
        commandOutput: '',
        playbooks: []
      }
    },
    store: ['droplets'],
    mounted () {
      console.log('mounted!')
      this.playbooks = fs.readdirSync(this.appDataPath + 'playbooks')
    },
    methods: {
      generateInventoryFile () {
        let hosts = _.map(this.droplets, function (droplet) {
          return droplet.name + ' ansible_host=' + droplet.networks.v4[0].ip_address + ' ansible_python_interpreter=/usr/bin/python3'
        })
        fs.writeFileSync(this.inventoryPath, '[hosts]\n' + hosts.join('\n'))
      },
      runTest () {
        exec('ansible -i "' + this.inventoryPath + '" hosts -m ping', (error, stdout, stderr) => {
          if (!error) {
            this.commandOutput = stdout
          } else {
            this.commandOutput = stderr
          }
        })
      }
    }
  }
</script>
