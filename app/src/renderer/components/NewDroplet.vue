<template lang="jade">
  .panel.panel-default
    .panel-heading
      h3.panel-title New Droplet
    .panel-body
      form
        .form-group
          label Name
          input.form-control(type="text", v-model="newDroplet.name")
        .form-group
          label Region
          select.form-control(v-model="newDroplet.region")
            option(v-for="region in newDropletOptions.regions" v-bind:value="region.slug") {{ region.name }}
        .form-group
          label Size
          select.form-control(v-model="newDroplet.size")
            option(v-for="size in newDropletOptions.sizes" v-bind:value="size.slug") {{ size.slug }}
        .form-group
          label Image
          select.form-control(v-model="newDroplet.image")
            option(v-for="image in newDropletOptions.images" v-bind:value="image.id") {{ image.distribution }} {{ image.name }}
        .form-group
          label SSH Keys
          select.form-control(v-model="newDroplet.ssh_keys" multiple)
            option(v-for="key in newDropletOptions.keys" v-bind:value="key.id") {{ key.name }}
        button.btn.btn-success(v-on:click.prevent="createDroplet") Create

</template>

<script>
export default {
  store: ['droplets'],
  data () {
    return {
      newDroplet: { ssh_keys: [] },
      newDropletOptions: { images: [] }
    }
  },
  mounted () {
    const httpOptions = {
      headers: {
        Authorization: 'Bearer ' + this.$store.config.apiKey
      }
    }
    this.$http.get('https://api.digitalocean.com/v2/regions', httpOptions)
      .then(resp => {
        this.newDropletOptions.regions = resp.data.regions
      })
    this.$http.get('https://api.digitalocean.com/v2/sizes', httpOptions)
        .then(resp => {
          this.newDropletOptions.sizes = resp.data.sizes
        })
    this.$http.get('https://api.digitalocean.com/v2/images?page=1&per_page=100', httpOptions)
        .then(resp => {
          this.newDropletOptions.images = resp.data.images
        })
    this.$http.get('https://api.digitalocean.com/v2/account/keys', httpOptions)
        .then(resp => {
          this.newDropletOptions.keys = resp.data.ssh_keys
        })
  },
  methods: {
    createDroplet () {
      console.log(this.newDroplet)
      const httpOptions = {
        headers: {
          Authorization: 'Bearer ' + this.$store.config.apiKey
        }
      }
      this.$http.post('https://api.digitalocean.com/v2/droplets', this.newDroplet, httpOptions)
          .then(resp => {
            console.log('good!')
            this.droplets.push(resp.data.droplet)
          }, resp => {
            console.log('not good!')
          })
    }
  }

}
</script>
