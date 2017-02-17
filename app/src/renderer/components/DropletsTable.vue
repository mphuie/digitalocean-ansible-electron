<template lang="jade">
  .panel.panel-default
    .panel-heading
      h3.panel-title Your Droplets
    .panel-body
      table.table
        thead
          tr
            th Status
            th Name
            th Tags
            th vCpu(s)
            th Memory (MB)
            th Disk
            th Created
            th Image
            th
        tbody
          tr(v-for="droplet in droplets")
            td {{ droplet.status }}
            td {{ droplet.tags }}
            td {{ droplet.name }}
            td {{ droplet.vcpus }}
            td {{ droplet.memory }}
            td {{ droplet.disk }}
            td {{ droplet.created_at }}
            td {{ droplet.image.slug }}
            td
              button.btn.btn-danger.btn-xs(v-on:click.prevent="deleteDroplet(droplet.id)") Delete

</template>

<script>
  export default {
    store: ['droplets'],
    data () {
      return {
      }
    },
    mounted () {
      this.$http.get('https://api.digitalocean.com/v2/droplets?page=1&per_page=100', {
        headers: {
          Authorization: 'Bearer ' + this.$store.config.apiKey
        }})
        .then(resp => {
          this.$store.droplets = resp.data.droplets
        })
    },
    methods: {
      deleteDroplet (id) {
        this.$http.delete('https://api.digitalocean.com/v2/droplets/' + id, {
          headers: {
            Authorization: 'Bearer ' + this.$store.config.apiKey
          }})
      }
    }
  }
</script>
