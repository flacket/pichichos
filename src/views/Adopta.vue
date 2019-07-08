<template>
  <div>
    <h1 class="display-1 primary--text font-weight-medium">Adopta</h1>

    <image-uploader
      :preview="true"
      :className="['fileinput', { 'fileinput--loaded': hasImage }]"
      capture="environment"
      :debug="0"
      :autoRotate="true"
      outputFormat="blob"
      :maxWidth="250"
      :maxHeight="250"
      :quality="0.9"
      accept=".jpg"
      @input="setImage"
    >
      <label for="fileInput" slot="upload-label">
        <figure>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <path
              class="path1"
              d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
            />
          </svg>
        </figure>
        <span class="upload-caption">
          {{
          hasImage ? "Reemplazar" : "Seleccionar foto de perfil"
          }}
        </span>
      </label>
    </image-uploader>

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
      hasImage: false,
      image: ""
    };
  },
  methods: {
    setImage: function(file) {
      this.hasImage = true;
      this.image = file;
      console.log(this.image);
    },
    upload() {
      var filePath = "usuarios/" + "test2" + ".jpg";
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