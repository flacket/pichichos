<template>
  <v-app>
    <Navbar/>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar"
export default {
  name: "App",
  components: {
    Navbar
  }
}
</script>
