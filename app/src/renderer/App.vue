<template>
  <div id="#app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header"><a class="navbar-brand navbar-link" href="#">Stuff</a>
        </div>
          <ul class="nav navbar-nav">
            <li><router-link to="/">DO Droplets</router-link></li>
            <li><router-link to="/ansible">Ansible</router-link></li>
            <li><router-link to="/set-api-key">Configure DO</router-link></li>
          </ul>
      </div>
    </nav>


    <router-view></router-view>
  </div>
</template>

<script>
  export default {
  }
</script>

<style>

</style>
