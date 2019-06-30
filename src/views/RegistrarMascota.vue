<template>
  <v-form class="px-3" ref="form">
    <v-text-field v-model="nombre" label="Nombre"></v-text-field>
    <v-radio-group v-model="row" row>
      <v-radio label="Perdi mi mascota" color="orange" value="perdida"></v-radio>
      <v-radio label="Encontre una mascota" color="orange" value="encontrada"></v-radio>
    </v-radio-group>
    <v-combobox v-model="sexo" :items="sexoItems" label="Sexo"></v-combobox>
    <v-combobox v-model="tipoAnimal" :items="tipoItems" label="Tipo de Mascota"></v-combobox>
    <!--<v-combobox v-model="raza" :items="razaItems" label="Raza"></v-combobox>-->
    <v-text-field  v-model="raza" label="Raza"></v-text-field>
    <v-combobox v-model="edad" :items="edadItems" label="Tamaño"></v-combobox>
    <v-combobox v-model="tamano" :items="tamanoItems" label="Tamaño"></v-combobox>
    <v-textarea
          v-model="descripcion"
          label="Descripción"
          value=""
          hint="Describe como es tu mascota, que caracteristicas especiales tiene, etc."
        ></v-textarea>
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
      descripcion: "",
      geo: {lat: -31.53914, lng: -68.567303}
    };
  },
  methods: {
    registrar: function() {
      //if (this.$refs.form.validate()) {
        firebaseApp.firestore().collection('mascotasPerdidas').add({
          nombre: this.nombre,
          sexo: this.sexo,
          tipoAnimal: this.tipoAnimal,
          raza: this.raza,
          tamano: this.tamano,
          edad: this.edad,
          descripcion: this.descripcion,
          geoubicacion: new firebaseApp.firestore.GeoPoint(this.geo.lat, this.geo.lng),
        });
        //TODO: Limpiar campos
        this.nombre = '';
        //TODO: Redireccionar una vez guardado
        //this.$router.push('/perfil/' + id);
      //}
    }
  }
}
</script>

