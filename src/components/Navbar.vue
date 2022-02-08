<template>
  <div>
    <v-navigation-drawer app
      :clipped="$vuetify.breakpoint.mdAndUp"
      v-model="drawer"
    >
      <v-layout v-if="isLoggedIn" column align-center>
        <v-avatar size="100" class="mt-4">
          <v-img :src="this.user.avatar"></v-img>
        </v-avatar>
        <p class="grey--text subheading mb-1 mt-2">{{this.user.nombre}}</p>
        <v-btn small text rounded color="orange" @click="logout"
          >Cerrar Sesión</v-btn>
      </v-layout>
      <v-divider></v-divider>
      <v-list rounded >
        <template v-for="link in links">
          <v-layout v-if="link.heading" :key="link.heading" row align-center>
          </v-layout>
          <v-list-item v-else :key="link.text" router :to="link.route" color="orange" :disabled="link.disabled">
            <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ link.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <v-footer fixed bottom height="auto" color="white">
        <v-card flat tile class=" grey--text text-center">
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-3 grey--text" icon>
              <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn>
          </v-card-text>
          <v-card-text class="grey--text pt-0 mx-2 text-center">
            Creada con ❤️<br>por Facundo Gallardo 
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="black--text text-center">
            &copy;2022 — <strong>Pichichos</strong>
          </v-card-text>
        </v-card>
      </v-footer>

    </v-navigation-drawer>

    <v-app-bar app darkcolor="orange" 
      :clipped-left="$vuetify.breakpoint.lgAndUp"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-bold">PICHICHOS</span>
      </v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
        <span class="subheading font-weight-light">deja tu huella</span>
      <v-spacer></v-spacer>
      <Register v-if="!isLoggedIn" class="hidden-sm-and-down" rounded/>
      <Login v-if="!isLoggedIn" class="hidden-sm-and-down" rounded/>
      <v-btn v-if="isLoggedIn" text v-on:click="logout" class="hidden-sm-and-down">
        Cerrar Sesión
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import firebaseApp from '../FirebaseApp'

export default {
  components: {
    Login: () => import("./Login"),
    Register: () => import("./Register")
  },
  
  data(){
    return{
      isLoggedIn: false,
      user: {
        Id: '',
        nombre: '',
        email: '',
        avatar: 'https://api.adorable.io/avatars/150/flacket.png'
      },
      dialog: false,
      drawer: null,
      links: [
        { icon: 'home', text: 'Inicio', route: '/'},
        { icon: 'search', text: 'Mascotas Perdidas', route: '/perdidas' },
        { icon: 'loyalty', text: 'Adopta', route: '/adopta' , disabled: false},
        { icon: 'assignment', text: 'Registrar Mascota', route: '/registrarMascota' , disabled: false},
        { icon: 'settings', text: 'Configuración', route: '/configuracion' , disabled: false}
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
    var user = firebaseApp.auth().currentUser
    if (user){
      this.isLoggedIn = true
      this.user.nombre = user.displayName;
      this.user.email = user.email;
      this.user.avatar = user.photoURL;
      this.links[2].disabled = false;
      this.links[3].disabled = false;
      this.links[4].disabled = false;
      //var emailVerified = user.emailVerified;
      this.user.Id = user.uid;  
      //TODO: The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    } else {
      this.isLoggedIn = false;
            this.links[2].disabled = true;
      this.links[3].disabled = true;
      this.links[4].disabled = true;
    }
  },
  methods: {
    logout: function() {
      firebaseApp.auth().signOut().then(() => {
        this.$router.go({path: '/'});
      })
    }
  }
}
</script>
