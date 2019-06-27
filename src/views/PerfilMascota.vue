<template>
  <div>
    <v-btn flat @click="$router.go(-1)" class="subheading grey--text">Volver</v-btn>
    <v-container class="my-5">
         <!-- <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="150" class="grey lighten-2">
                <img :src="pet.imagen">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ pet.nombre }}</div>
              <div class="grey--text">{{ pet.raza }}</div>
              <div class="grey--text">{{ pet.tipoAnimal }}</div>
              <div class="grey--text">{{ pet.ubicacion }}</div>
              <div class="subheading">{{ pet.descripcion }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="primary">
                <v-icon small left>message</v-icon>
                <span class="">Mandar Mensaje</span>
              </v-btn>
              <v-btn flat color="green">
                <v-icon small left>share</v-icon>
                <span class="">Compartir</span>
              </v-btn>
            </v-card-actions>
          </v-card>-->
        
          <v-layout slot="header" wrap row class="pr-2 text-xs-center">
            <v-flex xs12 md6 lg4>
              <v-avatar size="250" class="grey lighten-2">
                <img :src="pet.imagen">
              </v-avatar>
            </v-flex>
            <v-flex xs12 md6 lg8>
              <v-layout slot="header" wrap row class="pr-2">
              <v-flex xs12 sm4 md2>
                <div class="caption grey--text">Nombre: </div>
                <div>{{ pet.nombre }}</div>
              </v-flex>
              <v-flex xs12 sm4 md2>
                <div class="caption grey--text">Raza:</div>
                <div>{{ pet.raza }}</div>
              </v-flex>
              <v-flex xs12 sm4 md2>
                <div class="caption grey--text">Ubicación:</div>
                <div>{{ pet.ubicacion }}</div>
              </v-flex>
              <v-flex xs12 sm4 md2>
                <div class="right">
                  <v-chip small :class="`${pet.perdEnc} white--text my-2 caption`">{{ pet.perdEnc }}</v-chip>
                </div>
              </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout slot="header" wrap row class="pr-2">  
            <v-flex xs12 md6>
              <div class="caption grey--text">Descripcion:</div>
              <div>{{ pet.descripcion }}</div>
            </v-flex>
            <v-flex xs12 md6>
              <div id="map"></div>
            </v-flex>

            </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebaseApp from "../FirebaseApp";
import gmapsInit from '../gmaps';

export default {
  data() {
    return {
      petId: '',
      pet: ''
    }
  },
  created() {
    this.petId = this.$route.params.pathMatch;
    
    var docRef = firebaseApp.firestore()
    .collection('mascotasPerdidas').doc(this.petId)
    docRef.get().then(doc => {
      if (doc.exists)
        this.pet = doc.data()
      else 
        console.log("No such document!");
    }).catch(function(error) {
      console.log("Oops! Error getting document:", error);
    });
  },
  async mounted() {
    try {
      /*const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);

      geocoder.geocode({ address: 'Austria' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });
      const markers = locations
      .map(x => new google.maps.Marker({ ...x, map }));*/

      
      const google = await gmapsInit();
      var uluru = {lat: -25.344, lng: 131.036};
      var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 10, center: uluru});
      // The marker, positioned at Uluru
      var marker = new google.maps.Marker({position: uluru, map: map});



    } catch (error) {
      console.error(error);
    }
  }
}
</script>
<style>
.v-chip.encontrada{
  background: #00E676;
}
.v-chip.perdida{
  background: #EF5350;
}
#map {
  height: 400px;
  width: 100%;
}
</style>