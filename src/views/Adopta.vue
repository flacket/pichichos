<template>
  <div>
    <h1 class="display-1 primary--text font-weight-medium">Adopta</h1>

    <v-btn class="primary" @click="selectImage">Subir Imagen</v-btn>
    <input
      type="file"
      style="display: none"
      ref="fileInput"
      accept="image/*"
      @change="selectedImage"
    />
    <v-img style="background: grey" :src="imageUrl" width="500" height="500"></v-img>
    <p>{{filename}}</p>

    <p v-if="loading" class="mt-4">Registrando mascota, espera mientras le ponemos la correa..</p>
    <v-progress-linear v-if="loading" v-model="loadingProgress"></v-progress-linear>

    <v-btn @click="upload">Subir</v-btn>
    <!--
        doNotResize="['gif', 'svg']"
        @onUpload="startImageResize"
        @onComplete="endImageResize"
    -->
  </div>
</template>

<script>
import firebaseApp from "../FirebaseApp";
import { readAndCompressImage } from "browser-image-resizer";

export default {
  data() {
    return {
      loading: true,
      loadingProgress: 0,
      filename: "",
      imageUrl: "",
      image: null
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
        return alert("Por favor agrega un archivo valido!");
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
        fileReader.addEventListener("load", () => {
          //imagen en blob
          this.imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(files[0]);
        //info de la imagen
        //this.image = files[0];
      }
    },
    upload() {
      //Filepath = Direccion de guardado + Id del usuario + extension del archivo (.jpg)
      var filePath = "usuarios/" + 'userId' + this.filename.slice(this.filename.lastIndexOf('.'));
      console.log(filePath);
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
          alert("imagen subida");
        }
      ); //task.on
    }
  }
};
</script>
<style>
#fileInput {
  display: none;
}
</style>