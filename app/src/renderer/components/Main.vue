<template lang="jade">
  .container
    droplets-table
    new-droplet
</template>


<script>
  import DropletsTable from './DropletsTable'
  import NewDroplet from './NewDroplet'
  export default {
    components: {
      DropletsTable,
      NewDroplet
    }
  }
</script>
