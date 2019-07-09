<template>
  <v-dialog max-width="600px">
    <v-btn flat slot="activator">Registrarse</v-btn>
    <v-card>
      <v-progress-linear v-if="loading" color="primary" style="margin: 0" :indeterminate="true"></v-progress-linear>
      <v-card-title>
        <h2>Registrarse</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <!--<v-text-field v-model="user" label="Nombre de Usuario" prepend-icon="person" 
          :rules="[rules.required]"
          ></v-text-field>-->
          <v-text-field v-model="nombre" label="Nombre" prepend-icon="face"></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            prepend-icon="email"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model="password"
            name="input-10-1"
            label="Contraseña"
            prepend-icon="vpn_key"
            :rules="[rules.required, rules.min]"
            type="password"
          ></v-text-field>

          <v-btn class="primary" @click="selectImage">Subir Imagen</v-btn>
          <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/*"
            @change="selectedImage"
          />
          <v-img style="background: grey" :src="imageUrl" width="150" height="150"></v-img>
          <p>{{filename}}</p>
          <!--<v-text-field
            v-model="password2" name="input-10-1" label="Repite Contraseña"
            :rules="[rules.required, rules.min]"
            type="password"
          ></v-text-field>-->
          <v-spacer></v-spacer>
          <v-btn flat @click="signUp" class="success mx-0 mt-3">Aceptar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import firebaseApp from "../FirebaseApp";
import { readAndCompressImage } from "browser-image-resizer";

export default {
  data() {
    return {
      loading: false,
      loadingProgress: 0,
      nombre: '',
      email: '',
      //user: '',
      password: '',
      //password2: '',
      filename: '',
      imageUrl: '',
      image: null,
      rules: {
        required: value => !!value || "Campo Obligatorio",
        min: v => v.length >= 8 || "Mínimo 8 Caracteres",
        passMatch: () => "El usuario y contraseña ingresados no coinciden"
      }
    };
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    selectedImage(e) {
      const files = e.target.files;
      this.filename = files[0].name;

      if (this.filename.lastIndexOf(".") <= 0) {
        return alert('Por favor agrega un archivo valido!');
      } else {
        const config = {
          quality: 0.9,
          maxWidth: 500,
          maxHeight: 500,
          autoRotate: true
        };
        readAndCompressImage(files[0], config).then(resizedImage => {
          // aca se guarda la imagen redimensionada
          this.image = resizedImage;
        });
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
          //imagen en blob
          this.imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(files[0]);
      }
    },
    signUp: function() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        firebaseApp.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          let user = data.user;
          var filePath =
            'usuarios/' +
            user.uid +
            this.filename.slice(this.filename.lastIndexOf('.'));
          //creo la referencia de donde se almacenara en GoogleStorage con el filePath
          var storageRef = firebaseApp.storage().ref(filePath);
          //guardo la imagen
          var task = storageRef.put(this.image);
          var self = this;
          task.on(
            "state_changed",
            function progress(snapshot) {
              var percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              self.loadingProgress = percentage;
            },
            function error(err) {
              console.log('Oopps hubo un problema al subir la imagen: ',err.message);
            },
            function complete() {
              console.log('displayName: ',self.nombre);
              task.snapshot.ref.getDownloadURL().then(downloadURL => {
                user.updateProfile({
                  displayName: self.nombre,
                  photoURL: downloadURL
                }).then(function() {
                  alert('Usuario registrado');
                  self.$router.go("/");
                }).catch(function(err) {
                  self.loading = false;
                  alert('Ocurrio un error al registrar usuario.',err);
                });
              });
            }
          ); //task.on
        });
      }
    },
    signOLD: function() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        firebaseApp
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(data => {
            let userId = data.user.uid;
            firebaseApp
              .firestore()
              .collection("usuarios")
              .doc(userId)
              .set(
                {
                  nombre: this.nombre,
                  avatarUrl: ""
                },
                { merge: true }
              )
              .then(
                () => {
                  var filePath =
                    "usuarios/" +
                    userId +
                    this.filename.slice(this.filename.lastIndexOf("."));
                  //creo la referencia de donde se almacenara en GoogleStorage con el filePath
                  var storageRef = firebaseApp.storage().ref(filePath);
                  //guardo la imagen
                  var task = storageRef.put(this.image);
                  var self = this;
                  task.on(
                    "state_changed",
                    function progress(snapshot) {
                      var percentage =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      self.loadingProgress = percentage;
                    },
                    function error(err) {
                      console.log(
                        "Oopps hubo un problema al subir la imagen: ",
                        err.message
                      );
                    },
                    function complete() {
                      task.snapshot.ref.getDownloadURL().then(downloadURL => {
                        firebaseApp
                          .firestore()
                          .collection("usuarios")
                          .doc(userId)
                          .set(
                            {
                              avatarUrl: downloadURL
                            },
                            { merge: true }
                          )
                          .then(
                            () => {
                              alert("Usuario Registrado");
                              //self.$router.go({ path: self.$router.path });
                              self.$router.go("/");
                            },
                            err => {
                              self.loading = false;
                              alert("Oops. " + err.message);
                            }
                          );
                      });
                    }
                  ); //task.on
                },
                err => {
                  this.loading = false;
                  alert(
                    "Error al registrar usuario en la base de datos: " +
                      err.message
                  );
                }
              ),
              err => {
                this.loading = false;
                alert(
                  "Error al crear credenciales de autenticación: " + err.message
                );
              };
          });
      }
    }
  }
};
</script>