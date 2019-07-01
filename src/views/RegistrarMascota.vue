<template>
  <v-form class="px-3" ref="form">
    <v-text-field v-model="nombre" label="Nombre"></v-text-field>
    <v-radio-group v-model="perdEnc" row>
      <v-radio label="Perdi mi mascota" color="orange" value="perdida"></v-radio>
      <v-radio label="Encontre una mascota" color="orange" value="encontrada"></v-radio>
    </v-radio-group>
    <v-combobox v-model="sexo" :items="sexoItems" label="Sexo"></v-combobox>
    <v-combobox v-model="tipoAnimal" :items="tipoItems" label="Tipo de Mascota"></v-combobox>
    <!--<v-combobox v-model="raza" :items="razaItems" label="Raza"></v-combobox>-->
    <v-text-field  v-model="raza" label="Raza"></v-text-field>
    <v-combobox v-model="edad" :items="edadItems" label="Tamaño"></v-combobox>
    <v-combobox v-model="tamano" :items="tamanoItems" label="Tamaño"></v-combobox>
    <v-combobox v-model="pelo" :items="peloItems" label="Pelo"></v-combobox>
    <v-textarea
      v-model="descripcion"
      label="Descripción"
      value=""
      hint="Describe como es tu mascota, que caracteristicas especiales tiene, etc."
    ></v-textarea>
    <v-btn class="primary" @click="selectImage"> Subir Imagen </v-btn>
    <input type="file" 
    style="display: none" 
    ref="fileInput" 
    accept="image/*"
    @change="selectedImage">
    <img :src="imageUrl" height="150">
    
    <p>Por último, marca en el mapa donde perdiste tu mascota</p>
    <!--<v-text-field v-model="imagen" label="Imagen"></v-text-field>-->
    <v-btn @click="registrar">Registrar Mascota</v-btn>

  </v-form>
</template>

<script>
import firebaseApp from "../FirebaseApp";

export default {
  data() {
    return {
      loading: false,
      nombre: "",
      perdEnc: 'perdida',
      sexoItems: [
          'macho',
          'hembra'
        ],
      sexo: 'macho',
      tipoItems: [
        'perro',
        'gato'
      ],
      tipoAnimal: 'perro',
      raza: '',
      tamanoItems: [
        'pequeño',
        'mediano',
        'grande'
      ],
      tamano: 'pequeño',
      edadItems: [
        'cachorro',
        'joven',
        'adulto',
        'anciano'
      ],
      edad: 'cachorro',
      peloItems: [
        'corto',
        'medio',
        'largo'
      ],
      pelo: 'corto',
      descripcion: "",
      imageUrl: '',
      image: null,
      geo: {lat: -31.53914, lng: -68.567303}
    };
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click()
    },
    selectedImage(e) {
      const files = e.target.files
      let filename = files[0].name
      if(filename.lastIndexOf('.') <= 0) {
        return alert('Por favor agrega un archivo valido!');
      } else {
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result;
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }

    },
    registrar: function() {
      //if (this.$refs.form.validate()) {

        /*var fechaRegistro = new Date().toISOString().substr(0, 19);
        console.log(fechaRegistro);
        var fechaRegistro2 = new Date()
        console.log(fechaRegistro2);*/


        //var fechaPerdidafb = this.fechaPerdida + 'T00:00:00.000Z';
        let imageUrl
        let key
        firebaseApp.firestore().collection('mascotasPerdidas').add({
          nombre: this.nombre,
          perdEnc: this.perdEnc,
          sexo: this.sexo,
          tipoAnimal: this.tipoAnimal,
          raza: this.raza,
          tamano: this.tamano,
          pelo: this.pelo,
          edad: this.edad,
          descripcion: this.descripcion,
          fechaCreacion: new Date(),
          //geoubicacion: new firebaseApp.firestore.GeoPoint(this.geo.lat, this.geo.lng),
        }).then(clave=> {
          key = clave.id
          return clave.id
        }).then(doc => {
          const filename = this.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          //creo la url de almacenamiento
          var storageRef = firebaseApp.storage().ref('mascotasPerdidas/'+ key + ext)
          return storageRef.put(this.image)
        }).then(fileData => {
          console.log(fileData);
          imageUrl = fileData.fullPath
          return firebaseApp.firestore().collection('mascotasPerdidas').doc(key).set({imageUrl: imageUrl})
        }).then(() => {
          alert('se subio todo wachooo')
        });
        //TODO: Limpiar campos
        this.nombre = '';
        console.log('se creo el pichicho');
        //TODO: Redireccionar una vez guardado
        //this.$router.push('/perfil/' + id);
      //}
    }
  }
}
</script>

"https://firebasestorage.googleapis.com/v0/b/pichichos-app.appspot.com/o?name=mascotasPerdidas%2FpQmwwOXeQwt7EitvuQ57.JPG&upload_id=AEnB2UpHEjFXOnV_CSIUogLMFSUE2-3n-iNY_tcrkbizyP4wTP5VnNWBrHYL-kdG4Y263YaWp5MxS7Q4txKt4ox9j0sgpsnVdw&upload_protocol=resumable"
"https://firebasestorage.googleapis.com/v0/b/pichichos-app.appspot.com/o?name=mascotasPerdidas%2FpQmwwOXeQwt7EitvuQ57.JPG&upload_id=AEnB2UpHEjFXOnV_CSIUogLMFSUE2-3n-iNY_tcrkbizyP4wTP5VnNWBrHYL-kdG4Y263YaWp5MxS7Q4txKt4ox9j0sgpsnVdw&upload_protocol=resumable"