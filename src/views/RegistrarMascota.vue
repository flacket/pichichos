<template>
  <v-form class="px-3" ref="form">
    <v-text-field v-model="nombre" label="Nombre"></v-text-field>
    <v-radio-group v-model="perdEnc" row>
      <v-radio label="Perdi mi mascota" color="orange" value="perdida"></v-radio>
      <v-radio label="Encontre una mascota" color="orange" value="encontrada"></v-radio>
    </v-radio-group>
    <v-select v-model="sexo" :items="sexoItems" label="Sexo"></v-select>
    <v-select v-model="tipoAnimal" :items="tipoItems" v-on:change="cambiarRaza()" label="Tipo de Mascota"></v-select>
    <!--<v-combobox v-model='raza' :items='razaItems' label='Raza'></v-combobox>-->
    <v-select v-model="raza" :items="razaItems" label="Raza" :disabled='razaDisabled'></v-select>

    <v-select v-model="edad" :items="edadItems" label="Edad"></v-select>
    <v-select v-model="tamano" :items="tamanoItems" label="Tamaño"
    :hint="tamanoHint" v-on:change="cambiartamanoHint()"></v-select>
    <v-select v-model="pelo" :items="peloItems" label="Pelo"></v-select>
    <v-textarea
      v-model="descripcion"
      label="Descripción"
      value
      hint="Describe como es tu mascota, que caracteristicas especiales tiene, etc."
    ></v-textarea>
    <v-btn class="primary" @click="selectImage">Subir Imagen</v-btn>
    <input
      type="file"
      style="display: none"
      ref="fileInput"
      accept="image/*"
      @change="selectedImage"
    />
    <img :src="imageUrl" height="150" />

    <p>Por último, marca en el mapa donde perdiste tu mascota</p>
    <!--<v-text-field v-model='imagen' label='Imagen'></v-text-field>-->
    <v-btn @click="registrar">Registrar Mascota</v-btn>
    <v-progress-linear v-if="loading" v-model="loadingProgress"></v-progress-linear>
  </v-form>
</template>

<script>
import firebaseApp from '../FirebaseApp';
//TODO: borrar estos 2 import y ver como arreglar el puto geoPoint    
import firebase from 'firebase/app';
import 'firebase/firestore'

export default {
  data() {
    return {
      loading: false,
      loadingProgress: 0,

      nombre: '',
      perdEnc: 'perdida',
      sexoItems: ['macho', 'hembra'],
      sexo: '',
      tipoItems: ['perro', 'gato'],
      tipoAnimal: '',
      razaItems: [''],
      razaPerros: [
        'Affenpinscher',
        'Afgano',
        'Akita japonés',
        'Basenji'],
      razaGatos: [
        'Oriental de pelo largo',
        'Selkirk rex',
        'Abisinio',
        'Americano de pelo duro',
        'Asiático'],
      raza: '',
      razaDisabled: true,

      tamanoItems: ['pequeño', 'mediano', 'grande'],
      tamano: '',
      tamanoHint: '',
      edadItems: ['cachorro', 'joven', 'adulto', 'anciano'],
      edad: '',
      peloItems: ['corto', 'medio', 'largo'],
      pelo: '',

      descripcion: '',
      imageUrl: '',
      imageUrl2: '',
      image: null,
      geo: { lat: -31.53914, lng: -68.567303 }
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
        });
        fileReader.readAsDataURL(files[0]);
        this.image = files[0];
      }
    },
    cambiartamanoHint(){
      if(this.tamano == '')
        this.tamanoHint = 'debes seleccionar un tamaño'
      else if (this.tamano == 'pequeño')
        this.tamanoHint = 'menos de 11Kg'
      else if (this.tamano == 'mediano')
        this.tamanoHint = 'entre 11Kg y 27Kg'
      else this.tamanoHint = 'más de 28Kg'
    },
    cambiarRaza(){
      if (this.tipoAnimal == 'gato') {
        this.razaItems = this.razaGatos;
      } else {
        this.razaItems = this.razaPerros;
      }
      this.razaDisabled = false;
    },
    registrar: function() {
      this.loading = true;
      let key;
      firebaseApp
        .firestore()
        .collection('mascotasPerdidas')
        .add({
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
          geoubicacion: new firebase.firestore.GeoPoint(this.geo.lat, this.geo.lng)
        })
        .then(collKey => {
          //almaceno el id de la coleccion recien guardada
          console.log('guardado en firebase');
          key = collKey.id;
          //armo el filePath del archivo local
          //con el id(key) del doc y la extension del archivo
          const extention = this.image.name.slice(
            this.image.name.lastIndexOf('.')
          );
          var filePath = 'mascotasPerdidas/' + key + extention;
          //creo la referencia de donde se almacenara en GoogleStorage con el filePath
          var storageRef = firebaseApp.storage().ref(filePath);
          //guardo la imagen
          var task = storageRef.put(this.image);
          task.on(
            'state_changed',
            function progress(snapshot) {
              var percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Porcentaje: ', percentage);
              this.loadingProgress = percentage;
            },
            function error(err) {
              console.log('Oopps hubo un problema al subir la imagen: ', err.message);
            },
            function complete() {
              console.log('se completo la subida');

              task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);

                firebaseApp.firestore().collection('mascotasPerdidas').doc(key)
                .set({
                  imagen: downloadURL
                }, { merge: true })
                .then(() => {
                  alert('Mascota Registrada')
                  this.$router.push('/');
                  //this.$router.push({ path: this.$router.go(-1) });
                },
                err => {
                  this.loading = false;
                  alert('Oops. ' + err.message);
                });
              });
            }
          ); //task.on
        });
    } //registrar
  }//methods
}; //export default
</script>