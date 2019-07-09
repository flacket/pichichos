<template>
  <div class="configuracion">
    <h1 class="display-1 primary--text font-weight-medium">Configuración</h1>
    <v-text-field 
      v-model="nombre" 
      label="Nombre" 
      prepend-icon="face">
    </v-text-field>
    
    
    <v-text-field
      v-model="password"
      name="input-10-1"
      label="Cambiar Contraseña"
      prepend-icon="vpn_key"
      type="password"
    ></v-text-field>
    <v-btn flat @click="cambiarPassword" class="success mx-0 mt-3">Guardar Cambios</v-btn>
    <v-btn depressed color="error" @click="eliminarUsuario" class="mx-0 mt-3">Eliminar Cuenta</v-btn>
  </div>
</template>

<script>
import firebaseApp from "../FirebaseApp";

export default {
  data() {
    return {
      password: '',
      nombre: ''
    };
  },
  methods: {
    actualizarUsuario: function() {
      var user = firebaseApp.auth().currentUser;

      user.updateProfile({
        displayName: this.nombre,
        photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function() {
        // Update successful.
      }).catch(function(err) {
        alert("Ocurrio un error al actualizar datos de usuario.", err);
      });
    },
    cambiarPassword: function() {
      var user = firebaseApp.auth().currentUser;
      user
        .updatePassword(this.password)
        .then(function() {
          // Update successful.
          alert("Se cambió la contraseña");
        })
        .catch(function(err) {
          // An error happened.
          alert("Ocurrio un error al intentar cambiar la contraseña", err);
        });
    },
    eliminarUsuario: function() {
      var user = firebaseApp.auth().currentUser;

      user
        .delete()
        .then(function() {
          alert("Se Borro el usuario");
          this.$router.go({ path: "/" });
        })
        .catch(function(err) {
          alert("Ocurrio un error al intentar eliminar el usuario.", err);
        });
      /*
      var user = firebaseApp.auth().currentUser;
      console.log('user: ', user);
      // Borrar la foto
      var desertRef = firebaseApp.storage().child('usuarios/'+ user.uid + '.jpg');
      desertRef.delete().then(function() {
        console.log('borrado archivo');
        // Borrar la coleccion
        firebaseApp.collection('usuarios').doc(user.uid).delete(); 
        console.log('borrado coleccion');
        // Borrar las claves
        user.delete().then(function() {
          alert('Se Borro el usuario');
          this.$router.go({path: '/'});
        }).catch(function(err) {
          alert('Ocurrio un error al intentar eliminar el usuario (auth):', err);
        }); 

      }).catch(function(err) {
        alert('Ocurrio un error al intentar eliminar el usuario (storage):', err);
      });
      */
    }
  }
};
</script>
