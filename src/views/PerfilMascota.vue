<template>
  <div>
    <v-btn flat @click="$router.go(-1)" class="subheading grey--text">Volver</v-btn>
    <v-container class="my-5">
      <v-layout slot="header" wrap row class="text-xs-center">
        <v-flex xs12 md6 lg4>
          <v-avatar size="250" class="grey lighten-2">
            <img :src="pet.imagen">
          </v-avatar>
        </v-flex>
        <v-flex xs12 md6 lg8>
          <v-layout slot="header" wrap row class="pr-2">
            <v-flex xs12 sm4>
              <div class="caption grey--text">Nombre:</div>
              <div>{{ pet.nombre }}</div>
            </v-flex>
            <v-flex xs12 sm4>
              <div class="caption grey--text">Raza:</div>
              <div>{{ pet.raza }}</div>
            </v-flex>
            <v-flex xs12 sm4>
              <div class="caption grey--text">Estado:</div>
              <v-chip :key="pet.perdEnc" small :class="`${pet.perdEnc} white--text caption`">{{ pet.perdEnc }}</v-chip>
            </v-flex>
            <v-flex xs12 class="mb-2">
              <div class="caption grey--text">Ubicación:</div>
              <div>{{ pet.ubicacion }}</div>
            </v-flex>
            <v-flex xs12 class="mb-4">
              <div class="caption grey--text">Descripcion:</div>
              <div>{{ pet.descripcion }}</div>
            </v-flex>

            <v-flex xs12 sm6>
              <v-btn flat color="primary">
                <v-icon small left>message</v-icon>
                <span class>Mandar Mensaje</span>
              </v-btn>
            </v-flex>
            <v-flex xs12 sm6>
              <v-btn flat color="green">
                <v-icon small left>share</v-icon>
                <span class>Compartir</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout slot="header" wrap row class="mt-4" style="background: grey;">
        <v-flex xs12>
          <iframe
            v-if="ready"
            class="iframe"
            v-bind:src="'maps.google.com/maps?q='
            +pet.geoubicacion.latitude+','+pet.geoubicacion.longitude+
            '&z=15&output=embed'"
          ></iframe>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebaseApp from "../FirebaseApp";

export default {
  data() {
    return {
      ready: false,
      petId: "",
      pet: ""
    };
  },
  created() {
    this.petId = this.$route.params.pathMatch;

    var docRef = firebaseApp
      .firestore()
      .collection("mascotasPerdidas")
      .doc(this.petId);
    docRef.get().then(doc => {
      if (doc.exists) {
        this.pet = doc.data();
        this.ready = true;
      }
    });
  }
};
</script>
<style>
.v-chip.encontrada {
  background: #4caf50;
}
.v-chip.perdida {
  background: #ef5350;
}
.iframe {
  height: 400px;
  width: 100%;
  border: 0;
}
</style>