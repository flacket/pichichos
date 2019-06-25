<template>
  <nav>
  <v-navigation-drawer app fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      v-model="drawer">
    <v-list dense>
      <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
        <v-list-tile-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ link.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

  <v-toolbar color="primary" dark fixed app
    :clipped-left="$vuetify.breakpoint.mdAndUp"
  >
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="headline text-uppercase">
      <span class="font-weight-bold">GITHUB</span>
      <span class="font-weight-light">ANALYTICS</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <Register v-if="!isLoggedIn"/>
    <Login v-if="!isLoggedIn" />
    <v-btn v-if="isLoggedIn" flat v-on:click="logout">Cerrar Sesión</v-btn>
  </v-toolbar>
  </nav>
</template>

<script>
import Login from './Login'
import Register from './Register'
import firebaseAuth from '@/database/FirebaseAuth'

export default {
  components: { Login, Register },
  data(){
    return{
      isLoggedIn: false,
      currentUser: false,
      dialog: false,
      drawer: null,
      links: [
        { icon: 'home', text: 'Inicio', route: '/' },
        { icon: 'announcement', text: 'Mascotas Perdidas', route: '/perdidas' },
        { icon: 'settings', text: 'Configuración', route: '/configuracion' },
        { icon: 'help', text: 'Acerca de', route: '/acerca' }
      ]
    }
  },
  props: {
    source: String
  },
  created() {
    if (firebaseAuth.auth().currentUser){
      console.log('usuario esta logueado');
      this.isLoggedIn = true;
      this.currentUser = firebaseAuth.auth().currentUser.email;
    } else {
      this.isLoggedIn = false;
      console.log('usuario no logueado');
    }
  },
  methods: {
    logout: function() {
      firebaseAuth.auth().signOut().then(() => {
        //this.$router.push('/');
        //this.$router.replace('/')
        //uso el go en vez del push para que aparte de 
        //redirigir me recargue la página.
        //this.$router.go({path: '/'});
        this.$router.go({path: this.$router.path});
      })
    }
  }
}
</script>
