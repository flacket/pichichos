<template>
  <nav>
  <v-navigation-drawer app fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      v-model="drawer">
    
    <v-layout v-if="isLoggedIn" column align-center>
      <v-flex class="mt-4">
        <v-avatar size="100">
          <v-img :src="this.user.avatar"></v-img>
        </v-avatar>
        <p class="grey--text subheading mb-1 mt-2">{{ this.user.nombre}}</p>
        <v-btn small flat color="orange" v-on:click="logout" 
    class="idden-md-and-up">Cerrar Sesión</v-btn>
      </v-flex>
    </v-layout>

    <Register v-if="!isLoggedIn" small class="hidden-md-and-up"/>
    <Login v-if="!isLoggedIn" small class="hidden-md-and-up"/>
    
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

<template>
  <v-footer
    fixed bottom
    height="auto"
  >
    <v-card flat tile class=" grey--text text-xs-center">
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-3 grey--text"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="grey--text pt-0 mx-2">
       Creada con ❤️ por Facundo Gallardo 
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="black--text">
        &copy;2019 — <strong>Pichichos</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

  </v-navigation-drawer>

  <v-toolbar color="orange" dark fixed app
    :clipped-left="$vuetify.breakpoint.mdAndUp"
  >
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="headline text-uppercase">
      <span class="font-weight-bold">PICHICHOS</span>
      <span class="font-weight-light">app</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <Register v-if="!isLoggedIn" class="hidden-sm-and-down"/>
    <Login v-if="!isLoggedIn" class="hidden-sm-and-down"/>
    <v-btn v-if="isLoggedIn" flat v-on:click="logout" 
    class="hidden-sm-and-down">Cerrar Sesión</v-btn>
  </v-toolbar>
  </nav>
</template>

<script>
import Login from './Login'
import Register from './Register'
import firebaseApp from '../FirebaseApp'

export default {
  components: { Login, Register },
  data(){
    return{
      isLoggedIn: false,
      user: {
        Id: '',
        nombre: '',
        avatar: 'https://api.adorable.io/avatars/150/flacket.png'
      },
      dialog: false,
      drawer: null,
      links: [
        { icon: 'home', text: 'Inicio', route: '/' },
        { icon: 'search', text: 'Mascotas Perdidas', route: '/perdidas' },
        { icon: 'loyalty', text: 'Adopta', route: '/adopta' },
        { icon: 'assignment', text: 'Registrar Mascota', route: '/registrarMascota' },
        { icon: 'settings', text: 'Configuración', route: '/configuracion' }
        
      ],
      icons: [
        'filter_vintage',
        'pets',
        'wb_cloudy'
      ]
    }
  },
  props: {
    source: String
  },
  created() {
    var currentUser = firebaseApp.auth().currentUser
    if (currentUser){
      this.isLoggedIn = true
      this.user.Id = currentUser.uid

      //Get User Data
      firebaseApp.firestore()
      .collection('usuarios').doc(this.user.Id)
      .get().then((user) =>{
        this.user.nombre = user.data().nombre
        if(user.data().avatarUrl != '')
          this.user.avatar = user.data().avatarUrl
        console.log('Usuario Logueado: ',this.user)
      })
    } else {
      this.isLoggedIn = false;
      console.log('usuario no logueado');
    }
  },
  methods: {
    logout: function() {
      firebaseApp.auth().signOut().then(() => {
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
