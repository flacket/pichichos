<template>
  <div>
    <v-btn flat @click="$router.go(-1)" class="subheading grey--text">Volver</v-btn>
    <v-container class="my-5">
          <v-card flat class="text-xs-center ma-3">
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
          </v-card>
    </v-container>
  </div>
</template>

<script>
import firebaseApp from "../FirebaseApp";

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
  }
}
</script>