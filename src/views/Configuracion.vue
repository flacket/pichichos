<template>
  <div class="configuracion" >
    <h1 class="display-1 primary--text font-weight-medium">Configuración</h1>

    <v-text-field 
      v-model="nombre" 
      label="Nombre" 
      prepend-icon="face"
      ></v-text-field>
      <v-btn text rounded @click="actualizarUsuario" class="success">Guardar Cambios</v-btn>
    <v-text-field
      v-model="password"
      label="Nueva Contraseña"
      prepend-icon="vpn_key"
      type="password"
      class="mt-5"
    ></v-text-field>
    <v-btn text rounded @click="cambiarPassword" class="success">Cambiar Contraseña</v-btn>
    <br>
    <p class="subheading mb-1 mt-5">Eliminar Usuario (esto no tiene vuelta atras)</p>
    <v-btn rounded depressed color="error" @click="eliminarUsuario">Eliminar Cuenta</v-btn>
  </div>
</template>

<script>
import firebaseApp from "../FirebaseApp";

export default {
  data() {
    return {
      password: '',
      nombre: '',
      alert: true
    };
  },
  //TODO: hacer el create() y cargar los datos del usuario con los actuales
  methods: {
    actualizarUsuario: function() {
      var user = firebaseApp.auth().currentUser;
      firebaseApp.firestore().collection("usuarios")
      .doc(user.uid).update({
        nombre: this.nombre
      }).then(() => {
        user.updateProfile({
        displayName: this.nombre,
        //TODO: agregar el modificar imagen
        //photoURL: "https://firebasestorage.googleapis.com/v0/b/pichichos-app.appspot.com/o/usuarios%2FFSLOZ0qMDVOPtKY0Ymg4LCUYqlg1.jpg?alt=media&token=7d16b422-ed00-4166-8258-1c2bcd847867"
        }).then(() => {
          alert("Se actualizaron los datos");
          window.location.reload()
        }).catch(function(err) {
          alert("Ocurrio un error al actualizar datos de usuario(auth): "+ err);
        })
      })
      .catch(function(err) {
        alert("Ocurrio un error al actualizar datos de usuario(collection): "+ err);
      });
    },
    cambiarPassword: function() {
      var user = firebaseApp.auth().currentUser;
      user
        .updatePassword(this.password)
        .then(function() {
          alert("Se cambió la contraseña");
        })
        .catch(function(err) {
          // An error happened.
          alert("Ocurrio un error al intentar cambiar la contraseña: "+ err.message);
        });
    },
    eliminarUsuario: function() {
      var user = firebaseApp.auth().currentUser;
      var self = this;
      // Borrar la foto
      //FIXME: archivos que no son .jpg (ej: JPEG, PNG, GIF) tira error.
      //bucar como llamar la extension
      var desertRef = firebaseApp.storage().ref().child('usuarios/'+ user.uid + '.jpg');
      desertRef.delete().then(function() {
        // Borrar la coleccion
        firebaseApp.firestore().collection('usuarios').doc(user.uid).delete();
        // Borrar las claves
        user.delete().then(function() {
          alert("Se Borro el usuario");
          self.$router.go("/");
        })
      }).catch(function(err) {
        alert('Ocurrio un error al intentar eliminar el usuario: '+ err);
      });
    }
  }
};
</script>
