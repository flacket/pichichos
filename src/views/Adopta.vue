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
          <v-img style="background: grey" :src="imageUrl" width="250" height="250"></v-img>

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

export default {
  data() {
    return {
      loading: true,
      loadingProgress: 0,
      imageUrl: '',
      image: null,
    };
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    selectedImage(e) {
      const files = e.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Por favor agrega un archivo valido!');
      } else {
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result;
          console.log('ImageUrl: ', this.imageUrl);
        });
        fileReader.readAsDataURL(files[0]);
        this.image = files[0];
        console.log('image: ', this.image);
      }
    },
    upload() {
        //Filepath = Direccion de guardado + Id del usuario + extension del archivo (.jpg)
        //var filePath = 'usuarios/' + userId + this.image.name.slice(this.image.name.lastIndexOf('.'));
      var filePath = "usuarios/" + "test2" + ".jpg";
      console.log(filePath);
      //creo la referencia de donde se almacenara en GoogleStorage con el filePath
      var storageRef = firebaseApp.storage().ref(filePath);
      //guardo la imagen
      var task = storageRef.put(this.imageUrl);
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